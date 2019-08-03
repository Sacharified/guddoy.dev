import { Chip } from "@material-ui/core";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
	chip: {
		margin: theme.spacing(1),
	}
}));

const Tag = ({ tag, active }) => {
    const router = useRouter();
    const classes = useStyles();

    const toggleTag = (tag) => {
        const { tags = "" } = router.query;
        const href = { pathname: router.pathname, query: { ...router.query, tags: `${tags},${tag}` } };
        if (tags.includes(tag)) {
            href.query.tags =  tags.split(",").filter(item => item !== tag).join("");
        }
        router.push(href);
    }

    return (
        <Link href={{ pathname: "/blog", query: { tags: tag }}} >
            <Chip
                size="small"
                label={tag}
                key={tag}
                className={classes.chip}
                color={active ? "primary" : "default"}
                onClick={() => toggleTag(tag)}
            />
        </Link>
    );
};

const TagList = ({ tags = [], activeTags = [] }) => tags.map(tag => <Tag tag={tag} key={tag} active={activeTags.includes(tag)} />);
export default TagList;