import { Fragment } from "react";
import { Container } from "components/layout";
import Typography from "@material-ui/core/Typography";
import { getPostComponent } from "api/services/content";

export const HeroImage = ({ file: { url, title }, description }) => (
    <Container maxWidth="md">
        <img
            src={url}
            alt={title}
            width="100%"
        />
        <Typography variant="caption">
            {description}
        </Typography>
    </Container>
);

export default ({ fields, sys }) => (
    <Container component="article"  maxWidth="md">
        <Container maxWidth="md">
            <Typography variant="h2" component="h2" gutterBottom>
                {fields.title}
            </Typography>
            <Typography variant="h5" component="h5" gutterBottom>
                {fields.subtitle}
            </Typography>
        </Container>
        <HeroImage {...fields.heroImage.fields} />
        <Container maxWidth="md">
            <Typography variant="body1" component="div" gutterBottom>
                {getPostComponent(fields.content)}
            </Typography>
        </Container>
    </Container>
);