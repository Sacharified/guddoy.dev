import React from "react";
import MuiContainer from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { inject } from "mobx-react";

const useStyles = makeStyles(theme => ({
	muiContainer: {
		marginBottom: `${theme.spacing(2)}px`,
		paddingTop: `${theme.spacing(2)}px`,
		paddingBottom: `${theme.spacing(2)}px`,
	}
}));

export const Container = (props) => {
	const classes = useStyles();
	return (
		<MuiContainer {...props} className={props.className + " " + classes.muiContainer}>
			{props.children}
		</MuiContainer>
	);
};

const footerStyles = makeStyles(theme => {
	return {
		container: {
			background: theme.palette.grey[300],
			padding: theme.spacing(2)
		},

		a: {
			textDecoration: "none",
			display: "block",
			color: theme.palette.text.primary,
			marginBottom: theme.spacing(1),
			
			"&:visited": {
				color: theme.palette.text.primary,
			},

			"&:hover": {
				textDecoration: "underline"
			}
		}
	}
});

export const Footer = inject("store")(({ links }) => {
	const classes = footerStyles();
	return (
		<footer className={classes.container}>
				{links.map(({ link, linkTitle }) => (
					<Link href={link} key={link}>
						<a className={classes.a}>{linkTitle}</a>
					</Link>
				))}
		</footer>
	);
});