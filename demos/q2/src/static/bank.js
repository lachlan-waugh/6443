document.querySelector('#form').addEventListener('submit', (event) => event.preventDefault());
document.querySelector('#submit').addEventListener('click', async (event) => {
    event.preventDefault();

    document.querySelector('#error-ctr').style.display = 'none';

    const result = await fetch('/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            to: document.querySelector('#to').value,
            amount: document.querySelector('#amount').value
        })
    });

    if (result.status === 200) {
        document.querySelector('#balance').innerText = result.amount;
    } else {
        document.querySelector('#error-ctr').style.display = 'block';
        document.querySelector('#error-msg').innerText = await result.text();
    }
});
document.querySelector('#report').addEventListener('click', async (event) => {
    event.preventDefault();

    document.querySelector('#error-ctr').style.display = 'none';

    const result = await fetch('/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: window.location.href })
    });
    
    if (result.status === 200) {
        // nice, no problem :sunglasses:
    } else {
        document.querySelector('#error-ctr').style.display = 'block';
        document.querySelector('#error-msg').innerText = await result.text();
    }
});