import { createClient } from "contentful";
import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from "utils/env";

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN
});

class ContentService {
    constructor({ client }) {
        this.client = client;
    }

    async getEntries() {
        return this.client.getEntries();
    }

    async getEntry(id) {
        return this.client.getEntry(id);
    }
}

const service = new ContentService({ client });

export default service;
