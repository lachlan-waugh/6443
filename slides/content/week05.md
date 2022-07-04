---
title: "Week05"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 16:05

---

{{< slide class="center" >}}
# Week05
### COMP6443 H16A 

---

## Good faith policy

We expect a high standard of professionalism from you at all times while you are taking any of our courses. We expect all students to act in good faith at all times

*TLDR: Don't be a jerk*

[sec.edu.au/good-faith-policy](https://sec.edu.au/good-faith-policy)

---

# House cleaning 
{{% section %}}

## Due Dates
> *Report and week5 challenges are now due Week07 Wednesday*

---

## Report groups
> If you aren't in a group please let me know

---

## Midterm
> How'd you all find it (trivial enough?)
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

# Presentations
{{% section %}}
## anybody? 
ten minute presentation on something cool security related from the last week?
for bonus marks??

---

## SOLUTIONS?
anybody want to present the solutions for blog / files?

{{% /section %}}

---

### A refresher on SQLi
> a demo

---

# Lecture content
* XXE
* SSRF
* SSTI (did they go through this? idk)

---

## XXE
{{% section %}}
* DTD - Document Type Definition
* Internal Entity: an entity declared within the DTD (like a variable)
* External Entity: an entity declared outside the DTD (files, stuff on other websites)

---

### Internal entities
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY string "hey, don't read my diary" >
]>
<diary>
  <entry>&string;</entry>
</diary>
```

&nbsp;

prints
```text
hey, don't read my diary
```

---

### External entities
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY funCatFact "https://FunCatFact.com/generate" >
]>
<diary>
  <entry>&funCatFact;</entry>
</diary>
```

&nbsp;

prints
```text
Cats are asleep for 70% of their lives.
```

---

### LFI/SSI
Local file inclusion/server-side include
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY funCatFact SYSTEM "file:///flag.txt" >
]>
<diary>
  <entry>&funCatFact;</entry>
</diary>
```

&nbsp;

prints
```text
COMP6443{....}
```

---

### Parameterised entities
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY % difficulty "trivial" >
  <!ENTITY % meme "web apps is %difficulty;" >
]>
<diary>
  <entry>%meme;</entry>
</diary>
```

&nbsp;

prints
```text
web apps is trivial
```

---

### How to host content
* `python3 -m http.server + NGROK`
* `RequestBin`

{{% /section %}}

---

## SSRF
{{% section %}}

### Server-side request forgery
* Trick a server into doing stuff it doesn't intend to
* Consider `HAAS`, we weren't able to access `KB`, but `HAAS` could, and we can send requests through `HAAS`
* What if we could access other internal services through `HAAS`, which aren't expecting it

---

### Exploitation
* Internal services might (often will) be less secure than externally facing ones
* What can we do?
  * Retrieve/disclose information (ssi/lfi)
  * Remote code execution / Reverse shells?
  * Other bad stuff

---

### Remediation
* Don't assume local/internal services will be safe
* Don't allow arbitrary execution times: returning a database would take a lot longer than an image
* A whitelist of IPs that can access internal services
* A *good* WAF

{{% /section %}}

---

{{% section %}}
# Demos!!1!

## SSTI demo

---

## Basic PHP injection
> if I have time lol (I didn't rip docker :sadreact:)
{{% /section %}}

---

## Now do some challenges
> What you all came for lol