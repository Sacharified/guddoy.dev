import React from "react";
import Grid from "components/grid";
import Typography from "@material-ui/core/Typography";
import { Container } from "components/layout";
import TagList from "components/tags";
import Post from "components/post";
import { inject } from "mobx-react";

@inject("store")
class Blog extends React.Component {
    render() {
        const { query: { tags = "" }, store } = this.props;
        const tagsArr = tags.split(",").filter(item => item.length);
        const items = store.queryPostsByTag(tagsArr);

        return (
            <Container maxWidth="md">
                <Typography variant="h4" component="h4" gutterBottom>
                    <a>Blog</a>
                </Typography>
                <Container maxWidth="md">
                    <Typography variant="caption" display="inline">Tags:</Typography>
                    <TagList tags={store.tags} activeTags={tagsArr} />
                </Container>
                <Container maxWidth="md">
                    <Grid items={items} component={Post} />
                </Container>
            </Container>
        );
    }
}
export default Blog;