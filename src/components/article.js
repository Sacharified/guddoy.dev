import { Container } from "components/layout";
import TimeStamp from "components/timestamp";
import Typography from "@material-ui/core/Typography";
import { richTextToComponent } from "utils/text";
import TagList from "components/tags";
import Image from "components/image";

const HeroImage = (image) => (
	<Container maxWidth="md">
		<Image image={image} />
		<Typography variant="caption">
			{image.description}
		</Typography>
	</Container>
);

const Header = ({ title, subtitle, date, tags }) => (
	<>
		<Container maxWidth="md">
			<Typography variant="h2" component="h2" gutterBottom>
				{title}
			</Typography>
			<Typography variant="subtitle1" component="h5" gutterBottom>
				{subtitle}
			</Typography>
			<TimeStamp date={date} />
		</Container>
		<Container>
			<Typography variant="caption" display="inline">Tags:</Typography>
			<TagList tags={tags} />
		</Container>
	</>
);

const Article = ({ fields, sys }) => {
	return (
		<Container component="article" maxWidth="md">
			<Header title={fields.title} subtitle={fields.subtitle} date={sys.createdAt} tags={fields.tags} />
			{fields.heroImage.fields && <HeroImage {...fields.heroImage} />}
			<Container maxWidth="md">
				<Typography variant="body1" component="div" gutterBottom>
					{richTextToComponent(fields.content)}
				</Typography>
			</Container>
		</Container>
	);
}


export default Article;