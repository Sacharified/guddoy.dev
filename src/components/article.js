import { Container } from "components/layout";
import TimeStamp from "components/timestamp";
import Typography from "@material-ui/core/Typography";
import { getPostComponent } from "api/services/content";

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

const Header = ({ title, subtitle, date }) => (
	<Container maxWidth="md">
		<Typography variant="h2" component="h2" gutterBottom>
			{title}
		</Typography>
		<Typography variant="subtitle1" component="h5" gutterBottom>
			{subtitle}
		</Typography>
		<TimeStamp date={date} />
	</Container>
);

export default ({ fields, sys }) => (
	<Container component="article" maxWidth="md">
		<Header title={fields.title} subtitle={fields.subtitle} date={sys.createdAt} />
		<HeroImage {...fields.heroImage.fields} />
		<Container maxWidth="md">
			<Typography variant="body1" component="div" gutterBottom>
				{getPostComponent(fields.content)}
			</Typography>
		</Container>
	</Container>
);
