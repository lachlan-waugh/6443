exports.body = (type, content) => {
    const opt = {
        'reflect': [
            'REFLECTED',
            (content) ? `<p>Hey there ${content ?? '?'}!</p>` : ''
        ],
        'stored': [
            'STORED',
            // good programming practice, wtf is that l0l this is a demo
            `${content?.reverse()?.map(post => `<div><p>${post}</p></div>`)}`
        ],
        'dom': [
            'DOM-BASED',
            (content) ? `<p>Hey there ${content ?? '?'}!</p>` : null
        ]
    }[type];
}
