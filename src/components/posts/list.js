import React from "react";
import PostItem from "components/posts/item";
import Grid from "@material-ui/core/Grid";

class PostsList extends React.Component {
	render() {
		return (
			<Grid container spacing={2}>
				{this.props.items.map(item => (
					<Grid item xs={4} key={item.sys.id}>
						<PostItem {...item} />
					</Grid>
				))}
			</Grid>
		);
	}
}

export default PostsList;
