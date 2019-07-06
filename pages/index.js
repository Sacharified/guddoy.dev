import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import IconButton from "components/iconbutton";
import GithubIcon from "static/img/github-circle.svg";
import TwitterIcon from "static/img/twitter.svg";
import TextField from '@material-ui/core/TextField';
import Form, { InputContainer } from "components/form";
import { Container } from "components/layout";

function Home() {
    return (
        <>
            <Head>
                <title>Sacha Guddoy</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <Container maxWidth="sm">
                <IconButton icon={GithubIcon} onClick={() => window.open(`https://github.com/Sacharified/guddoy.dev`)} />
                <IconButton icon={TwitterIcon} onClick={() => window.open(`https://twitter.com/Sacharified`)} />
            </ Container>
            <Container maxWidth="sm">
                <Typography variant="h2" component="h2" gutterBottom>
                    Sacha Guddoy
                </Typography>
                <Typography variant="h5" component="h5" gutterBottom>
                    Web developer <a href="https://about.grabyo.com" target="_blank">@grabyo</a>
                </Typography>
            </Container>
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
                            rowsMax="10"
                            fullWidth
                        />
                    </InputContainer>
                </Form>
            </Container>
        </>
    );
}

export default Home;