---
title: "5: serverside"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 1[68]:05

---

{{< slide class="center" >}}
# more server-side
### 6[84]43 week5

---

# House cleaning 
{{% section %}}

---

## Report groups
> If you aren't in a group please let me know

---

## Midterm
> How'd you all find it (trivial enough?)
{{% /section %}}

---

## Injection
* Bash Injection
* SSTI
* PHP Injection

---

{{% section %}}

## bash injection
* If you're ever using os.system() (or similar) to call shell functions containing user input
  * first of all, probably don't
  * second of all, it's kinda vulnerable

---

## [Demo](https://github.com/lachlan-waugh/6443/tree/main/demos/server-side-injection/shell_injection)

{{% /section %}}

---

{{% section %}}

### SSTI (Server-side template injection)
* Templating engines (eg. Jinja2, Pug) use templates to inject code and variables into static files

* Jinja2: `{{`\<CODE HERE\>`}}` e.g. `{{7*7}}` => `49`

* *what if we tricked the template rendering into thinking our user-supplied content was code?*

---

## [Demo](https://github.com/lachlan-waugh/6443/tree/main/demos/server-side-injection/ssti)

{{% /section %}}

---

{{% section %}}
## Basic PHP injection
* PHP is a very different language to most
* It's kinda like a html server (where the file path is the url path)
* This means if you add a new .php file somewhere, and navigate there, it'll execute

---

## [Demo](https://github.com/lachlan-waugh/6443/tree/main/demos/server-side-injection/php_webshell)

{{% /section %}}

---

{{% section %}}

### Helpful stuff
* reverse shells
* hosting content (ngrok, requestbin)

---

## reverse shells
* Sometimes you can get command injection, but it's really tedious
* wouldn't it be easier if you could just get send your commands directly via terminal?

> checkout [explainshell](https://www.explainshell.com/explain?cmd=nc+-lnvp+9999) and [revshells](https://revshells.com)

---

## [Demo](https://github.com/lachlan-waugh/6443/tree/main/demos/server-side-injection/revshell)

---

### How to host content
* `python3 -m http.server + NGROK`
* localtunnel
* `RequestBin`
* `GitHub pages` (needs to build everytime though so it's slow)

---

## Demo?

{{% /section %}}

---

## File-based vulnerabilities
* File disclosure (e.g. XXE)
* Local file inclusion (e.g. PHP)
* File uploads

---

{{% section %}}

### File disclosure
somehow include a page 
* `?page=index.html` (what about `?page=../../../etc/passwd`)
* image upload `https://a.com/catpicture.png` (what about `file:///etc/passwd`)
* error messages

---

### XML (Extended Markup Language)
* a data format kinda like json, that looks like HTML

```html
<users>
    <user id="1">
        <username>melon</username>
        <password>Hunter2</password>
    </user>
    <user id="2">
        <username>admin</username>
        <password>admin</password>
    </user>
</users>
```

---

## XXE (XML External Entities)
* DTD - Document Type Definition
* *Internal Entity*: an entity declared within the DTD (like a variable)
* *External Entity*: an entity declared outside the DTD (files, stuff on other websites)

---

### Internal entities
```html
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
```html
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

### SSI
```html
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
```html
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

{{% /section %}}

---

{{% section %}}

### Local file inclusion
PHP has this reaelly funny `include()` function 

* Think of it like importing another page
* Strangely, it can do a lot more than that

---

### Demo

{{% /section %}}

---

## Now do some challenges
> What you all came for lol
