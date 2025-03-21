import { ThemeProvider } from "styled-components";
import { theme } from "./utils/theme";
import { GlobalStyles } from "./utils/globalStyles";
import {
	Container,
	DropDownContainer,
	HeadingsContainer,
	LargeHeading,
	SmallHeading,
	StyledButtonsContainer,
	StyledEditorContainer,
} from "./App.styled";
import Editor from "./components/Editor/Editor";
import Button from "./components/Button/Button";
import Dropdown from "./components/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import { getDefaultValue, getLanguageList, getThemeList } from "./utils/utils";
import Link from "./components/Link/Link";
import { useFetchSnippet } from "./hooks/useFetchSnippet";
import type { Snippet } from "./utils/types";
import { useSaveSnippet } from "./hooks/useSaveSnippet";

function App() {
	const { language, value, theme: defaultTheme } = getDefaultValue();
	const themeList = getThemeList();
	const languageList = getLanguageList();
	const [selectedTheme, setSelectedTheme] = useState(defaultTheme);
	const [selectedLanguage, setSelectedLanguage] = useState(language);
	const [editorValue, setEditorValue] = useState(value);
	const [link, setLink] = useState<string | undefined>();

	const id = window.location.pathname.split("/").pop();
	const snippet: Snippet | undefined = useFetchSnippet(id);
	const saveSnippet = useSaveSnippet({
		code: editorValue,
		language: selectedLanguage,
		theme: selectedTheme,
	});

	useEffect(() => {
		if (snippet) {
			setEditorValue(snippet.code.join("\n"));
			setSelectedLanguage(snippet.language);
			setSelectedTheme(snippet.theme);
			setLink(snippet.id);
		}
	}, [snippet]);

	async function handleShare() {
		const sharedId = await saveSnippet();
		if (sharedId) {
			setLink(sharedId);
			navigator.clipboard.writeText(`${window.location.origin}/${sharedId}`);
		}
	}

	const onThemeChange = (value: string) => {
		setSelectedTheme(value);
		setLink(undefined);
	};

	const onLanguageChange = (value: string) => {
		setSelectedLanguage(value);
		setLink(undefined);
	};

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Container>
				<div>
					<img src="/NoteCodeLogo.svg" alt="NoteCode Logo" />
				</div>
				<HeadingsContainer>
					<SmallHeading>Create & Share</SmallHeading>
					<LargeHeading>Your Code easily</LargeHeading>
				</HeadingsContainer>
				<StyledEditorContainer $isDark={selectedTheme !== "vs"}>
					<Editor
						language={selectedLanguage}
						value={editorValue}
						theme={selectedTheme}
						setValue={setEditorValue}
						setLink={setLink}
					/>
					<StyledButtonsContainer>
						<DropDownContainer>
							<Dropdown
								options={languageList}
								selectedValue={selectedLanguage}
								onChange={onLanguageChange}
							/>
							<Dropdown
								options={themeList}
								selectedValue={selectedTheme}
								onChange={onThemeChange}
							/>
						</DropDownContainer>
						<DropDownContainer>
							<Link link={link} isDark={selectedTheme !== "vs"} />
							<Button isShared={!!link} handleClick={handleShare} />
						</DropDownContainer>
					</StyledButtonsContainer>
				</StyledEditorContainer>
			</Container>
		</ThemeProvider>
	);
}

export default App;
