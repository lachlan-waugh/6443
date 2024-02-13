---
title: "1: intro"
layout: "bundle"
outputs: ["Reveal"]
---

## we'll get started at 1[68]:05

---

{{< slide class="center" >}}
# week1
### COMP6443 H1[68]A 

---

## good faith policy

We expect a high standard of professionalism from you at all times while you are taking any of our courses. We expect all students to act in good faith at all times

*TLDR: Don't be a jerk*

[sec.edu.au/good-faith-policy](https://sec.edu.au/good-faith-policy)

---

{{% section %}}

## > whoami

* Hey I'm Jesse :wave:

---

## how to contact me

* lachlan.waugh@student.unsw.edu.au
* [@melon]() on the SecSoc Discord
* [@melon]() on the SecEdu Slack (kinda dead)
* [Club Penguin]() on League

---

## places for course discussion

* check out [course information > course discussion](https://webcms3.cse.unsw.edu.au/COMP6443/24T1/resources/96261) on webcms
* [secso.cc/discord](https://secso.cc/discord)
* [seceduau.slack.com/signup](https://seceduau.slack.com/signup) > #cs6443 (kinda dead)

{{% /section %}}

---

## > whoareu

{{% section %}}

![](../img/week01/icebreaker.jpg)

---

* your name, degree, year?
* why'd you do the course?
* what's your favourite course so far at Uni?
* ~~your credit card number and the 3 wacky digits on the back~~

{{% /section %}}

---

## faq
* are tuts compulsory? no
* are they recorded? maybe?
* where are these resources? [waugh.zip/6443/](https://waugh.zip/6443/)

---

{{% section %}}

## course content
* wargames (10%)
* 2 x pentesting reports (40%)
* mid-term (0%)
* final (50%)

---

## wargames
* don't leave them to the last minute, you'll be sad :(

* cool to collaborate/work together, but your flags need to be different.

* extended flags aren't *required*, but you should do them anyway (they're way cooler imo)

---

## report
* pentesting / vulnerability report
    * groups of 3-4
    * keep track of how you got found each of the flags
    * threats and remediation are really important

{{% /section %}}

---

{{% section %}}

## reconnaissance
check out [waugh.zip/6443/resources/recon](https://waugh.zip/6443/resources/recon)

---

### what is recon
* these should always be your first steps
* essentially everything that isn't exploitation
    * looking at a website
    * reading the html source
    * giving a application input it doesn't expect (e.g., code, a really big input, a file type it doesn't expect)

---

### why is it important?
* asymmetry of attack and defence
    * defenders need to defend everything
    * attackers only need a single vulnerability
* important to expand your attack surface
* understand what the application does, before trying to exploit it

---

### passive recon
* finding web content
* information leaked in local files (e.g. robots.txt, sitemap.xml, javascript files, html comments)
* surely nobody would expose information in [HTML](https://www.malwarebytes.com/blog/news/2022/02/journalist-wont-be-indicted-for-hacking-for-viewing-a-state-websites-html)

---

### demo
> website.com (don't try it at home)

---

### active recon
* grabbing a big list of words, and seeing if any of them resolve:
    * as a subdomain: <word>.example.com
    * as a subdirectory: example.com/<word>
    * as a port: example.com:<word> 
* also [linpeas](https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS), [sqlmap](https://github.com/sqlmapproject/sqlmap), [metasploit](https://www.metasploit.com/)

---

### subdomain/subdirectory/port
* subdirectory: another part of the same site
    * gobuster, dirbuster, etc
* subdomain: another server
    * also gobuster, dirbuster
* port: another application
    * nmap
 
> [seclists](https://github.com/danielmiessler/SecLists) and [wordlists](https://github.com/kkrypt0nn/wordlists) can be helpful wordlists

---

### demo 

---

### bruteforcing considerations
* very noisy
    * bruteforcing over dns vs http
    * you might be blocked
* not everything is a bruteforcing challenge
    * in a real engagement they'd get angry

{{% /section %}}

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
* [link to the slides](https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fmedia%2Eopenlearning%2Ecom%3A443%2FYeBDzZwyMePLbywk2UP9dScLxXrwUC68zPH4RxzXBivAM6tgYStqQKaYd75sPJuo%2E1653952985%2FCOMP6443%5FWeek%5F1%5Fv1%2E1%2Epptx&wdSlideId=256&wdModeSwitchTime=1654101511864)

---

## Demo
> BurpSuite and ProxySwitchy oh my

---

## Activities
* Form groups for the reports (2-3 people)
* Signing up/logging into QuoccaBank
* Installing burp suite/setting up certs?
* Try out some of the challenges!
    * Recon stuffs
    * HTTP as a service
