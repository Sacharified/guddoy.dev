import { Chip } from "@material-ui/core";
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

    const toggleTag = tag => {
        const { tags = "" } = router.query;
        const tagsArr = tags.length ? tags.split(",") : [];
        const tagIndex = tagsArr.indexOf(tag);
        if (tagIndex === -1) {
            tagsArr.push(tag);
        } else {
            tagsArr.splice(tagIndex, 1);
        }
        const newTags = tagsArr.join(",");
        const href = { pathname: router.pathname, query: { ...router.query, tags: newTags } };
        router.push(href);
    }

    return (
        <Chip
            size="small"
            label={tag}
            key={tag}
            className={classes.chip}
            color={active ? "primary" : "default"}
            onClick={() => toggleTag(tag)}
        />
    );
};

const TagList = ({ tags = [], activeTags = [] }) => tags.map(tag => <Tag tag={tag} key={tag} active={activeTags.includes(tag)} />);
export default TagList;