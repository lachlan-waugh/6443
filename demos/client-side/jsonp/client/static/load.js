const load = (content) => {
    content.forEach((joke) => {
        let d = document.createElement('div');
        let p = document.createElement('p');
        p.innerText = joke
        d.appendChild(p);
        document.querySelector('#jokes').appendChild(d)
    });
}

const load_data = async () => {
    const jokes = await (await fetch('http://100.107.38.147:7031')).text();
    load(jokes);
};
// load_data();
