import React from "react";
import Article from "components/article";
import { fetchContent } from "api/services/content";
import { serviceFactory } from "api/services/content";

export default class PostPage extends React.Component {
	static async getInitialProps({ query }) {
		const service = await serviceFactory();
		const data = await fetchContent(service);
		const entry = data.items.find(({ sys, fields }) => (sys.id === query.id || fields.slug === query.id));
		return { entry };
	}

	render() {
		return <Article {...this.props.entry} />
	}
}
