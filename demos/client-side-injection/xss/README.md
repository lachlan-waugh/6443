docker build -t xss . && docker run -p 7000:5000 xss

You can toggle autoescape from true to false in templates/static.html
When it's on, it'll render `<` and `>` as `&lt;` and `&gt;`
But you can still get xss, as you can create an onload in the `<div>`
