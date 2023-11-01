---
title: "08: clientside"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 18:05

---

{{< slide class="center" >}}
# Week08
### COMP6443 H18A 

---

# House cleaning 
{{% section %}}

## Due Dates
* All of the topic04 challenges are out
* They're due Sunday Week08.

---

## Reports (general feedback)
* Consider context when determining impact, not everything is critical.
* Keep technical stuff out of impact/remediation. It should mostly be in steps to reproduce.

{{% /section %}}

---

## Mitigating CSRF

{{% section %}}
### CSRF Tokens

Supply a single-use 'nonce' value.

* When the page is loaded, generate the nonce
* When a request is made, it must include the nonce
* It'll be stored as a: cookie, header, `<input>`

---

### CSRF Mitigations
* CSRF Tokens, a nonce value supplied as input
* Randomly generated when the page is loaded
    * stored as a cookie, header, `<input>`
* When a request is made, backend verifies the nonce

---

## Quick demo

---

### Breaking mitigations

* Bad programming, they might be doing it wrong
    * Re-use a previous token (if it doesn't expire)
    * Create your own?
    * They might not even check it.

{{% /section %}}

---

## Mitigating XSS
{{% section %}}
### Basic WAF stuff
* *Sanitisation*: stripping out unsafe tags/attributes
    * &lt;script&gt;alert(1)&lt;script&gt; &rarr; alert(1)  
* *Encoding*: escaping control characters
    * <> &rarr; \&lt;\&gt;
* *Validation*: allow/block-listing of content
    * block requests if you detect bad content

---

### Don't use raw user input
* `.innerHTML` treats content as HTML (control)
    * use `.innerText` which treats it as data

* sanitize your input with a library (DOMPurify???)

* don't write vanilla JS, use a framework.
    * again, even if you use a framework, make sure the functions you're using sanitize the input

---

### Breaking mitigations
* Content stripped/blocked
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

## CSP
{{% section %}}
* Limits where you can load content from, e.g.
    * only scripts from local scripts
    * only images from `example.com/path`

* only elements with a certain nonce value

* generally blocks iframes, inline scripts, `eval()`

* basically it's kinda smurfing, it's hard to bypass

---

### Where is it defined
* HTTP header
    * `Content-Security-Policy: ???-src <directive>`

* Or in a tag
    * `<meta http-equiv="Content-Security-Policy" content="???-src <directive>">`
    * though not as powerful

---

### How to break it?
* Corrupting the HTTP header (response splitting?)
* Overwriting the `<meta>` tag?

{{% /section %}}

---

## HTTP Response Splitting
{{% section %}}
* An exploit when user-controlled input is used in a server's HTTP response header
* how does a program determine: 
    * the end of a header?
    * the end of the headers/start of the body?

---

* Headers are separated by `\r\n` (`CR\LF`)
* Body is separated with two `\r\n`'s
* What if our input included `\r\n\r\n`?

&nbsp;

<img src="../img/week08/response-splitting.png" style="scale: 200%" />

---

### Demo

{{% /section %}}

---

## Click-jacking
{{% section %}}
* A fake form sitting under a real form

* if you try to interact with the fake form, you'll accidentally interact with the real one. 

* This could be either local, or external
    * local: same form switch confirm/cancel buttons
    * external: an invisible iframe with a higher z-index

---

### Demo

---

### Defense
* CSP frame-src / X-Frame-Options
* SameSite cookies
* Framebusters (~JS magic~)

{{% /section %}}

---

## Challenges
> gl with report & support-v2 lul
