import { config } from "dotenv";
import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import createError from "http-errors";
import logger from "morgan";

import snippetRouter from "./routes/snippets";

const app: Express = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/api/snippets", snippetRouter);

connectDB().catch((err) => console.log(err));

async function connectDB() {
	config();
	const MONGODB_URI = process.env.MONGODB_URI?.replace(
		"${MONGODB_PASSWORD}",
		process.env.MONGODB_PASSWORD ?? "",
	);
	if (!MONGODB_URI) {
		throw new Error("MONGODB_URI is not defined");
	}
	await mongoose.connect(MONGODB_URI);
}

app.use((req: Request, res: Response, next: NextFunction) => {
	next(createError(404));
});

interface Error {
	status?: number;
	message?: string;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status ?? 500);
	res.json({ error: err.message });
});

export default app;
