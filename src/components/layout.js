import MuiContainer from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
    return {
        muiContainer: {
            marginBottom: `${theme.spacing(2)}px`,
            paddingTop: `${theme.spacing(2)}px`,
            paddingBottom: `${theme.spacing(2)}px`
        }
    }
});

export const Container = props => {
    const classes = useStyles();
    return (
        <MuiContainer {...props} className={classes.muiContainer} >
            {props.children}
        </MuiContainer>
    );
};