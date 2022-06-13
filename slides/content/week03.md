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

## Due dates
* Topic02 challenges: THIS SUNDAY 11:59pm
* Midterm: Week05 during the lecture (I assume)
* Report: Week05 Wednesday 11:59pm

{{% /section %}}

---

{{% section %}}

## Lecture content
* Authentication
* Recon
* Session management
* ~~IDOR~~

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
* [robots.txt](www.google.com/robots.txt)
* [sitemap.xml](www.google.com/sitemap.xml)
* javascript files
* html comments

---

## Session management
* Cookies are great, and never insecure :)
* Some of my favourite ways to encrypt them are base64 and base58!

---

## IDOR
Insecure direct object reference

![](/img/week03/idor.png)

{{% /section %}}

---

{{% section %}}

## Defences
* JWT
* SAML (garbanzo) / OAuth (goodbanzo)
* HSTS
* CSP
* SSO / FID
* Access control

---

## JWT
* We already did this I think
* Why's this even in the slides lol, it couldn't be a hint right (jk ... unless?)

---

## OAuth / SAML


---

## HSTS

---

## CSP

---

## SSO / FID

---

## Access control


{{% /section %}}

---

# Questions?

---

## Now you
* In your groups, give the challenges a shot
* If you've already solved them all (gj), maybe get started on the report.