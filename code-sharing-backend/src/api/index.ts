import { config } from "dotenv";
import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import http from "node:http";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import createError from "http-errors";
import logger from "morgan";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import snippetRouter from "../routes/snippets";
import { normalizePort, onError, onListening } from "../utils/server.util";

const app: Express = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/api/snippets", snippetRouter);

main().catch((err) => console.log(err));

async function main() {
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

export default (req: VercelRequest, res: VercelResponse) => {
	return app(req, res);
};

const port = normalizePort(process.env.PORT ?? "3000");
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Server is running on port ${port}`));
server.on("error", (error) => onError(error, port));
server.on("listening", () => onListening(server));
