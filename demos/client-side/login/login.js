document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
   
  const username = document.querySelector('input[type=text]').value;
  const password = document.querySelector('input[type=password]').value;
  let security_token = Math.floor(Math.random() * 10000);  

  if (username === 'admin' && password === 'admin' && security_token === 123456) {
    alert('You have logged in (cbf writing another page)');
  } else {
    alert('failed login attempt, hacking detected');
  }
});
