import Typography from "@material-ui/core/Typography";
import { formatDate } from "utils/date";

const TimeStamp = ({ date }) => (
	<Typography variant="caption">
		Posted: {formatDate(date)}
	</Typography>
);
export default TimeStamp;
