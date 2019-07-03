import Head from "next/head";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';

function Home() {
    return (
        <>
            <Head>
                <title>Sacha Guddoy</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <Container maxWidth="sm">
            <Typography variant="h1" component="h2" gutterBottom>
                Sacha Guddoy
            </Typography>
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
            </Container>
        </>
    );
}

export default Home;