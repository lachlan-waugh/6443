---
title: "9: protections"
layout: "bundle"
outputs: ["Reveal"]
---

{{< slide class="center" >}}
## client-side mitigations
### 6443 week9

---

### pre-amble: reports
* slides are up on webcms
* demos are at [github.com/lachlan-waugh/6443](https://github.com/lachlan-waugh/6443)
    * go into demos/lectures and theres setup instructiong

---

{{% section %}}

### Origin
> <span style="color: #021691">https://</span><span style="color: #fffacd">www\.example\.com</span><span style="color: #7FFFD4">:80</span>

origin = <span style="color: #021691">scheme</span> + <span style="color: #fffacd">host</span> + <span style="color: #7FFFD4">port</span>

---

### Site
> <span style="color: #021691">http://</span><span style="color: #A52A2A">www.</span><u><span style="color: #fffacd">example</span><span style="color: #D2691E">.com</span></u><span style="color: #7FFFD4">:80</span><br>
> <span style="color: #021691">https://</span><span style="color: #A52A2A">api.</span><u><span style="color: #fffacd">example</span><span style="color: #D2691E">.com</span></u><span style="color: #7FFFD4">:443</span>

site = <span style="color: #fffacd">private_domain</span> + <span style="color: #D2691E">public_suffix</span>
* <s><span style="color: #021691">scheme</span>, <span style="color: #A52A2A">subdomain</span> and <span style="color: #7FFFD4">port</span></s>

{{% /section %}}

---

{{% section %}}

## SOP (Same Origin Policy)
* blocks resource requests to/from an *external* site

* "*external*" is based on *sop*: only requests from the same `origin` are allowed to use the resources

* more secure ~~*but how people bypassed it isn't xd*~~

---

### cross-origin resource sharing
* obviously sometimes you need to access resources from another origin (e.g. using images, videos)

* this can be achieved if the resource owner sets certain headers on the resource ([more here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers))

---

### can it be bypassed
* it's just a browser protection
* doesn't prevent the request (it'll still succeed), it prevents you from accessing the response.
* would it block you if accessed it through a script?

{{% /section %}}

---

{{% section %}}

## mitigating xss
basic waf stuff

### sanitisation
stripping out unsafe tags/attributes

> &lt;script&gt;alert(1)&lt;script&gt; &rarr; alert(1)

---

### encoding
escaping control characters

> \<\> &rarr; \&lt;\&gt;

---

### validation
allow/block-listing of content

> block requests if you detect bad content

---

### don't use raw user input
* `.innerHTML` treats content as HTML (control)
    * use `.innerText` which treats it as data

* sanitize your input with a library (DOMPurify???)

* don't write vanilla JS, use a framework.
    * again, even if you use a framework, make sure the functions you're using sanitize the input

> [N.B.](https://www.w3.org/TR/2008/WD-html5-20080610/dom.html#innerhtml0)

---

### breaking mitigations
this relies on poorly implemented mitigations

* content stripped/blocked
    * embed dummy characters: `<SCRscriptIPT>`
    * use alternating case: `<ScRiPt>`
    * different tag `<img onerror=...>`
    * different event handler `<body onload=...>`

[here's a couple more](https://github.com/payloadbox/xss-payload-list)

---

### demo
* [waf](http://waf.demos)

---

### X-XSS-Protection
* no, it's [terrible](https://news.ycombinator.com/item?id=20472947)
    * 'First, XSS 'protection' is about to not be implemented by most browsers...'

> 'Worse, the XSS 'protection' can be used to create security flaws...' [example](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection#vulnerabilities_caused_by_xss_filtering)

---

### an example
`?q=<script>var productionMode = true</script>`

```html
<script>
  var productionMode = true;
</script>
<!-- [...] -->
<script>
  if (!window.productionMode) {
    // Some vulnerable debug code
  }
</script>
```

&nbsp;

the browser thinks that code is reflected of user input

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

---

### demo
* [bank_v0](http://bank_v0.demos)
* [bank](http://bank.demos)
* [csrf](http://csrf.demos)

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
* powerful & hard to bypass (if devs were smart)

> read more [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)

---

### how is it defined
policy directives made of directive and value

e.g. `script-src: unsafe-inline`

* `script-src` is the `directive`
* `unsafe-inline` is the `value`
* the whole thing is the policy directive

---

### what directives are there
basically everything

* script-src
* frame-src
* img-src
* object-src
* default-src

---

### what values are there

* *none*: blocks all loading
* *self*: only from the current origin
* *hash-X*: only things where their value hashes to X 
* *nonce-X*: only things with nonce=X as an attribute 
* *strict-dynamic*: (with hash/nonce) anything they load/create is also trusted
* *unsafe-inline*: e.g. \<script\>alert(1)\</script\>
* *unsafe-eval*: e.g. eval(), setTimeout()

---

### where is it defined
http header
> `Content-Security-Policy: <policy directive>`

&nbsp;

or in a tag
> `<meta http-equiv="Content-Security-Policy" content="<policy directive>">`

{{% /section %}}

---

{{% section %}}

### bypassing CSP
ok lachlan but idc about protections I care about exploitation

> ok

---

### how might you think to exploit it
* maybe some kind of browser zeroday
* hack...

> nah just bad programming (again)

---

### techniques
* clrf injection/response splitting
* dom clobbering (meta tag)

{{% /section %}}

---

{{% section %}}

### dom clobbering
* discussed in more detail in the week8 extended lecture (if you're curious)
* what if we can trick the browser into thinking our `<meta>` tag is the real source for csp
* we could then set our own csp

---

### demo
> [meta](http://meta.demos)

{{% /section %}}

---

{{% section %}}

### http response splitting
aka carriage-return line-feed injection

* http headers are considered "control"
* what if user-controlled input was used in a response header?
* what could you do?

---

### question
* how does a program determine: 
    * the end of a header?
    * the end of the headers/start of the body?

---

### answer
* headers are separated by `\r\n` (`CR\LF`)
* body is separated with two `\r\n`'s
* what if our input included `\r\n\r\n`?

&nbsp;

<img src="/assets/img/week8/response-splitting.png" style="scale: 200%" />

---

### demo
> [headers](http://headers.demos)

{{% /section %}}

---

{{% section %}}

### 'self'
* "The self keyword in a Content-Security-Policy header directive, ... is an **alias for the same origin**."

> from [https://content-security-policy.com/self/](https://content-security-policy.com/self/)

> pretty simple

---

### techniques 
* uploading files
* writing to local files/jsonp

{{% /section %}}

---

{{% section %}}

### writing to local files

quick demo: [filewriter](http://filewriter.demos)

---

### an aside: CORS
* sop was implemented in 1995
* cors was implemented in 2006
* what did people do before CORS was available?

---

### jsonp
json with padding
    
* you can't load a resource from another domain
* but you can load a script
* so, return a script which loads the content? :brain:

---

### how does it work
you give the jsonp endpoint a callback function

* how do you load the content? you run a function which takes the data as an argument.
* since we're loading the data, we define what function is being used to load it.

> if you're confused read up about [callback functions](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

---

### jsonp example
define the function using a `callback` parameter
```html
<!-- https://melon.com/numbers?callback=load_data -->
load_data([1, 2, 3, 4, 5])
```

&nbsp;

the script below will invoke `load_data([...])` with the json
```html
<script src="https://melon.com/numbers?callback=load_data"></script>
```

---

### demo
* [jokelist](http://jokelist.demos) 
* [bestjoke](http://bestjoke.demos) 
* [jokes](http://jokes.demos) 

{{% /section %}}

---

{{% section %}}

### file uploads

---

### demo
[upload](http://upload.demos)

{{% /section %}}

---

{{% section %}}

### nonce
resources will only be trusted if they have an attribute nonce="nonce-X" where X is specified in the CSP header

> read more [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_inline_script)

---

### how could we bypass this
* similar to csrf tokens

* if they reuse tokens
* if the tokens are deterministic
* ... but what if the tokens are secure?

---

### `<base>d tag`
specifies the base URL and/or target for all relative URLs in a document.

> read more [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base)

---

### demo
* [based](https://based.demos)

---

### how to resolve this
* use csp better
* there's a `base-uri` directive in CSP, specifying which locations can be specified to be the base

{{% /section %}}

---

{{% section %}}

### strict-dynamic
what is it?

* "the trust given to a script present in the markup, by a nonce or a hash, shall be propagated to all scripts loaded by that root script."

> from [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#strict-dynamic)

---

### how could we bypass it?
* what if we could force something that's validated with a hash/nonce, to create a script for us?
* or even just execute code for us (as it's validated, it can do that)

{{% /section %}}

---

{{% section %}}

### script gadgets
* pieces of code within an application that can triggered to perform some task
* they're legitimate pieces of javascript code, that can transform HTML injection into (js) code execution.
* note: these aren't functions

---

### how do html attributes work?
* some are directly built into the browser (e.g. uploading files)
* some are loaded in/defined by external libraries

---

### demo
* [gadgets](http://gadgets.demos)

---

### remediations
* Don't allow HTML injection
* These aren't always "vulnerabilities"

{{% /section %}}
