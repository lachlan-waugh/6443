---
title: "Week03"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 16:05

---

{{< slide class="center" >}}
# Week03
### COMP6443 H16A 

---

## Good faith policy

We expect a high standard of professionalism from you at all times while you are taking any of our courses. We expect all students to act in good faith at all times

*TLDR: Don't be a jerk*

[sec.edu.au/good-faith-policy](https://sec.edu.au/good-faith-policy)

---

{{% section %}}

## Challenges
* From now on, all challenges are worth marks.
* From next week, the challenges are more difficult!
* For full marks, you'll probably have to do all the challenges ~~(there's some nerds lol)~~

---

## Solutions?
* Idk how to solve them tbh, but maybe someone could demo? (I think only HAAS so far)
* Maybe you could get a bonus mark?

---

## What's coming up?
* weeks 4/5: server-side injection
    * SQLi, SSI, XXE, SSRF, SSTI
* weeks 7/8: client-side injection
    * XSS, JSONP, Clickjacking, CSRF

---

## Due dates
* Topic02 challenges: THIS SUNDAY 11:59pm
* Midterm: Week05 (during the lecture I assume?)
* Report: Week05 Sunday 11:59pm

{{% /section %}}

---

{{% section %}}

## Lecture content
* Authentication
* Recon
* Session management
* IDOR
* hashing vs encryption

---

## Authentication
Weak passwords

![](/img/week03/password_meme.jpg)

---

Bruteforcing passwords ([seclists](https://github.com/danielmiessler/SecLists/Passwords/) again woo): Overly verbose error messages/information disclosure bad?

![](/img/week03/password_taken_meme.jpg)

---

## Protections?
* 2FA
* Captchas
* Account lockouts
* ~~firing idiots~~ strong password policies

---

## More recon
* [robots.txt](https://www.google.com/robots.txt)
* [sitemap.xml](https://www.google.com/sitemap.xml)
* javascript files
* html comments

---

## Session management
* Cookies are great, and never insecure :)
* Some of my favourite ways to encrypt them are base64 and base58!
* Flask has it's own version of signed tokens (*similar* to JWTs)

---

## IDOR
Insecure direct object reference

![](/img/week03/idor.png)

---

## Hashing vs encryption
* ~~Hashing is just lossy encryption, change my mind~~
* What's the difference?
* When would you use them?

{{% /section %}}

---

{{% section %}}

## Defences
* JWT
* SAML (garbanzo)
* OAuth (goodbanzo)
* HSTS
* CSP
* SSO / FID
* Access control

---

## JWT
JSON Web Tokens
* We already did this I think
* Why's this even in the slides lol, it couldn't be a hint right (jk ... unless?)

---

## OAuth / SAML
Security Assertion Markup Language

---

## HSTS
HTTP Strict Transport Security
* Helps to prevent HTTPS downgrade attacks
    * Enforces the use of HTTPS.

* HSTS pre-load list [click me ;)](https://hstspreload.org/)
    * A list of domains that support HSTS.
    * Used in most modern browsers

---

## CSP
Content Security Policy

Helps mitigate XSS and injection attacks by specifying where certain resources can be loaded from
* e.g. .js files, images, .css files (??)
* e.g. only load from certain domains, only specific files, only HTTPS sites.

---

## SSO / FID
Single Sign-On / Federated Identity
* **SSO**: access multiple services (in one organisation) with the same session/without reauthenticating.

* **FID**: external authentication. Offers access to services across multiple organisations (links your identity to multiple IAMS's)

---

## Access control
* MAC - Mandatory (levels w/ central authority)
* DAC - Discretionary (levels w/ no central authority)
* RBAC - Role-based (groups)
* ABAC - Attribute-based (dynamic controls)
* RuBAC - Rule-based (structured rules/policies)

read more [here](https://www.sailpoint.com/identity-library/what-are-the-different-types-of-access-control-systems/)

{{% /section %}}

---

# DEMO

---

# Questions?

---

## Now you
* In your groups, give the challenges a shot
* If you've already solved them all (gj), maybe get started on the report.
    * if you're bored try out a ctf to practice for next week? [e.g. ringezer0](https://ringzer0ctf.com/challenges)