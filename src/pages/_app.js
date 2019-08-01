import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import IconButton from "components/iconbutton";
import GithubIcon from "static/img/github-circle.svg";
import TwitterIcon from "static/img/twitter.svg";
import HomeIcon from "material-design-icons/action/svg/production/ic_home_24px.svg";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class Layout extends React.Component {
	render() {
		const { children } = this.props;
		return (
			<>
				<AppBar position="fixed" color="default">
					<Toolbar>
						<Link href="/">
							<IconButton icon={HomeIcon} />
						</Link>
						<IconButton icon={GithubIcon} onClick={() => window.open("https://github.com/Sacharified/guddoy.dev")} />
						<IconButton icon={TwitterIcon} onClick={() => window.open("https://twitter.com/Sacharified")} />
						<Typography variant="h6" align="right" style={{ marginLeft: "auto" }}>Sacha Guddoy</Typography>
					</Toolbar>
				</AppBar>
				<div className="layout" style={{ marginTop: "100px" }}>
					{children}
				</div>
			</>
		);
	}
}

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<Container>
				<Head>
					<title>Sacha Guddoy</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
					<style>
						{`
						body { 
							padding: 0;
							margin: 0;
						}
					`}
					</style>
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Container>
		);
	}
}

export default MyApp;
