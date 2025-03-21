import http from "node:http";

import app from "./app";
import { normalizePort, onError, onListening } from "./utils/server.util";

if (process.env.NODE_ENV !== "production") {
	const port = normalizePort(process.env.PORT ?? "3000");
	app.set("port", port);

	const server = http.createServer(app);
	server.listen(port, () => console.log(`Server is running on port ${port}`));
	server.on("error", (error) => onError(error, port));
	server.on("listening", () => onListening(server));
}