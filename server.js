const http = require('http')
const fs = require('fs')

http
    .createServer((request, response) => {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        let readStream = fs.createReadStream('static/photoupload.html');
        readStream.pipe(response);
    })
    .listen(5000)
