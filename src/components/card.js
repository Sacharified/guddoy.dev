import { Card as MaterialCard, CardContent, CardHeader, CardMedia } from "@material-ui/core";
import TimeStamp from "components/timestamp";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
	return ({
		media: {
			height: 0,
			paddingTop: "56.25%", // 16:9
		},
		anchor: {
			color: theme.palette.text.primary,
			textDecoration: "none",
			"&:hover": {
				textDecoration: "underline",
			}
		}
	});
});

const Card = ({ title, date, image, link }) => {
	const classes = useStyles();
	return (
		<MaterialCard>
			<Link {...link} >
				<a className={classes.anchor}>
					{image && <CardMedia image={image.src} className={classes.media} />}
					<CardHeader title={title} />
				</a>
			</Link>
			<CardContent>
				<TimeStamp date={date} />
			</CardContent>
		</MaterialCard>
	);
};

export default Card;