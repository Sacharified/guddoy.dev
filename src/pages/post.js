import React from "react";
import Article from "components/article";
import { createStore } from "api/services/content";
import { serviceFactory } from "api/services/content";

export default class PostPage extends React.Component {
	static async getInitialProps({ query }) {
		const service = await serviceFactory();
		const store = await createStore(service);
		const entry = store.entries.toJSON().find(({ sys, fields }) => (sys.id === query.id || fields.slug === query.id));
		console.log(entry)
		return { entry };
	}

	render() {
		return <Article {...this.props.entry} />
	}
}
