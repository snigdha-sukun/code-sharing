import axios from "axios";
import { useEffect, useState } from "react";
import type { Snippet } from "../utils/types";

const API_URL = import.meta.env.VITE_API_URL;
export const useFetchSnippet = (id?: string) => {
	console.log("🚀 ~ API_URL:", API_URL)
	const [snippet, setSnippet] = useState<Snippet | undefined>();

	useEffect(() => {
		if (id) {
			axios.get(`${API_URL}/api/snippets/${id}`).then((res) => {
				setSnippet(res.data);
			});
		}
	}, [id]);

	return snippet;
};
