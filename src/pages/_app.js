import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import App, { Container } from "next/app";
import Head from "next/head";
import IconButton from "components/iconbutton";
import GithubIcon from "static/img/github-circle.svg";
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
				<Head>
					<title>Sacha Guddoy</title>
				</Head>
				<AppBar position="fixed" color="default">
					<Toolbar>
						<Link href="/">
							<a><IconButton title="home" icon={HomeIcon} /></a>
						</Link>
						<Link href="https://github.com/Sacharified/guddoy.dev">
							<a rel="noopener" target="_blank"><IconButton title="github" icon={GithubIcon} /></a>
						</Link>
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
		const { Component, router, pageProps } = this.props;
		return (
			<Container>
				<Head>
					<title>Sacha Guddoy</title>
				</Head>
				<Layout>
					<CssBaseline />
					<Component query={router.query} {...pageProps} />
				</Layout>
			</Container>
		);
	}
}

export default MyApp;
