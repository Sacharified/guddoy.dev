import { makeStyles } from "@material-ui/core/styles";
import Lqip from "lqip-react-ssr";

const useStyles = makeStyles(() => ({
	root: ({ width, height }) => ({
        paddingBottom: `${(height / width) * 100}%`,
        height: 0
	})
}));

const Image =  ({
	image: {
        fields: {
            file: {
                url,
                details: {
                    image: { width, height }
                }
            }
        },
        title
    },
    color = "#fafafa",
    blur = 10
}) => {
    
    const fileName = url.split("/").pop();
    const folder = `/static/content/img/${fileName}`;
    const classes = useStyles({ height, width });
    return (
        <div className={classes.root} >
            <Lqip
                aspectRatio={`${width}x${height}`}
                thumbnail={`${folder}/image.svg`}
                src={`${folder}/image.jpeg`}
                alt={title}
                width="100%"
                color={color}
                blur={blur}
                lazyLoad="none"
            />
        </div>
    );
};

export default Image;