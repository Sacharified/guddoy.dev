import React from "react";
import Grid from "components/grid";
import Typography from "@material-ui/core/Typography";
import { fetchContent, createStoreFromJson } from "api/services/content";
import { serviceFactory } from "api/services/content";
import { Container } from "components/layout";
import TagList from "components/tags";
import Post from "components/post";
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
        const { query: { tags = "" } } = this.props;
        const tagsArr = tags.split(",").filter(item => item.length);
        const items = this.store.queryPostsByTag(tagsArr);

        return (
            <Container maxWidth="md">
                <Typography variant="h4" component="h4" gutterBottom>
                    <a>Blog</a>
                </Typography>
                <Container maxWidth="md">
                    <Typography variant="caption" display="inline">Tags:</Typography>
                    <TagList tags={this.store.tags} activeTags={tagsArr} />
                </Container>
                <Container maxWidth="md">
                    <Grid items={items} component={Post} />
                </Container>
            </Container>
        );
    }
}
