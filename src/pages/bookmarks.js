import React, { useState } from "react";
import { createClient, useQuery, useMutation } from "urql";
import Head from "next/head";
import { withUrqlClient } from "next-urql";

export const client = createClient({
    url: "https://guddoydev.hasura.app/v1/graphql",
    fetchOptions: () => ({
        headers: {
            "x-hasura-admin-secret":
                "SOblgoBVEwt0GfGqqvi3s6IpgrC4aqznyf7kBz1D1FPvYK2PEOZ7YIsBpRu1xgO3",
        },
    }),
});

const BOOKMARKS_QUERY = `
	query GetBookmarks {
		BOOKMARKS {
			CREATION_DATE
			DISPLAY_NAME
			ID
			URL
			TAGS
		}
		BOOKMARK_CATEGORIES {
			DISPLAY_NAME
			ID
			ITEMS
		}
	}
`;

const ADD_BOOKMARK_CATEGORY_MUTATION = `
	mutation AddBookmarkCategory($DISPLAY_NAME: String = "", $ITEMS: json = "[]") {
		insert_BOOKMARK_CATEGORIES_one(object: {ITEMS: $ITEMS, DISPLAY_NAME: $DISPLAY_NAME}) {
			DISPLAY_NAME
			ITEMS
		}
	}
`;

const ADD_BOOKMARK_TO_CATEGORY_MUTATION = `
	mutation AddBookmarkToCategory($_eq: uuid = "", $ITEMS: json = "") {
		update_BOOKMARK_CATEGORIES(_set: {ITEMS: $ITEMS}, where: {ID: {_eq: $_eq}}) {
			returning {
				DISPLAY_NAME
				ID
				ITEMS
			}
		}
  	}
`;

const ADD_BOOKMARK_MUTATION = `
	mutation AddBookmark($DISPLAY_NAME: String = "", $TAGS: json = "[]", $URL: String = "") {
		insert_BOOKMARKS_one(object: {DISPLAY_NAME: $DISPLAY_NAME, TAGS: $TAGS, URL: $URL}) {
			DISPLAY_NAME
			CREATION_DATE
			ID
			TAGS
			URL
		}
	}
`;

const addBookmarkCategory = async (category) => {
    const res = await client
        .query(ADD_BOOKMARK_CATEGORY_MUTATION, {
            DISPLAY_NAME: category,
            ITEMS: [],
        })
        .toPromise();
    return res;
};

const Bookmark = ({ CREATION_DATE, DISPLAY_NAME, URL, TAGS = [] }) => (
    <li>
        <h3>
            <a href={URL} target="blank" rel="nofollow">
                {DISPLAY_NAME}
            </a>
        </h3>
        Added: {new Date(CREATION_DATE).toDateString()}
        <br />
        {URL}
        <br />
        Tags:{" "}
        <ul>
            {TAGS.map((tag) => (
                <li key={tag}>{tag}</li>
            ))}
        </ul>
    </li>
);

export const getBookmarks = async () => {
    const { data } = await client.query(BOOKMARKS_QUERY).toPromise();
    return data;
};

const sortByCategory = (bookmarks, categories) => {
    return categories.reduce((acc, cat) => {
        const items = cat.ITEMS.map((ID) => bookmarks.find((b) => b.ID === ID));
        return [...acc, { ...cat, resolvedItems: items }];
    }, []);
};

const AddCategoryForm = () => {
    const [displayName, setDisplayName] = useState("");

    const submit = async () => {
        addBookmarkCategory(displayName);
        // window.location = window.location; // pro
    };
    return (
        <form>
            <label htmlFor={"display-name"} />
            <input
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
                name={"display-name"}
                id={"display-name"}
            />
            <button type="button" onClick={submit}>
                Add
            </button>
        </form>
    );
};

const AddBookmarkForm = ({ category: { ID, ITEMS }, onSubmit }) => {
    const [displayName, setDisplayName] = useState("");
    const [url, setUrl] = useState("");
    const [tags, setTags] = useState([]);

    const [, addBookmark] = useMutation(ADD_BOOKMARK_MUTATION);
    const [, addToCategory] = useMutation(ADD_BOOKMARK_TO_CATEGORY_MUTATION);

    const clearForm = () => {
        setDisplayName("");
        setUrl("");
        setTags([]);
    };

    const submit = async () => {
        const {
            data: { insert_BOOKMARKS_one: inserted },
        } = await addBookmark({
            DISPLAY_NAME: displayName,
            URL: url,
            TAGS: tags.split(","),
        });

        await addToCategory({
            _eq: ID,
            ITEMS: [...ITEMS, inserted.ID],
        });

        clearForm();
        onSubmit();
    };
    return (
        <form>
            <label htmlFor={"display-name"} />
            <input
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
                name={"display-name"}
                id={"display-name"}
            />
            <input
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                name={"url"}
                id={"url"}
            />
            <input
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                name={"tags"}
                id={"tags"}
            />
            <button type="button" onClick={submit}>
                Add
            </button>
        </form>
    );
};

const BookmarkCategory = (cat) => {
    const [showAddForm, setShowAddForm] = useState(false);
    return (
        <li key={cat.ID}>
            <h2>{cat.DISPLAY_NAME}</h2>
            <ul>
                {cat.resolvedItems.map((bookmark) => {
                    return bookmark ? (
                        <Bookmark key={bookmark.ID} {...bookmark} />
                    ) : null;
                })}
            </ul>
            {showAddForm && (
                <AddBookmarkForm
                    onSubmit={() => setShowAddForm(false)}
                    category={cat}
                />
            )}
            <button onClick={() => setShowAddForm(true)}></button>
        </li>
    );
};

const Bookmarks = (props) => {
    const [showForm, setShowForm] = useState(false);

    const [res] = useQuery({ query: BOOKMARKS_QUERY });
    console.log(res);
    return (
        <>
            <Head>
                <title>Bookmarks</title>
            </Head>
            <ul>
                {res.fetching
                    ? "loading"
                    : sortByCategory(
                          res.data.BOOKMARKS,
                          res.data.BOOKMARK_CATEGORIES
                      ).map((cat) => {
                          return <BookmarkCategory key={cat.ID} {...cat} />;
                      })}
            </ul>
            <button onClick={() => setShowForm(true)}>+</button>
            {showForm && <AddCategoryForm />}
        </>
    );
};

export default withUrqlClient(() => ({
    url: "https://guddoydev.hasura.app/v1/graphql",
    fetchOptions: () => ({
        headers: {
            "x-hasura-admin-secret":
                "SOblgoBVEwt0GfGqqvi3s6IpgrC4aqznyf7kBz1D1FPvYK2PEOZ7YIsBpRu1xgO3",
        },
    }),
}))(Bookmarks);
