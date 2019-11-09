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
	},

	get createdAt() {
		return new Date(self.sys.createdAt);
	},

	get updatedAt() {
		return new Date(self.sys.createdAt);
	}
}));

const Content = types.model("Content", {
	entries: types.array(Entry)
})
.views(self => {
	
	return {
		get posts() {
			return self.entries.filter(entry => entry.contentType === "post");
		},

		get sortedPosts() {
			return self.sortPostsByCreationDate(self.posts);
		},

		get tags() {
			return self.posts.reduce((memo, { fields: { tags } }) => [...memo, ...tags.filter(tag => !memo.includes(tag))], []);
		},

		queryPostsByTag(tags = []) {
			if (tags.length === 0) {
				return self.sortedPosts;
			}

			const res = self.sortedPosts
				.filter(entry => !!tags.filter(tag => entry.fields.tags.includes(tag)).length);
			

			return res;
		},

		sortPosts(sortKey, posts = self.posts) {
			return [...posts].sort((a, b) => {
				return a[sortKey] < b[sortKey] ? 1 : -1;
			});
		},

		sortPostsByCreationDate(posts = self.posts) {
			return self.sortPosts("createdAt", posts)
		},

		getEntry(id) {
			return self.entries.find(entry => entry.sys.id === id);
		}
	}
});

export default Content;