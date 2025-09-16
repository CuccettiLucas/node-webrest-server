import http2 from 'http2';
import fs from 'fs';
import path from 'path';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
}, (req, res) => {
    console.log(req.url);

    let filePath = './public' + (req.url === '/' ? '/index.html' : req.url);
    let ext = path.extname(filePath);

    let contentType = 'text/plain';
    if (ext === '.html') contentType = 'text/html';
    else if (ext === '.css') contentType = 'text/css';
    else if (ext === '.js') contentType = 'application/javascript';

    try {
        // Verifica si el path es un archivo
        if (fs.statSync(filePath).isDirectory()) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            return res.end('Forbidden: is a directory');
        }

        const content = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);

    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(8080, () => {
    console.log('Server runing on port 8080');
});
