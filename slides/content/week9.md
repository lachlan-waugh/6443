---
title: "09: devsecops"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 18:05

---

{{< slide class="center" >}}
# Week09
### COMP6443 H18A 

---

## My Experience

How'd you find the course
* What'd you like
* What'd you dislike
* What can be improved

> [https://myexperience.unsw.edu.au](https://myexperience.unsw.edu.au)

---

## Dev~~Sec~~Ops
{{% section %}}

&nbsp;

### Waterfall :ocean: vs agile :runner:
* Systematic/design vulnerabilities are much harder to solve than simple coding/logic errors.

* This is exacerbated in the waterfall approach, as you don't really go back to the design phase.

---

&nbsp;

### Waterfall :ocean:
* exponentially more `$$$` to fix bugs later into SDLC
* we want to shift security left `<<<`

![](/img/week09/sdlc.png)

---

&nbsp;
#### :computer: vms vs containers :whale:
<img src="/img/week09/containers-vs-virtual-machines.jpg" style="scale: 90%"/>

---

> CVEs

Common Vulnerability Enumerations

> It's really important that the security community works together

[where to find em](https://www.cvedetails.com/vulnerability-list/cvssscoremin-9/cvssscoremax-10/vulnerabilities.html)

---

> Application Security Testing

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

### what makes a secure web app

> ~~[technology](https://www.youtube.com/watch?v=Fc1P-AEaEp8)~~

* NGINX, [Lets Encrypt](https://letsencrypt.org/) (TLS), Docker
* don't trust ~~user input~~ anybody (zero-trust)
* good access control

---

## Challenges/Walkthrough
