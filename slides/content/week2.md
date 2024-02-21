---
title: "2: auth"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 1[68]:05

---

{{< slide class="center" >}}
# authorization & authentication
### 6[84]43 week2

---

## admin stuff

{{% section %}}

## challenges
* how are you finding this week's challenges?
* for each set of challenges, I'll say which I think are worthwhile. *this week: all of them lol*

---

## walkthroughs
* present your solution for some of the challenges
* only the harder ones (maybe some of files/blog) 

{{% /section %}}

---

{{% section %}}

### what to talk about
* vulnerability details
* proof of concept / steps to Reproduce
* **impact** !important
* remediation

---

### Really consider the impact
* Order the report based on how damaging the vulnerabilities are
* Don't just include things we've talked about in lectures/tuts, discuss general security issues you came across
* Good explanation of the impact `>>>>` more flags

---

### what to include
> everything™!!
* challenge solutions
* midterm solutions
* recon/haas solutions

---

## Reports
* keep it businessy & use a real vulnerability scoring system (e.g CVE), and framework (e.g NIST)
* "we recommend you keep a record of the vulnerabilities you have found. Most pen-testers will be required to write a report after a 'penetration assessment', and you will too during this semester!" - Topic 03 challenges on OL

---

## some example reports
* [an example](https://docs.google.com/document/d/1s12Off74DZ8RcELdqdeZSxJTMkbN6l4MHtolwTUrnrU/edit)
* [some more examples](https://github.com/juliocesarfort/public-pentesting-reports)

{{% /section %}}

---

## authentication vs authorization

{{% section %}}

* http/s & tls
* authentication vs authorization
* cookies
* what is jwt [jwt.io](https://jwt.io)

---

### what is auth...
* authentication: who are you?
* authorization: what are you allowed to do?

---

### cookies
* pieces of text sent by websites to your browser.
* help the website remember information about you
* a sense of **persistence**

---

### why do I care
> often used to store session data
* session tokens (e.g. Flask/Express)
* JWT (JSON Web Token)
* username=melon;password=Hunter2

---

### hacking cookies
* stealing cookies
    * cross-site scripting (XSS) [week7/8]
    * MITM attacks
    * cross-site request forgery (CSRF) [week7/8]
* forging cookies (called "baking")
* ~~accidentally~~ showing your cookies on screen during the tute (who would do that?? haha)

---

## securing cookies
* http-only (prevents XSS)
* secure (prevents MITM)
* same origin (prevents CSRF)
* expiry

---

## demo
> authentication stuffs

* plsplsplswork

---

This slide is intentionally left blank

{{% /section %}}

---

> do the demo lachlan

---

ps

"*N.B. Both sub-domain enumeration and sub-directory brute-forcing are discouraged and will not assist you in these challenges. However, you may be find it useful to enumerate IDs or passwords.*" - Topic 3 challenges page on O

---

{{% section %}}

## Presentations (woo)
* ~10 minutes in your groups exploring one of the below technologies 
* 3-5 minutes presenting it to the rest of the class :)

---

## Topics
* HTTP status codes, types, and headers
* SSL / TLS
* Cookies (and JWTs)
* Certificate transparency
* other technologies?

{{% /section %}}

---

## What is due?
* wk2 sun 23:59pm: topic1 chals (recon, haas) 
* wk3 sun 23:59pm: topic2 chals (blog, files, etc)
* wk5 wed 23:59pm: the first report

---

# Go do some challenges
