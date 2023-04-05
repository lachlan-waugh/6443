---
title: "extended08"
layout: "bundle"
outputs: ["Reveal"]
---

{{< slide class="center" >}}
# Java deserialization

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


---

{{% /section %}}