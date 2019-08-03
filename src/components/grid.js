import React from "react";
import Grid from "@material-ui/core/Grid";

class GridComponent extends React.Component {
	render() {
		const Component = this.props.component;
		return (
			<Grid container spacing={2}>
				{this.props.items.map(item => (
					<Grid item xs={4} key={item.sys.id}>
						<Component {...item} />
					</Grid>
				))}
			</Grid>
		);
	}
}

export default GridComponent;
