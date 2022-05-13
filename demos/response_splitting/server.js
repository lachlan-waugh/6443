const net = require('net');
const help = require('./helper');

const server = net.createServer(conn => {
    conn.on('data', data => {
        let req = {
            method:  null,
            path:    null,
            version: null,
            headers: {},
            cookies: {}
        };

        for (let idx = data.indexOf('\r\n', cur), cur = 0; idx != -1 && cur != idx; cur = idx + 2) {
            let line = data.slice(cur, idx).toString();
    
            if (cur == 0) {
                const [method, path, version] = line.toString().split(' ')
                req = { ...req, method, path, version }
            } else {
                let [key, val] = line.split(': ')
                if (/^cookie$/i.test(key)) {
                    val
                        .split(';')
                        .map(v => v.split('='))
                        .forEach(([k, v]) => {
                            req.cookies[decodeURIComponent(k.trim())] = decodeURIComponent(v.trim())
                        })
                }

                req.headers[key] = val;
            }
        }

        conn.end(help.headers.map(s => s.trim()).join('\r\n') + '\r\n\r\n' + help.body)
    });
}).on('error', err => { throw err })

server.listen(process.env.PORT || 8000, process.env.HOST || '0.0.0.0', () => {
  console.log(`Listening on ${server.address().address}:${server.address().port}`)
})