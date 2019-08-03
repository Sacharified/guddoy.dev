import { types } from "mobx-state-tree";

const EntryFields = types.model("EntryFields", {
    content: types.frozen({}),
    heroImage: types.frozen({}),
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

    queryByTag(tags = []) {
        if (tags.length === 0) {
            return self.entries;
        }

        return self.entries.filter(entry => !!tags.filter(tag => entry.fields.tags.includes(tag)).length);
    },

    getEntry(id) {
        return self.entries.find(entry => entry.sys.id === id);
    }
}));

export default Content;