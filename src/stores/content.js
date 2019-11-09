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

const PostEntryFields = types.model("PostEntryFields", {
	content: types.frozen({}),
	heroImage: types.optional(Image, {}),
	slug: "",
	subtitle: "",
	title: "",
	tags: types.array(types.string)
});

const CodeEntryFields = types.model("CodeEntryFields", {
	title: "",
	code: ""
});

const Entry = types.model("Entry", {
	fields: types.union({ dispatcher: (fields) => {
		switch(fields.type) {
			case "post":
				return PostEntryFields;
			case "linkList":
				return LinkListEntryFields;
			case "link":
				return LinkEntryFields;
			case "codeBlock":
				return CodeEntryFields;
			case "siteMeta":
				return types.frozen({});
			default:
				throw new Error("Cannot reconcile Entry type", fields.type)
		}
	}}),
	sys: types.frozen({})
})
.preProcessSnapshot(snapshot => {
	return { ...snapshot, fields: { ...snapshot.fields, type: snapshot.sys.contentType.sys.id } }
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
	},

	get link() {
		if (self.contentType === "post") {
			return "/post/" + self.fields.slug;
		}

		if (self.contentType === "link") {
			return self.fields.url;
		}

		return "";
	},

	get linkTitle() {
		return self.fields.title;
	}
}));

const Content = types.model("Content", {
	entries: types.array(Entry)
})
.views(self => {
	
	return {
		get posts() {
			return self.filterEntriesByType("post", self.entries);
		},

		get sortedPosts() {
			return self.sortPostsByCreationDate(self.posts);
		},

		get tags() {
			return self.posts.reduce((memo, { fields: { tags } }) => [...memo, ...tags.filter(tag => !memo.includes(tag))], []);
		},

		get linkLists() {
			return self.filterEntriesByType("linkList");
		},

		get footerNavLinkList() {
			return this.linkLists.filter(({ fields: { id } }) => id === "nav-footer").pop();
		},

		filterEntriesByType(type, entries = self.entries) {
			return entries.filter(entry => entry.contentType === type);
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

const LinkListEntryFields = types.model("LinkListEntryFields", {
	id: "",
	listName: "",
	links: types.array(Entry)
});

const LinkEntryFields = types.model("CodeEntryFields", {
	url: "",
	title: "",
	rel: "",
	target: ""
});
export default Content;