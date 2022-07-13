document.querySelector('#postcomment').addEventListener('click', async (event) => {
    event.preventDefault();

    await fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: document.querySelector('#comment').value })
    });

    location.reload();
});

window.onload = async () => {
    query = decodeURIComponent(document.location.toString());

    // check if there are search parameters
    document.querySelector('#title').innerHTML = (query.includes('q='))
    ? `Showing comments containing: "${query.split('q=')[1]}"`
    : 'Showing all comments:';

    const comments = document.querySelector('#comments');
    comments.innerHTML = '';

    (await fetch('/comments').then((r) => r.json()))
        .forEach((comment) => comments.innerHTML += `<div title="${comment}"><p>${comment}</p></div>`);
};