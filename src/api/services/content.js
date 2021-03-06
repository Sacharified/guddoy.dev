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
		return this.client.getEntries();
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

export const fetchContent = service => service.getEntries();
export const createStoreFromJson = entries => ContentStore.create({ entries });
export const toProgressiveImageUrl = (url = "") => `${url}?fm=jpg&fl=progressive`;