import { Container } from "components/layout";
import TimeStamp from "components/timestamp";
import Typography from "@material-ui/core/Typography";
import { Chip } from "@material-ui/core";
import { getPostComponent } from "api/services/content";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
	},
	chip: {
	  margin: theme.spacing(1),
	},
  }));

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

const TagList = ({ tags = [] }) => tags.map(tag => {
	const classes = useStyles();
	return <Chip size="small" label={tag} key={tag} className={classes.chip} />;
});

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
			<Typography variant="caption" display="inline">Tags:</Typography> <TagList tags={tags} />
		</Container>
	</>
);

export default ({ fields, sys }) => {
	return (
		<Container component="article" maxWidth="md">
			<Header title={fields.title} subtitle={fields.subtitle} date={sys.createdAt} tags={fields.tags} />
			<HeroImage {...fields.heroImage.fields} />
			<Container maxWidth="md">
				<Typography variant="body1" component="div" gutterBottom>
					{getPostComponent(fields.content)}
				</Typography>
			</Container>
		</Container>
	);
}
