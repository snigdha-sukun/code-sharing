import MonacoEditor from "@monaco-editor/react";

const Editor = ({
	language,
	value,
	theme,
	setValue,
	setLink,
}: {
	language: string;
	value: string;
	theme: string;
	setValue: (val: string) => void;
	setLink: (val: string | undefined) => void;
}) => {
	const handleEditorChange = (value: string | undefined) => {
		if (value) {
			setValue(value);
            setLink(undefined);
		}
	};

	return (
		<MonacoEditor
			height="50vh" // Set the height of the editor
			width="80vw" // Set the height of the editor
			defaultLanguage={language} // Set the default language
			defaultValue={value} // Set the default value
			onChange={handleEditorChange} // Handle changes
			theme={theme} // Set the theme (optional)
			options={{
				wordWrap: "on",
				minimap: { enabled: true },
			}}
		/>
	);
};

export default Editor;
