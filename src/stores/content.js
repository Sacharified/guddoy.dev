import { types, getSnapshot } from "mobx-state-tree";

const EntryFields = types.model({
    content: types.frozen({}),
    heroImage: types.frozen({}),
    slug: "",
    subtitle: "",
    title: "",
    tags: types.array(types.string)
});

const Entry = types.model({
    fields: EntryFields,
    sys: types.frozen({})
});

const Content = types.model({
    entries: types.array(Entry)
});

export default Content;