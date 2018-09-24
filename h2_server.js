//
// HTTP/2 Server using NodeJS and HTTP2 API
//
// https://nodejs.org/api/http2.html#http2_http_2

const http2 = require('http2');
const fs = require('fs');
const path = require('path')

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });
  stream.end('HELLO'); // TODO => path.join(__dirname + '/index.html')
});

server.listen(8443);
