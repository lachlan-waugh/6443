exports.header = (name) => 
    [
        'HTTP/1.1 200 OK',
        'Connection: Closed',
        'Content-Type: text/html',
        ...(name) ? [`Set-Cookie: name=${name};`] : [],
        'Set-Cookie: secret=FLAG{super_secret_flag_haha_wait_what}; HttpOnly',
        "Content-Security-Policy: script-src 'none'"
    ];

exports.body = (name) => `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
      </head>
      <body>
        <main class="container">
          <h1>Response Splitting</h1>
          <p>
              Wait, you really think that "${name ?? 'web apps isn\'t trivial'}"?
          </p>
          <form method="POST">
              <textarea name='name' rows="5" placeholder="Gimme data, yum?"></textarea><br/>
              <button type='submit'>chomp!</button>
          </form>
        </body>
      </main>
    </html>
`.trim();
