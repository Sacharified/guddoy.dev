import React from "react";
import PostItem from "components/posts/item";
import { getEntries } from "api/services/content";
import Grid from "@material-ui/core/Grid";

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
		const { items } = await getEntries();
		this.setState(state => ({ ...state, items }));
	}

	render() {
		return (
			<Grid container spacing={2}>
				{this.state.items.map(item => (
					<Grid item xs={4} key={item.sys.id}>
						<PostItem {...item} />
					</Grid>
				))}
			</Grid>
		);
	}
}

export default PostsList;
