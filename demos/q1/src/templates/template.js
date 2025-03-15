{% autoescape false %}
setTimeout(() => {
    // wait huh how do i use event handlers again
    // idk, but this seems to work fine :shrug:
    const input = '{{ email }}';
    '; fetch()
    if (/\w+@\w+\.com/.test('{{ email }}')) {
        document.querySelector('#success').innerText = 'ok we will get in contact with you';
        document.querySelector('#success').classList.remove('d-none');
        document.querySelector('#failure').classList.add('d-none');
    } else {
        document.querySelector('#failure').innerHTML = 'hmm, {{ email }} doesnt seem like a valid email';
        document.querySelector('#failure').classList.remove('d-none');
        document.querySelector('#success').classList.add('d-none');
    }
}, 1000);
{% endautoescape %}
