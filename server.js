const http = require('http')
const fs = require('fs')

http
    .createServer((request, response) => {
        console.log(request.url, request.url === '/upload')
        if (request.url === '/upload') {
            console.log('UPLOAD!!!')
            response.end()
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let readStream = fs.createReadStream('static/photoupload.html');
            readStream.pipe(response);
        }
    })
    .listen(5000)
