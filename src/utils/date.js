import dateFormat from "dateformat";

export const formatDate = ts => dateFormat(new Date(ts), "dddd, mmmm dS, yyyy, h:MM:ss TT");