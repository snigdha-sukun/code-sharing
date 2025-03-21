import { v4 as uuidv4 } from "uuid";
import { model, Schema } from "mongoose";

const snippetSchema = new Schema({
	id: { type: String, default: uuidv4, required: true },
	language: {
		type: String,
		required: true,
	},
	theme: {
		type: String,
		required: true,
		enum: ["vs", "vs-dark", "hc-black"],
		default: "vs",
	},
	code: { type: [String], required: true },
});

export const SnippetModel = model("Snippet", snippetSchema);
