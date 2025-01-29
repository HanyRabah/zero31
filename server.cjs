// server.cjs
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer(async (req, res) => {
		try {
			const parsedUrl = parse(req.url, true);

			// Handle API routes
			if (parsedUrl.pathname?.startsWith("/api/")) {
				res.setHeader("Content-Type", "application/json");
			}

			await handle(req, res, parsedUrl);
		} catch (err) {
			console.error("Error occurred handling", req.url, err);
			res.statusCode = 500;
			res.end("Internal Server Error");
		}
	}).listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://${hostname}:${port}`);
	});
});
