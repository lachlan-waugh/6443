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
    const jokes = await (await fetch('http://localhost:8000')).text();
    load(jokes);
};
load_data();