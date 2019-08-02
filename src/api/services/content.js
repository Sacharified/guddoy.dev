import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ContentStore from "../../stores/content";

export const getPostComponent = content => documentToReactComponents(content);

export default class ContentService {
	constructor(CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN) {
		this.client = createClient({
			space: CONTENTFUL_SPACE_ID,
			accessToken: CONTENTFUL_ACCESS_TOKEN
		});
	}

	getEntries() {
		return this.client.getEntries();;
	}

	getEntry(id) {
		return this.client.getEntry(id);
	}
}

export const serviceFactory = async () => {
	const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = await import("../../utils/env");
	const service = new ContentService(CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN);
	return service;
}

export const createStore = async (service) => {
	const data = await service.getEntries();
	const store = ContentStore.create({ entries: data.items });
	return store;
}