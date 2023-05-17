---
title: "03: iam 2"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 18:05

---

{{< slide class="center" >}}
# Week03
### COMP6443 H18A 

---

{{% section %}}

## Challenges
* From now on, all challenges are worth marks.
* From next week, the challenges are more difficult!
* We'll say which challenges are required

---

## Solutions?
* Idk how to solve them tbh, but maybe someone could demo? (I think only HAAS so far)
* Maybe you could get a bonus mark?

---

## What's coming up?
* weeks 4/5: server-side injection
    * SQLi, SSI, XXE, SSRF, SSTI, file uploads
* weeks 7/8: client-side injection
    * XSS, JSONP, Clickjacking, CSRF

---

## Due dates
* Topic02 challenges: THIS SUNDAY 11:59pm
* Midterm: Week05 (during the lecture I assume?)
* Report: Week05 Sunday 11:59pm

{{% /section %}}

---

## Reports
{{% section %}}

### What to include
* Vulnerability Details
* Proof of Concept / Steps to Reproduce
* **Impact** !important
* Remediation

---

### Really consider the impact
* Order the report based on how damaging the vulnerabilities are
* Don't just include things we've talked about in lectures/tuts, discuss general security issues you came across
* Good explanation of the impact `>>>>` more flags

---

### What to include
> Everything™!!
* Challenge solutions
* Midterm solutions
* Recon/HAAS solutions

{{% /section %}}

---

{{% section %}}

## Lecture content
* Authentication
* Session management
* IDOR
* HTTP Response codes
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

## Session management
* Cookies are great, and never insecure :)
* Some of my favourite ways to encrypt them are base64 and base58!
* Most web frameworks have their own version of session tokens (e.g. Flask, Express)

---

## Issues with sessions
* Deterministic tokens
* Tokens that don't expire
* Modifiable tokens
* Can lead to session fixation/hijacking

---

## IDOR
> Insecure Direct Object Reference

![](/img/week03/idor.png)

---

## Hashing vs encryption
* ~~Hashing is just lossy encryption, change my mind~~
* What's the difference?
* When would you use them?

---

## HTTP Response codes
* 1XX - hold on
* 2XX - here you go
* 3XX - go away
* 4XX - you messed up
* 5XX - I messed up

> [https://http.cat/]()

{{% /section %}}

---

{{% section %}}

## Defences
* JWT
* SAML (garbanzo)
* OAuth (goodbanzo) / OICD
* HSTS
* CSP
* SSO / FID
* Access control

---

## JWT
JSON Web Tokens
* not very good as session tokens [read more](https://developer.okta.com/blog/2017/08/17/why-jwts-suck-as-session-tokens)
* We already did this I think, why's this even in the slides lol, it couldn't be a hint right (jk ... unless?)

---

## OAuth / SAML
Security Assertion Markup Language
* SAML is bad, its a markup language sent over POST
* OAuth is nicer, it uses JWTs which are much more lightweight (can be sent as headers)

---

## HSTS
HTTP Strict Transport Security
* Enforces the use of HTTPS.
    * Helps to prevent HTTPS downgrade attacks

* HSTS pre-load list [here](https://hstspreload.org/)
    * A list of domains that support HSTS.
    * Used in most modern browsers

---

## CSP
Content Security Policy

Helps mitigate XSS and injection attacks by specifying which locations resources can be loaded from
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

{{% section %}}
# Demo

> automating requests in python

---

## how 2 script
* python + requests
* javascript + fetch
* bash + curl
* ~~carrier pigeon~~

{{% /section %}}

---

# Questions?

---

## Now you
* In your groups, give the challenges a shot
* If you've already solved them all (gj), maybe get started on the report.
    * if you're bored try out a ctf to practice for next week? e.g. [ringezer0](https://ringzer0ctf.com/challenges), [owasp juice shop](https://owasp.org/www-project-juice-shop/), 