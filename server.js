const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

http
    .createServer((request, response) => {
        let parsedUrl = url.parse(request.url)
        console.log(parsedUrl, parsedUrl.pathname === '/upload')
        if (parsedUrl.pathname === '/upload') {
            response.write('UPLOAD!!!\n')
            if (parsedUrl.query) {
                for (let entry of parsedUrl.query.split('&')) {
                    response.write(entry + '\n')
                }
            }
            let buffer = []
            request.on('data', data => buffer += data)
            request.on('end', () => {
                response.write("Data length: " + buffer.length + "\n")
                console.log(buffer.toString())
                response.end()
            })
        } else if (parsedUrl.pathname === "/") {
            response.writeHead(302, {
                'Location': '/photoupload.html'
            })
            response.end()
        } else {
            let staticFile = path.join('static', parsedUrl.pathname)
            if (fs.existsSync(staticFile) && fs.statSync(staticFile).isFile()) {
                console.log("Returning static file [" + staticFile + "]")
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                let readStream = fs.createReadStream(staticFile);
                readStream.pipe(response);
            } else {
                response.writeHead(404)
                response.write("Not found: [" + staticFile + "]")
                response.end()
            }
        }
    })
    .listen(5000)
