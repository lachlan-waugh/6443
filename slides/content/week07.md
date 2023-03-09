---
title: "week07: clientside"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 18:05

---

{{< slide class="center" >}}
# Week07
### COMP6443 H18A 

---

## Good faith policy

We expect a high standard of professionalism from you at all times while you are taking any of our courses. We expect all students to act in good faith at all times

*TLDR: Don't be a jerk*

[sec.edu.au/good-faith-policy](https://sec.edu.au/good-faith-policy)

---

# House cleaning 
{{% section %}}

## Due Dates
* Some of the Topic04 challenges should be out
* These are due Week08 Sunday @ 11:59pm

---

## Report groups
* The second report is out
* If you need a new group for the 2nd report, msg me.
* Feedback and marks will come out at some point (a point after I'm given them)

{{% /section %}}

---

## Presentations
{{% section %}}

### please 
ten minute presentation on something cool security related from the last week?
for bonus marks??

---

### Solutions?
anybody want to present the solutions for BigApp/Signin/~~GCC/Feedifier/Letters~~?

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

## Cross Origin Policy
{{% section %}}
* Blocks resource requests to/from an *external* site
* "*External*" is based on a *Same Origin Policy*:
    * Only requests from the same `origin` are allowed to use the resources
    * Unless they have the correct headers ([more here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers))

> [give it a try](https://www.test-cors.org/)

---

### Hmm
* It's just a browser protection
* Doesn't prevent the request (it'll still succeed), it prevents you from accessing the response.
* Would it block you if used python? (no)

{{% /section %}}

---

### Cookies (SameSite)
* *None*: {{% fragment %}}Cookies are always sent{{% /fragment %}}
* *Lax*: {{% fragment %}} (default) not sent cross-site{{% /fragment %}}
    * images/iframes {{% fragment %}}*`no`*{{% /fragment %}}
    * navigation (GET)    {{% fragment %}}*`yes`*{{% /fragment %}}
* *Strict*: {{% fragment %}}Cookies aren't sent{{% /fragment %}}

> read more [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

---

## Client-side injection
* CSRF
* HTML Injection
* XSS

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

### Demo!

---

### Mitigations
* CSRF Tokens, a nonce value supplied as input
* Randomly generated when the page is loaded
    * stored as a cookie, header, `<input>`
* When a request is made, backend verifies the nonce

{{% /section %}}

---

## HTML injection
{{% section %}}
### HTML injection
* Browsers just render the DOM
* How would it know if tags are user-supplied or server-supplied
* what if our input was just `<s>`?

---

### Know your tags
* Some are paired `<div></div>`
* Some aren't `<img src=.../>`
* what goes in here? `<script>...</script>`

{{% /section %}}

---

## XSS
{{% section %}}
### Cross-site scripting
* another 'mixing of data and control' issue
* Tricking a **browser** into executing your code
    * javascript, php, py-script?
    * we'll just be looking at javascript lol

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

### Note
* HTML Injection isn't just from `<script>` tags
* event-handlers
    * `<img src=x onerror=alert(1)/>`
* js code:
    * `const a = '<user_input>'`

{{% /section %}}

---

# Challenges