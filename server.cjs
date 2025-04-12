// Import the HTTP module
const http = require("http");
const fs = require("fs");
const path = require("path");

// Define the server
const server = http.createServer((req, res) => {
    let filePath = "." + req.url;
    if (filePath === "./") {
        filePath = "./index.html"; // Serve the main HTML file
    }

    // Get the file extension
    const extname = path.extname(filePath);
    let contentType = "text/html";

    // Define MIME types
    switch (extname) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "application/javascript";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".gif":
            contentType = "image/gif";
            break;
        case ".woff":
        case ".woff2":
            contentType = "font/woff";
            break;
        case ".ttf":
            contentType = "font/ttf";
            break;
        case ".svg":
            contentType = "image/svg+xml";
            break;
    }

    // Read and serve files
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === "ENOENT") {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<h1>404 Not Found</h1>", "utf-8");
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`, "utf-8");
            }
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf-8");
        }
    });
});

// Define the port
const PORT = 8080;

// Listen on the port
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});