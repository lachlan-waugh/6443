exports.header = (name) => 
    [
        'HTTP/1.1 200 OK',
        'Connection: Closed',
        'Content-Type: text/html',
        ...(name)
        ? [`Set-Cookie: name=${name};`]
        : [],
        'Set-Cookie: secret=FLAG{super_secret_flag_haha_wait_what}',
        'Content-Security-Policy: script-src: \'none\''
    ];

exports.body = (name) => `
    <h1>Response Splitting</h1>
    <p>
        Hey there ${name ?? '?'}!
    </p>
    <form method="POST">
        <textarea name='name' rows="3" placeholder="Wait a second, who are you?"></textarea>
        <button type='submit'>hack!</button>
    </form>
`.trim();