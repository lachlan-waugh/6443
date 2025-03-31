document.querySelector('#form').addEventListener('submit', (event) => event.preventDefault());
document.querySelector('#submit').addEventListener('click', async (event) => {
    event.preventDefault();

    document.querySelector('#error-ctr').style.display = 'none';

    const result = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: document.querySelector('#username').value,
            password: document.querySelector('#password').value
        })
    });

    if (result.status === 302) {
        window.location = '/';
    } else {
        document.querySelector('#error-ctr').style.display = 'block';
        document.querySelector('#error-msg').innerText = await result.text()
    }
});