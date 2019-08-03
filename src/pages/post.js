import React from "react";
import Article from "components/article";
import { fetchContent, serviceFactory, createStoreFromJson } from "api/services/content";

export default class PostPage extends React.Component {
	static async getInitialProps({ query }) {
		const service = await serviceFactory();
		const data = await fetchContent(service);
		return { id: query.id, data };
	}
	
	constructor(props) {
		super(props);
		this.store = createStoreFromJson(props.data.items);
		this.entry = this.store.getEntry(props.id);
	}

	render() {
		return <Article {...this.entry} />
	}
}
