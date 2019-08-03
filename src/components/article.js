import { Container } from "components/layout";
import TimeStamp from "components/timestamp";
import Typography from "@material-ui/core/Typography";
import { richTextToComponent } from "utils/text";
import TagList from "components/tags";

const HeroImage = ({ file: { url, title }, description }) => (
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

export default ({ fields: { title, subtitle, tags, heroImage, content }, sys: { createdAt } }) => (
	<Container component="article" maxWidth="md">
		<Header title={title} subtitle={subtitle} date={createdAt} tags={tags} />
		{heroImage.fields && <HeroImage {...heroImage.fields} />}
		<Container maxWidth="md">
			<Typography variant="body1" component="div" gutterBottom>
				{richTextToComponent(content)}
			</Typography>
		</Container>
	</Container>
);
