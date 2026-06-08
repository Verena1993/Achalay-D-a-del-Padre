const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.ogg': 'audio/ogg',
    '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Normalize URL, decode URI components (e.g. %20 to spaces), and remove query strings
    let safeUrl;
    try {
        safeUrl = decodeURIComponent(req.url.split('?')[0]);
    } catch (e) {
        res.statusCode = 400;
        res.end('Bad Request');
        return;
    }
    
    if (safeUrl === '/') {
        safeUrl = '/index.html';
    }
    
    const filePath = path.join(PUBLIC_DIR, safeUrl);
    
    // Check if path is within public directory (prevent directory traversal)
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
    }
    
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.end('Not Found');
            return;
        }
        
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        
        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': stats.size,
            'Cache-Control': 'no-cache' // Disable caching for development
        });
        
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`Achalay Landing Page Server is running!`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`Visor de Recursos: http://localhost:${PORT}/assets_viewer.html`);
    console.log(`==================================================`);
});
