import debug from "debug";
import type { Server } from "node:http";

export function onListening(server: Server) {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
	debug(`Listening on ${bind}`);
}

interface ErrorWithSyscall extends Error {
	syscall?: string;
	code?: string;
}

export function onError(
	error: ErrorWithSyscall,
	port: string | number | false,
) {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

	switch (error.code) {
		case "EACCES":
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

type NormalizedPort = (val: string) => number | string | false;

export const normalizePort: NormalizedPort = (
	val: string,
): number | string | false => {
	const port = Number.parseInt(val, 10);

	if (Number.isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
};
