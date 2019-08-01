import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
	const verticalSpacing = {
		marginBottom: `${theme.spacing(2.5)}px`
	};
	return {
		root: {
			backgroundColor: theme.palette.grey[50],
			padding: `${theme.spacing(2.5)}px`
		},
		button: {
		},
		inputContainer: {
			...verticalSpacing,
		},
	};
});

const FormComponent = (props) => {
	const classes = useStyles();
	return (
		<form {...props} className={classes.root}>
			{props.children}
			<div>
				<Button
					variant="contained"
					color="primary"
					type="submit"
					className={classes.button}
				>
					Submit
      </Button>
			</div>
		</form>
	);
};

export const InputContainer = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.inputContainer}>
			{props.children}
		</div>
	);
};

export default FormComponent;
