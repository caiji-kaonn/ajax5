// 这是个做ajax请求的服务器
// 引入http,fs
const http = require('http');
const fs = require('fs');
const server = http.createServer();
server.listen(8080, '172.20.10.2', () => {
    console.log('服务器已启用，可通过 http://172.20.10.2:8080 访问 ')
});
server.on('request', (req, res) => {
    console.log('请求进来了');
    // 请求静态资源判断
    if (req.url.startsWith('/views') || req.url.startsWith('/assets')) {
        if (req.url.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css')
        };
        fs.readFile('.' + req.url, (err, data) => {
            if (err) console.log(err);
            res.end(data);
        });

    } else {
        if (req.url === '/getAllHeros') {
            fs.readFile('./data/heros.json', (err, data) => {
                if (err) console.log(err);
                res.end(data);
            })
        }
    }
})