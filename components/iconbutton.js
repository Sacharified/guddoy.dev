import IconButton from '@material-ui/core/IconButton';
const component = props => (
    <IconButton onClick={props.onClick}>
        <img src={props.icon} width="20px" height="20px" />
    </IconButton>
);
export default component;