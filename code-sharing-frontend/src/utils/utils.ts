import { languages } from "monaco-editor";

export const getLanguageList = () => {
	const languageList = languages.getLanguages();
	return languageList.map((language) => ({
		value: language.id,
		label: language.id.toUpperCase().replace(/\./g, " "),
	}));
};

export const getThemeList = () => {
	return [
		{ value: "vs", label: "Light" },
		{ value: "vs-dark", label: "Dark" },
		{ value: "hc-black", label: "High Contrast" },
	];
};

export const getDefaultValue = () => {
	const html = `<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      h1 {
        color: #cca3a3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallengs.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`;

	return { language: "html", value: html, theme: "vs" };
};
