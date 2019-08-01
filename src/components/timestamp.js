import Typography from "@material-ui/core/Typography";
import { formatDate } from "utils/date";

const TimeStamp = ({ date }) => (
    <Typography variant="caption">
        Last updated: {formatDate(date)}
    </Typography>
);
export default TimeStamp;