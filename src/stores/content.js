import { types } from "mobx-state-tree";
import { toProgressiveImageUrl } from "../api/services/content";

const Image = types.model("Image", {
	url: "",
	width: 0,
	height: 0,
	title: "",
	description: "",
	size: 0,
	contentType: "",
})
.preProcessSnapshot(snapshot => {
	if (!snapshot.fields) return {};
	const {
		fields: {
			file: {
				url,
				details: {
					image: { width, height },
					size
				},
				contentType,
			},
			title,
			description
		}
	} = snapshot;
	return ({ url, width, height, title, description, size, contentType });
})
.views(self => ({
	get src() {
		return toProgressiveImageUrl(self.url);
	}
}));

const EntryFields = types.model("EntryFields", {
	content: types.frozen({}),
	heroImage: types.optional(Image, {}),
	slug: "",
	subtitle: "",
	title: "",
	tags: types.array(types.string)
});

const Entry = types.model("Entry", {
	fields: EntryFields,
	sys: types.frozen({})
})
.views(self => ({
	get contentType() {
		return self.sys.contentType.sys.id;
	}
}));

const Content = types.model("Content", {
	entries: types.array(Entry)
})
.views(self => ({
	get posts() {
		return self.entries.filter(entry => entry.contentType === "post");
	},

	get tags() {
		return self.posts.reduce((memo, { fields: { tags } }) => [...memo, ...tags.filter(tag => !memo.includes(tag))], []);
	},

	queryPostsByTag(tags = []) {
		if (tags.length === 0) {
			return self.posts;
		}

		return self.posts.filter(entry => !!tags.filter(tag => entry.fields.tags.includes(tag)).length);
	},

	getEntry(id) {
		return self.entries.find(entry => entry.sys.id === id);
	}
}));

export default Content;