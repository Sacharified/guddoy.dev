import React from "react";
import Typography from "@material-ui/core/Typography";
import { Container } from "components/layout";
import Grid from "components/grid";
import Post from "components/post";
import Link from "next/link";
import { inject } from "mobx-react";

@inject("store")
class IndexPage extends React.Component {
	render() {
		return (
			<>
				<Container maxWidth="md">
					<Typography variant="h2" component="h2" gutterBottom>
						Sacha Guddoy
					</Typography>
					<Typography variant="h5" component="h5" gutterBottom>
						Front-end engineer <a href="https://about.grabyo.com" target="_blank" rel="noreferrer noopener">@grabyo</a>
					</Typography>
				</Container>
				<Container maxWidth="md">
					<Link href="blog">
						<Typography variant="h4" component="h4" gutterBottom>
							<a>Blog</a>
						</Typography>
					</Link>
					<Grid items={this.props.store.posts} component={Post} />
				</Container>
			</>
		);
	}
}

export default IndexPage;