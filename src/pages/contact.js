import React from "react";
import ContactForm from "components/forms/contact";
import Typography from "@material-ui/core/Typography";
import { Container } from "components/layout";

export default class PostPage extends React.Component {
	render() {
		return (
            <Container maxWidth="sm">
                <Typography variant="h4" component="h4" gutterBottom>
                    Get in touch
                </Typography>
                <ContactForm />
            </Container>
        );
	}
}
