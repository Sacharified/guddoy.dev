
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";
import CodeBlock from "components/code";

const options = {
	renderNode: {
		[INLINES.EMBEDDED_ENTRY]: ({ data: { target: { fields, sys } } }) => {
			switch (sys.contentType.sys.id) {
				case "codeBlock":
					return <CodeBlock>{fields.code}</CodeBlock>;
				default:
					return <>{sys.contentType.toJSON()}</>
			}
		}
	}
};
export const richTextToComponent = content => documentToReactComponents(content, options);
