import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atom } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Codeblock = ({ children }) => {
	return (
		<SyntaxHighlighter language="javascript" style={atom}>
			{children}
		</SyntaxHighlighter>
	);
};

export default Codeblock;