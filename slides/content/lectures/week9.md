---
title: "9: protections"
layout: "bundle"
outputs: ["Reveal"]
---

{{< slide class="center" >}}
## JSONP
### 6443 week9

---

* CSP
* CSP bypasses
    * JSONP
    * base tag
    * script gadgets

---

## Origin vs Site

{{% section %}}
### Origin
> <span style="color: #021691">https://</span><span style="color: #fffacd">www\.example\.com</span><span style="color: #7FFFD4">:80</span>

origin = <span style="color: #021691">scheme</span> + <span style="color: #fffacd">host</span> + <span style="color: #7FFFD4">port</span>

---

### Site
> <span style="color: #021691">http://</span><span style="color: #A52A2A">www.</span><u><span style="color: #fffacd">example</span><span style="color: #D2691E">.com</span></u><span style="color: #7FFFD4">:80</span>
> <span style="color: #021691">https://</span><span style="color: #A52A2A">api.</span><u><span style="color: #fffacd">example</span><span style="color: #D2691E">.com</span></u><span style="color: #7FFFD4">:443</span>

site = <span style="color: #fffacd">private_domain</span> + <span style="color: #D2691E">public_suffix</span>
* <s><span style="color: #021691">scheme</span>, <span style="color: #A52A2A">subdomain</span> and <span style="color: #7FFFD4">port</span></s>
{{% /section %}}

---

{{% section %}}

## SOP (Same Origin Policy)
* Blocks resource requests to/from an *external* site

* "*External*" is based on *SOP*: only requests from the same `origin` are allowed to use the resources

* more secure ~~*but how people bypassed it isn't xd*~~

---

### Cross-Origin Resource Sharing
* Obviously sometimes you need to access resources from another origin (e.g. using images, videos)

* This can be achieved if the resource owner sets certain headers on the resource ([more here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers))

---

### Can it be bypassed
* It's just a browser protection
* Doesn't prevent the request (it'll still succeed), it prevents you from accessing the response.
* Would it block you if accessed it through a script?

{{% /section %}}

---

{{% section %}}

### JSONP
* What did people do before CORS was available?

* JSON with Padding
    * You can't load a resource from another domain (but you can load a script).

    * So, return a script which loads the content? :brain:

---

### How 2 JSONP
* How do you load the content? You run a function which takes the data as an argument.

* Since we're loading the data, we define what function is being used to load it.

---

### JSONP Example
* Define the function using a `callback` parameter
```html
<!-- https://melon.com/numbers?callback=load_data -->
load_data([1, 2, 3, 4, 5])
```

&nbsp;

* The script below will invoke `load_data([...])`
```html
<script src="https://melon.com/numbers?callback=load_data"></script>
```

---

### JSONP Demo

{{% /section %}}

---

> slides are available [https://waugh.zip/6443/extended08/](https://waugh.zip/6443/extended08/)

---

# Bypassing CSP

---

### Self

{{% section %}}
### What is 'self'?
* ~~who am I?, why am I here?~~
* can things only be loaded from localhost?

---

### Let's consult the experts
* "The self keyword in a Content-Security-Policy header directive, ... is an **alias for the same origin**."

> from [https://content-security-policy.com/self/](https://content-security-policy.com/self/)

---

### `<base>d tag`
> specifies the base URL and/or target for all relative URLs in a document.

---

### Demo

---

### How to resolve this
* CSP again lmao
* there's a `base-uri` directive in CSP, specifying which locations can be specified to be the base

---

### Other ways to bypass
* file uploads: what if you can upload a `.js` file and have it served at a static location?
* writing your content to a locally served `.js` file

{{% /section %}}

---

### Strict-dynamic
{{% section %}}

### What is it?
* "The trust given to a script present in the markup, by a nonce or a hash, shall be propagated to all scripts loaded by that root script."

> from [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#strict-dynamic)

---

### How could we bypass it?
* What if we could force something that's validated with a hash/nonce, to create a script for us?
* Or even just execute code for us (as it's validated, it can do that)

---

### Gadgets
* Pieces of code within an application that can triggered to perform some task
* They're legitimate pieces of javascript code, that can transform HTML injection into (js) code execution.
* Note: these aren't functions

---

### How do html attributes work?
* Some are directly built into the browser (e.g. uploading files)
* Some are loaded in/defined by external libraries

---

### Demo

---

### Remediations
* Don't allow HTML injection lmao
* These aren't always "vulnerabilities"

{{% /section %}}

---

### Prototype pollution
{{% section %}}

### Javascript, ew
* Javascript is a very "flexible" language
* It's interpreted, things can change at runtime
* Objects in JS follow a prototype-style

---

### Inheritance in Java vs JS
* Java
    * Compiled
    * Relations are strictly defined at compile-time
* Java
    * Interpreted
    * Relationships can change as the 
    * Changes will be fed back into the interpreter

---

## Demo???

{{% /section %}}
