import Router from "next/router";
import { getEntry } from "api/services/content";
import Article from "components/article";

export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.id = Router.router.query.id;
		this.fetchState();
	}

	async fetchState() {
		const data = await getEntry(this.id);
		this.setState({ data });
	}

	render() {
		const { data } = this.state;
		return (
			<>
				{data && <Article {...data} /> }
			</>
		);
	}
};