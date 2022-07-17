---
title: "Week08"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 16:05

---

{{< slide class="center" >}}
# Week08
### COMP6443 H16A 

---

## Good faith policy

We expect a high standard of professionalism from you at all times while you are taking any of our courses. We expect all students to act in good faith at all times

*TLDR: Don't be a jerk*

[sec.edu.au/good-faith-policy](https://sec.edu.au/good-faith-policy)

---

## Mitigating CSRF

---

## Mitigating XSS
{{% section %}}

---

### Bypassing mitigations

{{% /section %}}

---

## CSP

---

## Click-jacking
{{% section %}}

---

### Demo

{{% /section %}}

---

## HTTP Response Splitting
{{% section %}}
* An exploit when user-controlled input is used in a server's HTTP response header
* how does a program determine: 
    * the end of a header?
    * the end of the headers/start of the body?

---

* Headers are separated by `\r\n` (`CR\LF`)
* Body is separated with two `\r\n`'s
* What if our input included `\r\n\r\n`?

&nbsp;

<img src="../img/week08/response-splitting.png" style="scale: 150%" />

---

### Demo

{{% /section %}}

---

## Challenges
> gl with support-v2 & report lul