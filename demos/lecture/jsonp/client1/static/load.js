const load = (content) => {
    content.forEach((joke) => {
        let a = document.createElement('article');
        a.innerText = joke
        document.querySelector('#jokes').appendChild(a)
    });
}

const load_data = async () => {
    const jokes = await (await fetch('http://jokes.demos')).text();
    load(jokes);
};
load_data();
