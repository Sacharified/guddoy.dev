import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from "utils/env";

const client = createClient({
	space: CONTENTFUL_SPACE_ID,
	accessToken: CONTENTFUL_ACCESS_TOKEN
});

export const getEntries = async () => client.getEntries();
export const getEntry = async id => client.getEntry(id);
export const getPostComponent = content => documentToReactComponents(content);

class ContentService {
	static getEntries() {
		return getEntries();
	}

	static getEntry(id) {
		return getEntry(id);
	}
}

export default ContentService;
