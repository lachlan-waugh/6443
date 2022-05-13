const net = require('net');
const help = require('./helper');

const server = net.createServer(conn => {
    conn.on('data', data => {
        let name, method;

        for (let idx = 0, end = data.indexOf('\r\n', idx); end != -1 && idx != end; idx = end + 2, end = data.indexOf('\r\n', idx)) {
            let line = data.slice(idx, end).toString();

            if (idx == 0) {
                method = line.toString().split(' ')
                if (method === 'POST') break;
            } else {
                let [key, val] = line.split(': ')
                if (/^cookie$/i.test(key)) {
                    name = val.match(/name=([^;]*)/i)[1]
                }
            }
        }

        if (method === 'POST') {
            
        }        

        conn.end(help.header(name).map(s => s.trim()).join('\r\n') + '\r\n\r\n' + help.body(name))
    });
}).on('error', err => { console.log(err); throw err })

server.listen(process.env.PORT || 8000, process.env.HOST || '0.0.0.0', () => {
  console.log(`Listening on ${server.address().address}:${server.address().port}`)
})