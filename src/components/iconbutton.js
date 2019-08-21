import IconButton from "@material-ui/core/IconButton";

const component = ({ title, icon }) => (
  <IconButton title={title} >
    <img src={icon} width="20px" height="20px" alt={title} />
  </IconButton>
);
export default component;
