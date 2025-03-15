---
title: "1: intro"
layout: "bundle"
outputs: ["Reveal"]
---

## we'll get started at 13:05

---

{{< slide class="center" >}}
# recon & tooling
### 6[84]43 week1 

---

## good faith policy

We expect a high standard of professionalism from you at all times while you are taking any of our courses. We expect all students to act in good faith at all times

*TLDR: Don't be a jerk*

[sec.edu.au/good-faith-policy](https://sec.edu.au/good-faith-policy)

---

{{% section %}}

## > whoami

* Lachlan
* Security Engineer @ Google

---

## how to contact me

* lachlan.waugh@student.unsw.edu.au
* [@melon]() on the SecSoc Discord

---

## places for course discussion

* [course information > course discussion](https://webcms3.cse.unsw.edu.au/COMP6443/24T1/resources/96261) on webcms
* [secso.cc/discord](https://secso.cc/discord)

---

## faq
* are tuts compulsory? no
* are they recorded? maybe?
* where are these resources? [waugh.zip/6443/](https://waugh.zip/6443/)

{{% /section %}}

---

## > whoareu

{{% section %}}

![](/assets/img/week1/icebreaker.jpg)

---

* your name, degree, year?
* why'd you do the course?
* what's your favourite course so far at Uni?
* ~~your credit card number and the 3 wacky digits on the back~~

{{% /section %}}

---

{{% section %}}

## course content
* wargames (10%)
* 2 x pentesting reports (40%)
* mid-term (0%)*
* final (50%)

> \* not exactly

---

## wargames
the good stuff

* don't leave them to the last minute, you'll be sad :(
* cool to collaborate/work together, but your flags need to be different.
* extended flags aren't *required*, but you should do them anyway (they're way cooler imo)

---

## report
pentesting / vulnerability report

* groups of 3 (organised next week)
* keep track of how you got found each of the flags
* threats and remediation are really important

{{% /section %}}

---

{{% section %}}

## reconnaissance
check out [waugh.zip/6443/resources/recon](https://waugh.zip/6443/resources/recon)

---

### what is recon
these should always be your first steps

* essentially everything that isn't exploitation
    * looking at a website
    * reading the html source
    * giving an application input (e.g. stuff it doesn't expect: code, really big input, different file type)

---

### why is it important?
important to expand & understand your attack surface

* asymmetry of attack and defence
    * defenders need to defend everything
    * attackers only need a single vulnerability
* you should understand what an application does, before you try to exploit it

---

### passive recon
recon that doesn't involve interacting with the service

* googling
* osint
* documentation
* etc

---

### demo
> website.com (don't try it at home)

---

### active recon
interacting with the application

* clicking around to finding web content
* information leaked in local files (e.g. robots.txt, sitemap.xml, javascript files, html comments)

> nobody exposes information in [HTML](https://www.malwarebytes.com/blog/news/2022/02/journalist-wont-be-indicted-for-hacking-for-viewing-a-state-websites-html)...

---

### enumeration
grab a big list of words, and see if any of them resolve:
* as a *subdomain*: **WORD**.example.com
* as a *file/directory*: example.com/**WORD**
* as a *port*: example.com:**NUMBER**
* also [linpeas](https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS), [sqlmap](https://github.com/sqlmapproject/sqlmap), [metasploit](https://www.metasploit.com/)

---

### subdomain/subdirectory/port
* subdirectory: another part of the same site
    * gobuster, dirbuster, ffuf, etc
* subdomain: another service on the site
    * gobuster, dirbuster, ffuf, etc
* port: another application (probably not a webserver)
    * nmap
 
> [seclists](https://github.com/danielmiessler/SecLists) and [wordlists](https://github.com/kkrypt0nn/wordlists) can be helpful wordlists

---

### demo 

{{% /section %}}

---

{{% section %}}

### bruteforcing considerations
* very noisy
    * bruteforcing over dns vs http
    * you might be blocked
* not everything is a bruteforcing challenge
    * in a real engagement they'd get angry

---

## Bruteforcing at Uni
> if you use automated tools, pls dont use uni DNS servers, use these :)
* Google - 8.8.8.8
* Cloudflare - 1.1.1.1

{{% /section %}}

---

## Lecture content
* web things??
* hacking NASA
* stealing money i think?
* [link to the slides](https://webcms3.cse.unsw.edu.au/COMP6443/24T1/resources/96313)

---

## Demo
> BurpSuite and ProxySwitchy oh my

---

## Activities
* Form groups for the reports (3 people)
* Signing up/log into QuoccaBank
    * Installing burp suite/setting up certs?
    * Sign up to CTFD
* Try out some of the challenges!
    * Recon stuffs
    * HTTP as a service
