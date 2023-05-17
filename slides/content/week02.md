---
title: "02: identity"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 18:05

---

{{< slide class="center" >}}
# Week02
### COMP6443 H18A

---

## admin stuff

{{% section %}}

## Presentations
* Bonus marks!
* Talk about something cool (security related), you've seen in the last week
* Around 10 minutes

---

## Challenges
* How are you finding this week's challenges?
* For each set of challenges, I'll say which I think are worthwhile. *This week: all of them lol*

---

## Walkthroughs
* Present your solution for some of the challenges
* Only the harder ones (maybe some of files/blog) 

---

## Reports
* Keep it businessy & use a real vulnerability scoring system (e.g CVE), and framework (e.g NIST)
* "We recommend you keep a record of the vulnerabilities you have found. Most pen-testers will be required to write a report after a 'penetration assessment', and you will too during this semester!" - Topic 03 challenges on OL

---

## Some example reports
* [an example](https://docs.google.com/document/d/1s12Off74DZ8RcELdqdeZSxJTMkbN6l4MHtolwTUrnrU/edit)
* [some more examples](https://github.com/juliocesarfort/public-pentesting-reports)

{{% /section %}}

---

## lecture content

{{% section %}}

* http/s & tls
* authentication
    * what is cookie?
    * what is jwt [jwt.io](https://jwt.io)
* authentication vs authorization

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

## A note on enumeration
{{% section %}}

* rate limit (or we'll do it for you)
> 429/429/429/429
* check out [lwaugh.io/6443/resources/recon](/6443/resources/recon)

---

> do the demo lachlan

---

## More recon
* [robots.txt](https://www.google.com/robots.txt)
* [sitemap.xml](https://www.google.com/sitemap.xml)
* javascript files
* html comments
* wappalyzer

---

ps

"*N.B. Both sub-domain enumeration and sub-directory brute-forcing are discouraged and will not assist you in these challenges. However, you may be find it useful to enumerate IDs or passwords.*" - Topic 3 challenges page on OL

{{% /section %}}

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

# Go do some challenges

---

## What is due?
* Wk03 Sun 23:59pm: topic2 chals (blog, files, etc)
* Wk05 Wed 23:59pm: the first report
