const http = require('http');

const server = http.createServer((req, res) => {
    // Respond only to browser requests
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello Node');
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});