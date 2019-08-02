import React from "react";
import PostsList from "components/posts/list";
import Typography from "@material-ui/core/Typography";
import { createStore } from "api/services/content";
import { serviceFactory } from "api/services/content";
import { Container } from "components/layout";
export default class Blog extends React.Component {
    static async getInitialProps(props) {
        const service = await serviceFactory();
        const store = await createStore(service);
		return { ...props, store };
    }
    
    render() {
        const { store } = this.props;
        return (
            <Container maxWidth="md">
                <Typography variant="h4" component="h4" gutterBottom>
                    <a>Blog</a>
                </Typography>
                <PostsList items={store.entries} />
            </Container>
        );
    }
}
