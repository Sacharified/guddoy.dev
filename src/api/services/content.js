import { createClient } from "contentful";
import ContentStore from "../../stores/content";

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

export const fetchContent = async (service) => {
	const data = await service.getEntries();
	return data;
}

export const createStoreFromJson = (entries) => {
	return ContentStore.create({ entries });
}