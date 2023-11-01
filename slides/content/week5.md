---
title: "05: serverside"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 18:05

---

{{< slide class="center" >}}
# Week05
### COMP6443 H18A 

---

# House cleaning 
{{% section %}}

## Report groups
> If you aren't in a group please let me know

---

## Midterm
> How'd you all find it (trivial enough?)
{{% /section %}}

---

# Lecture content
* XXE
* SSRF
* SSTI (did they go through this? idk)
* Shell injection, RCE and Reverse Shells

---

## XXE
{{% section %}}
### XML External Entities
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

### LFI / SSI
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY flag SYSTEM "file:///flag.txt" >
]>
<diary>
  <entry>&flag;</entry>
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
* `GitHub pages` (needs to build everytime though so it's slow)

{{% /section %}}

---

## SSRF
{{% section %}}

### Server-side request forgery
* Trick a server into doing stuff it doesn't intend to
* Consider `HAAS`, we can't access `KB`, but `HAAS` could, and we can send requests through `HAAS`
* What if we could access other internal services through `HAAS`, which aren't expecting it

---

### Exploitation
* Internal services might (often will) be less secure than externally facing ones
* What can we do?
  * Retrieve/disclose information (ssi/lfi)
  * Remote code execution / Reverse shells?
  * Other bad stuff

---

## [Demo](https://github.com/lachlan-waugh/6443/tree/main/demos/server-side-injection/ssrf)

---

### Remediation
* Don't assume local/internal services will be safe
* Monitor internal requests, block any suspicious activity
  * e.g. very long execution time could be someone fetchng information from a database
* A whitelist of IPs that can access internal services
* A *good* WAF

{{% /section %}}

---
## SSTI
{{% section %}}
### Server-side template injection
* Templating engines (eg. Jinja2, Pug) use templates to inject code and variables into static files

* Jinja2: `{{`\<CODE HERE\>`}}` e.g. `{{7*7}}` => `49`

* *what if we tricked the template rendering into thinking our user-supplied content was code?*

---

## [Demo](https://github.com/lachlan-waugh/6443/tree/main/demos/server-side-injection/ssti)

---

{{% /section %}}

---

## Basic PHP injection
{{% section %}}
* PHP is the worst language in the world
* Kris kinda went through in the tute, thought I'd just show what you could get with it though

---

## [Demo](https://github.com/lachlan-waugh/6443/tree/main/demos/server-side-injection/php_webshell)

{{% /section %}}

---

{{% section %}}

## bash injection
* If you're ever using os.system() (or similar) to call shell functions containing user input
  * first of all, probably don't
  * second of all, it's kinda vulnerable

---

## [Demo](https://github.com/lachlan-waugh/6443/tree/main/demos/server-side-injection/shell_injection)

---

## reverse shells
* Sometimes you can get command injection, but it's really tedious
* wouldn't it be easier if you could just get send your commands directly via terminal?

> checkout [explainshell](https://www.explainshell.com/explain?cmd=nc+-lnvp+9999) and [revshells](https://revshells.com)

---

## [Demo](https://github.com/lachlan-waugh/6443/tree/main/demos/server-side-injection/revshell)

---

{{% /section %}}


---

# Presentations
* ten minute presentation on something cool security related from the last week?
* for bonus marks??

---

## Now do some challenges
> What you all came for lol