const load_user = async () => {
  let data = await (await fetch('/whoami')).json();
  let box = document.querySelector('code')
  box.innerText = JSON.stringify(data.user, undefined, 2);
  box.style.display = 'block';
}

window.onload = load_user
window.setInterval(load_user, 1000)

document.querySelector('input[type=button]').addEventListener('click', async (e) => {
  e.preventDefault();

  let fields = {}
  Array
    .from(document.querySelectorAll('input, select'))
    .filter((e) => e.type !== 'button' && e.value)
    .map((e) => {
      fields[e.name] = e.value
  });

  let response = await fetch('/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields)
  });

  let box = document.querySelector('article')
  if (response.status == 200) {
    box.classList = ['pico-background-green-350']
  } else {
    box.classList = ['pico-background-red-400']
  }

  let data = await response.json();
  box.innerText = data.message
  box.style.display = 'block';
  load_user();
});
