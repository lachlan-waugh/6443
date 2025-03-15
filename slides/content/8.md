---
title: "8: clientside"
layout: "bundle"
outputs: ["Reveal"]
---

## we'll get started at 1[68]:05

---

{{< slide class="center" >}}
## client-side protections
### 6[84]43 week8

---

# house cleaning 
{{% section %}}

## due dates
* the rest of the topic04 challenges should be out
* they're due sunday week9.

---

## reports (general feedback)
* consider context when determining impact, not everything is critical.
* keep technical stuff out of impact/remediation. It should mostly be in steps to reproduce.

{{% /section %}}

---

{{% section %}}

## mitigating xss
basic waf stuff

* *sanitisation*: stripping out unsafe tags/attributes
    * &lt;script&gt;alert(1)&lt;script&gt; &rarr; alert(1)  
* *encoding*: escaping control characters
    * \<\> &rarr; \&lt;\&gt;
* *validation*: allow/block-listing of content
    * block requests if you detect bad content

---

### don't use raw user input
* `.innerHTML` treats content as HTML (control)
    * use `.innerText` which treats it as data

* sanitize your input with a library (DOMPurify???)

* don't write vanilla JS, use a framework.
    * again, even if you use a framework, make sure the functions you're using sanitize the input

---

### breaking mitigations
* content stripped/blocked
    * embed dummy characters: `<SCRscriptIPT>`
    * use alternating case: `<ScRiPt>`
    * different tag `<img onerror=...>`
    * different event handler `<body onload=...>`

[here's a couple more](https://github.com/payloadbox/xss-payload-list)

---

### X-XSS-Protection
* no, it's [terrible](https://news.ycombinator.com/item?id=20472947)
> 'First, XSS 'protection' is about to not be implemented by most browsers...'

> 'Worse, the XSS 'protection' can be used to create security flaws...'

{{% /section %}}

---

{{% section %}}

### csrf mitigations
csrf tokens

Supply a single-use 'nonce' value.

* when the page is loaded, generate the nonce
* when a request is made, it must include the nonce
* it'll be stored as a: cookie, header, `<input>`

---

## quick demo

---

### breaking mitigations

* bad programming, they might be doing it wrong
    * re-use a previous token (if it doesn't expire)
    * create your own?
    * they might not even check it.

{{% /section %}}

---

### clickjacking mitigations
* csp frame-src / X-Frame-Options
* same-site cookies
* framebusters (~js magic~)

---

{{% section %}}
## CSP
Content Security Policy

* limits where a site can load content from, e.g.
    * only scripts from this website
    * only images from `https://b.com/a/path/`
    * only elements with a certain nonce value

* generally blocks iframes, inline scripts, `eval()`

* powerful & hard to bypass (if devs were smart)

---

### how is it defined
policy directives made of directive and value

e.g. `script-src: unsafe-inline`

* `script-src` is the `directive`
* `unsafe-inline` is the `value`
* the whole thing is the policy directive

---

### what directives are there

* script-src
* frame-src
* img-src
* object-src
* default-src

> read more [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)

---

### what values are there

* *none*: blocks all loading
* *self*: only from the current origin
* *strict-dynamic*: anything w/ a hash/nonce (& anything they load/create)
* *unsafe-inline*: e.g. \<script\>alert(1)\</script\>
* *unsafe-eval*: e.g. eval(), setTimeout()

---

### where is it defined
* http header
    * `Content-Security-Policy: ???-src <policy directive>`

* or in a tag
    * `<meta http-equiv="Content-Security-Policy" content="???-src <directive>">`
    * though not as powerful

{{% /section %}}

---

### how to break it?
* corrupting the HTTP header (response splitting?)
* overwriting the `<meta>` tag?

---

{{% section %}}

### jsonp
* what did people do before CORS was available?

* json with padding
    * you can't load a resource from another domain
    * but you can load a script
    * so, return a script which loads the content? :brain:

---

### what
* how do you load the content? you run a function which takes the data as an argument.

* since we're loading the data, we define what function is being used to load it.

---

### jsonp example
* define the function using a `callback` parameter
```html
<!-- https://melon.com/numbers?callback=load_data -->
load_data([1, 2, 3, 4, 5])
```

&nbsp;

* the script below will invoke `load_data([...])`
```html
<script src="https://melon.com/numbers?callback=load_data"></script>
```

---

### demo

{{% /section %}}

---

{{% section %}}

## http response splitting
* an exploit when user-controlled input is used in a server's HTTP response header
* how does  program determine: 
    * the end of a header?
    * the end of the headers/start of the body?

---

* headers are separated by `\r\n` (`CR\LF`)
* body is separated with two `\r\n`'s
* what if our input included `\r\n\r\n`?

&nbsp;

<img src="/assets/img/week8/response-splitting.png" style="scale: 200%" />

---

### demo

{{% /section %}}

---

## Challenges
> gl with report & support-v2 lul
