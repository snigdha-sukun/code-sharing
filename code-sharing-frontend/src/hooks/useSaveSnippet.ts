import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const useSaveSnippet = ({
	code,
	language,
	theme,
}: { code: string; language: string; theme: string }) => {
	const saveSnippet = async () => {
		const body = {
			language,
			theme,
			code: code.split("\n"),
		};
		const res = await axios.post(`${API_URL}/api/snippets`, body, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return res.data.id;
	};

	return saveSnippet;
};
