import React from "react";
import PostItem from "components/posts/item";
import ContentService from "api/services/content";


class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.fetchState();
    }

    async fetchState() {
        const { items } = await ContentService.getEntries();
        this.setState(state => ({ ...state, items }));
    }

    render() {
        return (
            <ul>
                {this.state.items.map(item => <PostItem key={item.sys.id} {...item} />)}
            </ul>
        )
    }
}

export default PostsList;