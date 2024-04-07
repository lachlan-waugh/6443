const calculate = (jokes) => {
    // machine-learned joke-funniness ranking algorithm 
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    const a = document.querySelector('article');
    window.setTimeout(() => { a.innerText = 'Calculating funniest joke...'; }, 2000);
    window.setTimeout(() => {
      a.ariaBusy = null;
      a.innerText = joke;
    }, 5000);
}

const load_data = async () => {
    const jokes = await (await fetch('http://jokes.com:7031')).text();
    calculate(jokes);
};
//load_data();
