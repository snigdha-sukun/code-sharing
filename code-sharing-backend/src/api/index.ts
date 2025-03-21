import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../app";
import { type ServerResponse, type IncomingMessage, createServer } from "node:http";

// Convert Express app into a Vercel-compatible function
export default function handler(req: VercelRequest, res: VercelResponse) {
	const server = createServer(app);
	server.emit(
		"request",
		req as unknown as IncomingMessage,
		res as unknown as ServerResponse,
	);
}
