import React from "react";
import PostsList from "components/posts/list";
import Typography from "@material-ui/core/Typography";
import { fetchContent, createStoreFromJson } from "api/services/content";
import { serviceFactory } from "api/services/content";
import { Container } from "components/layout";
export default class Blog extends React.Component {
    static async getInitialProps({ query }) {
        const service = await serviceFactory();
        const data = await fetchContent(service);
		return { data, query };
    }

    constructor(props) {
		super(props);
		this.store = createStoreFromJson(props.data.items);
	}
    
    render() {
        const { query } = this.props;
        let items = this.store.posts

        if (query.tags) {
            items = this.store.queryByTag(query.tags.split(","));
        }

        return (
            <Container maxWidth="md">
                <Typography variant="h4" component="h4" gutterBottom>
                    <a>Blog</a>
                </Typography>
                <PostsList items={items} />
            </Container>
        );
    }
}
