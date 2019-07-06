import Button from "@material-ui/core/Button"
const FormComponent = props => {
    return (
        <form {...props}>
            {props.children}
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default FormComponent;