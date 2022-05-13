const net = require('net')

const server = net
  .createServer(conn => {
    conn.on('data', function (data) {
      let cur = 0
      let idx

      let req = {
        method: null,
        path: null,
        version: null,
        headers: {},
        cookies: {}
      }

      while ((idx = data.indexOf('\r\n', cur)) != -1 && cur != idx) {
        let line = data.slice(cur, idx).toString()
        console.log('Parse', line)
        if (cur == 0) {
          let [method, path, version] = line.toString().split(' ')
          req = { ...req, method, path, version }
        } else {
          let [key, val] = line.split(': ')
          if (/^cookie$/i.test(key)) {
            val
              .split(';')
              .map(v => v.split('='))
              .forEach(([k, v]) => {
                req.cookies[decodeURIComponent(k.trim())] = decodeURIComponent(
                  v.trim()
                )
              })
          }
          req.headers[key] = val
        }

        cur = idx + 2
      }

      if (req.path == '/') {
        let headers = [
          'HTTP/1.1 200 OK',
          'Connection: Closed',
          'Content-Type: text/html',
          ...(function (req, name) {
            if (req.method == 'POST') {
              req.cookies.name = name
              return [
                'Set-Cookie: name=' +
                  (name ?? '; expires=Thu, 01 Jan 1970 00:00:00 GMT')
              ]
            }
            return []
          })(
            req,
            new URLSearchParams(data.slice(cur + 2).toString()).get('name')
          ),
          'Set-Cookie: auth=FLAG{SECRET_DATA}; HttpOnly',
          "Content-Security-Policy: script-src 'none'"
        ]

        let body = `
        <h1>Response Splitting as a Service</h1>
        <!-- Gosh this is so secure because featherbear wrote it -->
        <p style="white-space: pre-line">
        Hey there${req.cookies.name ? `, ${req.cookies.name}!` : ''}
        </p>
        <form method="POST">
        <textarea name='name' rows="3" placeholder="Enter your name"></textarea>
        <button type='submit'>Send em'</button>
        </form>
        `.trim()
        conn.end(headers.map(s => s.trim()).join('\r\n') + '\r\n\r\n' + body)
        return
      }

      let headers = ['HTTP/1.1 404 Not Found', 'Connection: Closed']
      conn.end(headers.map(s => s.trim()).join('\r\n') + '\r\n\r\n')
    })
  })
  .on('error', err => {
    throw err
  })

server.listen(process.env.PORT || 8000, process.env.HOST || '0.0.0.0', () => {
  console.log(`Listening on ${server.address().address}:${server.address().port}`)
})
