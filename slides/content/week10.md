---
title: "10: advanced stuff"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 18:05

---

{{< slide class="center" >}}
# Week10
### COMP6443 H18A 

---

## Final exam
{{% section %}}
### Overview
* wednesday, 3rd May
* 3 hours (1pm - 4pm)
* worth 50%

---

### whats in it
* everything is assessable™
* not just stuff from wargames
* submit a short writeup explaination
* there's also a shortish devsecops question

---

### how2hack 
* my biggest tip is try not to stress out
* *\+ practice, practice, practice*
* start with recon before you write payloads

{{% /section %}}

---

## CI/CD
{{% section %}}

### keeping it secure
* github actions ([ramble](https://github.com/lachlan-waugh/6443))
* [pre-commit hooks](https://pre-commit.com/)
* `.gitignore`
* ~~[not this](https://github.com/mattdiamond/fuckitjs)~~

---

### what to keep secure
* tokens
* keys
* `.env`
* `.git`

> basically just \~secrets\~

---

### dumb projects idk
* [git-blame](https://github.com/jayphelps/git-blame-someone-else)
* [hello-world.rs](https://github.com/mTvare6/hello-world.rs)
* [logout4shell](https://github.com/Cybereason/Logout4Shell)
* [nocode](https://github.com/kelseyhightower/nocode)
* [printf-tac-toe](https://github.com/carlini/printf-tac-toe)
* [printbf](https://github.com/HexHive/printbf)

{{% /section %}}

---

## VPNs

{{% section %}}

Browsing vs SDN (site-to-site)

![](/img/week10/sdn.png)

---

[Privacy](https://www.welivesecurity.com/2020/07/20/seven-vpn-services-leaked-data-20million-users-report/)

> "providers who claim not to keep any logs of their users' online activities recently left 1.2 terabytes of private user data exposed" :thinking:

{{% /section %}}

---

{{% section %}}

## What to do once you have RCE

---

> We can execute arbitrary commands, but we're executing them as a lower-level user (e.g. `www-data` or `Nobody`)

---

### Privilege escalation
> We want our commands to execute as root/admin/superuser

---

### How to privesc
* world-writable /etc/passwd (wait it is useful?)
* cronjob running as sudo
* setuid binaries
* commands run as root without password
* vulnerabilities in the kernel itself (dirtycow?)

---

### Docker escape

---

### Useful resources

* [linPEAS](https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS)
* [CDK](https://github.com/cdk-team/CDK#installationdelivery)
* [amicontained](https://github.com/genuinetools/amicontained)
* [deepce](https://github.com/stealthcopter/deepce)
* [grype](https://github.com/anchore/grype)

{{% /section %}}

---

## My Experience
How'd you find the course
* What'd you like
* What'd you dislike
* What can be improved

> [https://myexperience.unsw.edu.au](https://myexperience.unsw.edu.au)

---

### Presentations
* Anybody
* xd

---

## Challenges
* wordoftheday
* legitauthpage
* jobs
* layoffs
* nfts