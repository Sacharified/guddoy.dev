import TextField from "@material-ui/core/TextField";
import Form, { InputContainer } from "components/form";
import { Container } from "components/layout";

const ContactForm = () => (
	<Container maxWidth="sm">
		<Form name="contact" method="POST" data-netlify="true">
			<input type="hidden" name="form-name" value="contact" />
			<InputContainer>
				<TextField
					id="nameInput"
					name="name"
					label="Name"
					required
					fullWidth
				/>
			</InputContainer>
			<InputContainer>
				<TextField
					id="emailInput"
					name="email"
					label="Email Address"
					type="email"
					required
					fullWidth
				/>
			</InputContainer>
			<InputContainer>
				<TextField
					id="messageInput"
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
);

export default ContactForm;