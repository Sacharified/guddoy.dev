import Head from "next/head";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "components/iconbutton";
import GithubIcon from "static/img/github-circle.svg";
import TwitterIcon from "static/img/twitter.svg";
import TextField from '@material-ui/core/TextField';
import Form from "components/form";

const handleSubmit = values => {
    console.log(values);
};

function Home() {
    return (
        <>
            <Head>
                <title>Sacha Guddoy</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <Container maxWidth="lg">
                <IconButton icon={GithubIcon} onClick={() => window.open(`https://github.com/Sacharified/guddoy.dev`)} />
                <IconButton icon={TwitterIcon} onClick={() => window.open(`https://twitter.com/Sacharified`)} />
            </ Container>
            <Container maxWidth="lg">
                <Typography variant="h2" component="h2" gutterBottom>
                    Sacha Guddoy
                </Typography>
                <Typography variant="h5" component="h5" gutterBottom>
                    Web developer <a href="https://about.grabyo.com" target="_blank">@grabyo</a>
                </Typography>
            </Container>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h4" gutterBottom>
                    Get in touch
                    <Form name="contact" method="POST" netlify="true" onSubmit={handleSubmit}>
                        <TextField
                            id="name"
                            placeholder="name"
                        />
                    </Form>
                </Typography>
            </Container>
        </>
    );
}

export default Home;