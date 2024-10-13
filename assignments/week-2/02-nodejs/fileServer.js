const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Route 1: GET /files - List all files
app.get("/files", (req, res) => {
	const directoryPath = path.resolve(__dirname, "files"); // Use absolute path
	fs.readdir(directoryPath, (err, items) => {
		if (err) {
			// Send 500 if there's an internal server error
			return res.status(500).send("Internal Server Error");
		}
		res.status(200).json(items);
	});
});

// Route 2: GET /file/:filename - Return file content
app.get("/file/:filename", (req, res) => {
	const fileName = req.params.filename;
	const filePath = path.resolve(__dirname, "files", fileName); // Use absolute path
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			// Return 404 if the file is not found
			return res.status(404).send("File not found");
		}
		res.status(200).send(data);
	});
});

// Catch-all route for invalid endpoints
app.use((req, res) => {
	res.status(404).send("Route not found");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

module.exports = app;
