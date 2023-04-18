const net = require('net');
const help = require('./helper');

const server = net.createServer(conn => {
    conn.on('data', data => {
        let name;
        data = data.toString();

        // If it's a post request, get the name from the body
        if (/^POST/.test(data) && /\nname=/.test(data)) {
            // kinda hacky but like l0l, cba using burp suite
		    name = decodeURIComponent(data.match(/\nname=(.*)$/)[1]).replace(/\+/g, ' ');

            // the non-scuffed version, but you have to intercept with burp or it URL-encodes the \r\n\r\n into %0D%0A%0D%0A
            // name = data.match(/\nname=(.*)$/)[1]

        // If it's a get request, reuse the existing cookie
        } else {
            name = data.match(/; name=(.*)\r\n\r\n/)?.[1];
        }

        conn.end(help.header(name).map(s => s.trim()).join('\r\n') + '\r\n\r\n' + help.body(name))
    });
}).on('error', err => { console.log(err); throw err })

server.listen(3000, '0.0.0.0', () => {
  console.log(`[*] listening on localhost:${server.address().port}`)
})
