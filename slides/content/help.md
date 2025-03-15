---
title: "Help"
layout: "bundle"
outputs: ["Reveal"]
---

### DO COMP6447
DO COMP6447

---

{{% section %}}

## Exam

---

### suggestions
* don't stress out
* seperate vulnerability from exploit
* have a good thought process

---

### vulnerability vs exploit
theres more to the vulns than we cover in the challenges

* xss is more than just html injection
* sqli is more than just `' OR 1=1 #`

---

### thought process
it can be easy to go down a rabbit hole, dont do that

* think about what the application is doing
* try to do what the application expects, but in wierd ways
* note down what you're doing, as you do them
    * in case you change challenges
    * also helpful for the writeup

---

### solving the challenge
a lot of what we're testing is if you can identify what type of vulnerability it is

* think about what the challenge does
* could there be another user (e.g. admin), maybe client-side
* if client-side, check csp

---

### Tip and tricks
* write up some notes for yourself
    * e.g. check robots.txt/sitemap.xml
* get some polyglot payloads to test for a variety of vulnerabilities
    * e.g. `{}\<script\>"'\``
    * this should (hopefully) crash/int the site
* you can get marks (up to 80%) for partial solves

---

### How to prepare
* focus on breadth
* practice doing stuff under time pressure
* make sure you understand the vulnerabilities

---

## What to expect
some of the weekly challenges were previous exams

* report_v2 2023 qc3 ext
* soy-central 2023 qc5 ext
* engineering 2023 qb1
* flying high 2023 qa3 

--- 

### Comparison to midterm
* Q1-4 Part A
* Q5 Part B
* Q6 Part C (ext probably)

---

### Some demos
aka previous exam challenges

{{% /section %}}

---

{{% section %}}

### client-side
TODO

{{% /section %}}
