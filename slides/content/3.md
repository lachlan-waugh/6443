---
title: "3: iam groot"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 1[68]:05

---

{{< slide class="center" >}}
# identity and access management
### 6[84]43 week3

---

{{% section %}}

## Challenges
* From now on, all challenges are worth marks.
* From next week, the challenges are more difficult!
* We'll say which challenges are required

---

## What's coming up?
* wk4+5: server-side injection
    * SQLi, SSI, XXE, SSRF, SSTI, file uploads
* wk7+8: client-side injection
    * XSS, JSONP, Clickjacking, CSRF

---

## due dates
* topic2 challenges: THIS SUNDAY 11:59pm
* midterm: week5 monday
* report: week5 sunday 11:59pm

{{% /section %}}

---

{{% section %}}

## reports
any questions

---

### suggestions

{{% /section %}}

---

{{% section %}}

## identity

---

### SSO / FID
single sign-On / federated identity
* **SSO**: access multiple services (in one organisation) with the same session/without reauthenticating.

* **FID**: external authentication. Offers access to services across multiple organisations (links your identity to multiple IAMS's)

> e.g. google

---

### OAuth

---

### Access control
* MAC - Mandatory (levels w/ central authority)
* DAC - Discretionary (levels w/ no central authority)
* RBAC - Role-based (groups)
* ABAC - Attribute-based (dynamic controls)
* RuBAC - Rule-based (structured rules/policies)

read more [here](https://www.sailpoint.com/identity-library/what-are-the-different-types-of-access-control-systems/)

---

{{% /section %}}

---

{{% section %}}

### Authentication
weak passwords

![](/assets/img/week3/password_meme.jpg)

---

bruteforcing passwords ([seclists](https://github.com/danielmiessler/SecLists/Passwords/) again woo): Overly verbose error messages/information disclosure bad?

![](/assets/img/week3/password_taken_meme.jpg)

---

### Protections?
* 2FA
* captchas
* account lockouts
* ~~firing idiots~~ strong password policies

---

## session management
* cookies are great, and never insecure :)
* some of my favourite ways to encrypt them are base64 and base58!
* most web frameworks have their own version of session tokens (e.g. Flask, Express)

---

## Issues with sessions
* deterministic tokens
* tokens that don't expire
* modifiable tokens
* can lead to session fixation/hijacking

---

## Hashing vs encryption
* ~~hashing is just lossy encryption, change my mind~~
* what's the difference?
* when would you use them?

{{% /section %}}

---

{{% section %}}

###  secrets

### locally stored
* in plain text?
* via command line
* via environment variables (.env)

---

### externally stored
pulling secrets from an external service

* HashiCorp Vault
* AWS Secrets Manager
* Google Secret Manager

> much easier fine-grained access

---

{{% /section %}}

---

{{% section %}}

## Other stuff
* JWT
* SAML (garbanzo)
* HSTS
* CSP

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

{{% /section %}}

---

# Questions?

---

## Now you
* In your groups, give the challenges a shot
* If you've already solved them all (gj), maybe get started on the report.
    * if you're bored try out a ctf to practice for next week? e.g. [ringezer0](https://ringzer0ctf.com/challenges), [owasp juice shop](https://owasp.org/www-project-juice-shop/), 
