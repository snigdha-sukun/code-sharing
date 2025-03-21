import express from "express";
import type { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { SnippetModel } from "../models/SnippetModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	const uuid = uuidv4();
	const { language, theme, code } = body;
	if (!language || !theme || !code) {
		res.status(400).json({ error: "Invalid request" });
		return;
	}
	await SnippetModel.create({ id: uuid, language, theme, code });
	res.json({ id: uuid });
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const snippet = await SnippetModel.findOne({ id: req.params.id });
	if (!snippet) {
		res.status(404).json({ error: "Snippet not found" });
		return;
	}
	res.json(snippet);
});

export default router;
