import Router from "next/router";
import ContentService from "api/services/content";
import { Container } from "components/layout";
import Typography from "@material-ui/core/Typography";
import { Paper } from '@material-ui/core';

export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: {}, fetching: true };
	}

	componentDidMount() {
		this.id = Router.router.query.id;
		this.fetchState();
	}

	async fetchState() {
		const data = await ContentService.getEntry(this.id);
		this.setState({ data });
	}

	render() {
		const { data: { sys, fields } } = this.state;
		return (
			<>
			{fields &&
				<Container maxWidth="sm">
					<Paper>
						<Container maxWidth="sm">
							<Typography variant="h2" component="h2" gutterBottom>
								{fields.title}
							</Typography>
							<Typography variant="h5" component="h5" gutterBottom>
								{fields.subtitle}
							</Typography>
						</Container>
						<Container maxWidth="sm">
							<img src={fields.heroImage.fields.file.url} alt={fields.heroImage.fields.file.title} />
						</Container>
						<Container maxWidth="sm">
							<Typography variant="body1" component="p" gutterBottom>
								This is the blog post content.
							</Typography>
						</Container>
					</Paper>
				</Container>
			}
			</>
		);
	}
};