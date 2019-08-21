import Card from "components/card";

const Post = ({ sys, fields }) => {
    return (
        <Card
            title={fields.title}
            date={sys.createdAt}
            image={fields.heroImage.fields && fields.heroImage}
            link={{
                href: `/post?id=${sys.id}`,
                as: `/post/${fields.slug}`
            }}
        />
    );
};

export default Post;