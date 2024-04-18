---
title: "9: devsecops"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 1[68]:05

---

{{< slide class="center" >}}
# dev sec ops
### 6[84]43 week9 

---

{{% section %}}
# Final exam
* saturday, 27th april
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

## My Experience
How'd you find the course
* What'd you like
* What'd you dislike
* What can be improved

> [https://myexperience.unsw.edu.au](https://myexperience.unsw.edu.au)

---

{{% section %}}

### CVEs
Common Vulnerability Enumerations

> It's really important that the security community works together

[where to find em](https://www.cvedetails.com/vulnerability-list/cvssscoremin-9/cvssscoremax-10/vulnerabilities.html)

---

### Application Security Testing
[SAST vs DAST tools](https://www.synopsys.com/blogs/software-security/sast-vs-dast-difference/)
* *SAST*: full access to source-code (white box)
* *DAST*: just have the application (black box)
* *IAST*: runtime specific (e.g. only specific times)

{{% /section %}}

---

#### I accidentally pushed some secrets [here](https://github.com/lachlan-waugh/secrets-management/)
> can you find them?

{{% fragment %}}
[old commits](https://github.com/lachlan-waugh/secrets-management/commit/7014a975239de9e93cbf3ee937f608373422dfb7)
{{% /fragment %}}

{{% fragment %}}
[wayback machine](https://web.archive.org/web/20220727160118/https://github.com/lachlan-waugh/secrets-management)
{{% /fragment %}}

{{% fragment %}}
[github events](https://api.github.com/repos/lachlan-waugh/secrets-management/events) ([commit is here](https://github.com/lachlan-waugh/secrets-management/commit/d6127d5a02a5e1f90c36cdb86e25508f580f2573))
{{% /fragment %}}

---

{{% section %}}

### who'd be dumb enough to...
[me lol](https://github.com/lachlan-waugh/cloud-computing/blob/main/creds/pub-key.pem) (it's not a pub-key...)

<img src="/img/week09/woops.png" style="scale: 70%"/>

---

### top 10 images taken moments ~~before~~ after disaster

![](/img/week09/cursed.png)

> maybe check your old projects to see if you've made similar dumb mistakes?

{{% /section %}}

---

## What makes a good app
{{% section %}}

### The fundamentals
* Availability :moneybag:
* Reliability :moneybag:
* Scalability :moneybag:
* ~~Security~~ :see_no_evil: :hear_no_evil: :speak_no_evil:

---

### At a high level
* UX/UI (e.g.
    [meme](https://www.art.yale.edu/)
    [meme2](https://www.art.yale.edu/about/about-this-site))
* [load speed](https://pagespeed.web.dev/)
* load balancing

---

&nbsp;

#### [not doing this](https://github.com/MrMEEE/bumblebee-Old-and-abbandoned/issues/123)

<img src="/img/week09/rmrfusr.png" style="scale: 90%"/>

{{% /section %}}

---

{{% section %}}

### Supply chain attacks

> dependency stuffs

---

> Trusting code we didn't write ourselves

* npm
* pip/pypi
* pacman/aur
* cargo

---

### Vulnerabilities

* [log4j](https://www.upguard.com/blog/apache-log4j-vulnerability) (2 billion devices!!!)

* [pac-resolver](https://arstechnica.com/information-technology/2021/09/npm-package-with-3-million-weekly-downloads-had-a-severe-vulnerability/) (3 million weekly downloads)

---

### Malicious developers

* [node-ipc](https://www.lunasec.io/docs/blog/node-ipc-protestware/) / [lovenotwar](https://snyk.io/advisor/npm-package/lovenotwar)

---

### Dependency confusion
* `npm install xyz`
* how does it resolve `xyz`
* public & private version of `xyz`
* higher version number

> [read more](https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610)

---

### Typosquatting
* `pip install falsk`
* package named `falsk`: 

> [read more](https://medium.com/checkmarx-security/typosquatting-campaign-targeting-12-of-pythons-top-packages-downloading-malware-hosted-on-github-9501f35b8efb)

---

### Vulnerability in the package manager

> I don't have an example :shrug:

{{% /section %}}

---

{{% section %}}
## CI/CD
keeping it secure

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

## Privilege escalation
what to do once you have RCE

* can execute arbitrary commands, but we're executing them as a lower-level user (e.g. `www-data` or `Nobody`)
* We want our commands to execute as root/admin/superuser

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

### what makes a secure web app

> ~~[technology](https://www.youtube.com/watch?v=Fc1P-AEaEp8)~~

* NGINX, [Lets Encrypt](https://letsencrypt.org/) (TLS), Docker
* don't trust ~~user input~~ anybody (zero-trust)
* good access control

---

## Challenges/Walkthrough
