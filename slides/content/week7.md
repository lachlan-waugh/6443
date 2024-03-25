---
title: "7: cs injection"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 1[68]:05

---

{{< slide class="center" >}}
# ~~cross-site scripting~~ javascript injection
### 6[84]43 week7 

---

# House cleaning 
{{% section %}}

## Due Dates
* Most of the Topic04 challenges should be out
* These are due Week08 Sunday @ 11:59pm

---

## Report groups
* The second report is out
* If you need a new group for the 2nd report, msg me.
* Marks/feedback will be out at some point

{{% /section %}}

---

## Origin vs Site

### Origin
> <span style="color: #021691">https://</span><span style="color: #fffacd">www\.example\.com</span><span style="color: #7FFFD4">:80</span>

{{% fragment %}}
origin = <span style="color: #021691">scheme</span> + <span style="color: #fffacd">host</span> + <span style="color: #7FFFD4">port</span>
{{% /fragment %}}

---

## Origin vs Site
### Site
> <span style="color: #021691">http://</span><span style="color: #A52A2A">www.</span><u><span style="color: #fffacd">example</span><span style="color: #D2691E">.com</span></u><span style="color: #7FFFD4">:80</span>
> <span style="color: #021691">https://</span><span style="color: #A52A2A">api.</span><u><span style="color: #fffacd">example</span><span style="color: #D2691E">.com</span></u><span style="color: #7FFFD4">:443</span>

{{% fragment %}}
site = <span style="color: #fffacd">private_domain</span> + <span style="color: #D2691E">public_suffix</span>
* <s><span style="color: #021691">scheme</span>, <span style="color: #A52A2A">subdomain</span> and <span style="color: #7FFFD4">port</span></s>
{{% /fragment %}}

---

{{% section %}}

## SOP (Same Origin Policy)
* Blocks resource requests to/from an *external* site

* "*External*" is based on *SOP*: only requests from the same `origin` are allowed to use the resources

* more secure ~~*but how people bypassed it isn't xd*~~

> read more [here](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

---

### Cross-Origin Resource Sharing
* Obviously sometimes you need to access resources from another origin (e.g. using images, videos)

* This can be achieved if the resource owner sets certain headers on the resource ([more here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers))

> [give it a try](https://www.test-cors.org/)

---

### Can it be bypassed
* It's just a browser protection
* Doesn't prevent the request (it'll still succeed), it prevents you from accessing the response.
* Would it block you if accessed it through a script?

{{% /section %}}

---

## Client-side injection
* HTML Injection
* XSS
* CSRF

---

{{% section %}}

## HTML injection
* Browsers just render the DOM
* How would it know if tags are user-supplied or server-supplied
* what if our input was just `<s>`?

---

> Cool graphic?

---

### Know your tags
* Some are paired `<div></div>`
* Some aren't `<img src=.../>`
* what goes in here? `<script>...</script>`

{{% /section %}}

---

{{% section %}}

### XSS (Cross-site scripting)

* another 'mixing of data and control' issue
    * your browser only receives a single stream of data
    * the content of the stream determines if it's control or data
* Tricking a **browser** into executing your code

---

### Reflected XSS
* Payload is part of user input
    * e.g. a search query, cookie, header, etc 
    * anything insecurely rendered on the page

> [`www.example.com/database?q=<script>alert(1)</script>`]()

---

### Stored XSS
* Payload is stored in some database
    * Anybody who visits a certain page will view it
    * e.g. blog posts, twitter (lol)
* generally worse, but more easily detected

---

### DOM-based XSS
* Similar to the others, but the vulnerability comes from modifying the DOM

```html
<script>
const pos=document.URL.indexOf("context=")+8;
document.write(document.URL.substring(pos,document.URL.length));
</script>
```

---

### Demo!

---

### XSS isn't just `<script>` tags
```javascript
// event-handlers
<img src=x onerror=alert(1)/>
 
// injecting into javascript code
const a = '<user_input>'

// and much more
```

> it's any time you get user supplied input in a javascript context

---

### Some good resources
* [PayloadAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XSS%20Injection)
* [OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html)
* [HackTricks](https://book.hacktricks.xyz/pentesting-web/xss-cross-site-scripting)
* [PortSwigger](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)

{{% /section %}}

---

---

### Bonus: breaking mitigations
* Content stripped/blocked
    * embed dummy characters: `<SCRscriptIPT>`
    * use alternating case: `<ScRiPt>`
    * different tag `<img onerror=...>`
    * different event handler `<body onload=...>`

> [here's a couple more](https://github.com/payloadbox/xss-payload-list)

---

## CSRF
{{% section %}}

### What is it?
* Cross-site request forgery
* Trick a user into performing an unintended action
    * e.g. make them authorize a bank transaction
    * e.g. make them change their email/password
* *kinda similar to SSRF*

---

###

```
<form method="POST" >
```

---

### Demo!

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

{{% /section %}}

---
