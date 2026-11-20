'use strict';

const http = require('node:http');

const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT 必须是 1 到 65535 之间的整数。');
  process.exit(1);
}

const server = http.createServer((request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;
  const isHealthCheck = request.method === 'GET' && path === '/health';
  response.writeHead(isHealthCheck ? 200 : 404, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(isHealthCheck ? { status: 'ok' } : { error: 'not_found' }));
});

server.listen(port, '127.0.0.1', () => {
  console.log(`两颗心后台已启动：http://127.0.0.1:${port}`);
});
