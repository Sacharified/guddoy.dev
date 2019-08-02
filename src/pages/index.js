import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Form, { InputContainer } from "components/form";
import { Container } from "components/layout";
import PostsList from "components/posts/list";
import Link from "next/link";
import { createStore } from "api/services/content";
import { serviceFactory } from "api/services/content";

export default class extends React.Component {
	static async getInitialProps(props) {
		const service = await serviceFactory();
		const store = await createStore(service);
		return { store, ...props };
	}

	render() {
		return (
			<>
				<Container maxWidth="md">
					<Typography variant="h2" component="h2" gutterBottom>
						Sacha Guddoy
					</Typography>
					<Typography variant="h5" component="h5" gutterBottom>
						Front-end engineer
						<a href="https://about.grabyo.com" target="_blank">@grabyo</a>
					</Typography>
				</Container>
				<Container maxWidth="md">
					<Link href="blog">
						<Typography variant="h4" component="h4" gutterBottom>
							<a>Blog</a>
						</Typography>
					</Link>
					<PostsList items={this.props.store.entries} />
				</Container>
				<Container maxWidth="sm">
					<Paper>
						<Container maxWidth="sm">
							<Typography variant="h4" component="h4" gutterBottom>
								Get in touch
							</Typography>
							<Form name="contact" method="POST" data-netlify="true">
								<input type="hidden" name="form-name" value="contact" />
								<InputContainer>
									<TextField
										id="name"
										name="name"
										label="Name"
										required
										fullWidth
									/>
								</InputContainer>
								<InputContainer>
									<TextField
										id="name"
										name="email"
										label="Email Address"
										type="email"
										required
										fullWidth
									/>
								</InputContainer>
								<InputContainer>
									<TextField
										id="name"
										name="message"
										label="Message"
										required
										multiline
										rows="3"
										rowmdax="10"
										fullWidth
									/>
								</InputContainer>
							</Form>
						</Container>
					</Paper>
				</Container>
			</>
		);
	}
}