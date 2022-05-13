exports.header = (name) => 
    [
        'HTTP/1.1 200 OK',
        'Connection: Closed',
        'Content-Type: text/html',
        ...(name)
        ? [`Set-Cookie: name=${name};`]
        : [],
        'Set-Cookie: auth=FLAG{super_secret_flag_haha_wait_what}',
        'Content-Security-Policy: script-src: \'none\''
    ];

exports.body = (name) => `
    <h1>Response Splitting as a Service</h1>
    <p style="white-space: pre-line">
        Hey there ${name ?? '?'}!
    </p>
    <form method="POST">
        <textarea name='my_name' rows="3" placeholder="Wait a second, who are you?"></textarea>
        <button type='submit'>submit?</button>
    </form>
`.trim();