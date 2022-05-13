exports.body = (type, content) => {
    console.log(type);
    const opt = {
        'reflect': [
            'REFLECTED',
            (content) ? `<p>Hey there ${content ?? '?'}!</p>` : null
        ],
        'stored': [
            'STORED',
            `<ul>${content.reverse().map(post => `<li>${post}</li>`)}</ul>`
        ],
        'dom': [
            'DOM-BASED',
            (content) ? `<p>Hey there ${content ?? '?'}!</p>` : null
        ]
    }[type];

    return `
        <h1>${opt[0]} XSS</h1>
        <form method="POST">
            <textarea name='name' rows="3" placeholder="Wait a second, who are you?"></textarea>
            <button type='submit'>hack!</button>
        </form>
        ${opt[1]}
    `.trim();
}
