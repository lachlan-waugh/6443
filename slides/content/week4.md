---
title: "4: ssi"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 1[68]:05

---

{{< slide class="center" >}}
## server-side injection
### 6[84]43 week4 

---

* SSTI (did they gggo through this? idk)
* Shell injection, RCE and Reverse Shells

## Upcoming due dates?
> next week
* wed 6-7pm: mid-sem (10%)
* sun 11:59pm
  * report01 (20%)
  * topic03 challenges

---

## SQL

{{% section %}}
> Structured Query Language
* SQLite, PostgreSQL, MySQL, MSSQL Server

---

> Fingerprinting
* work out the flavour/version
	* **MySQL**: `Version()`
	* **SQLite**: `sqlite_version()`
	* **MSSQL**: `@@Version`

---

> Finding the schema
* what tables exist, what do they look like?
	* **MySQL**: `information_schema.[tables|columns]`
	* **SQLite**: `sqlite_[master|schema]`
	* **MSSQL**: `SHOW TABLES; DESCRIBE <table_name>`

---

Queries >
* `SELECT <column> FROM <table>;`
* `INSERT INTO table VALUES (a, b);`
* `UPDATE table SET ... = ...`
* ~~`DELETE FROM table ...`~~ (*pls dont*)
* `-- a comment (also #)`

---

SELECT \* FROM table WHERE ...
* `col =  ...`
* `col >  ...`
* `col <  ...` 
* `col <> ...	#` not equals (!=)
* `col LIKE ...	#` regexp
  * `_` `(.)` and `%` `(.*)` are wildcards

---

`SELECT user, pass FROM users UNION SELECT title, author FROM blogs`
```
  user	  pass	     id	  title   author	THE UNION
|=======|=======|   |===|=======|=======|   |=======|=======|
| admin	| admin	|   | 1 | blog1 | melon |   | admin | admin |
| melon	| water	|   | 2 | blog2 | admin |   | melon | water |
|=======|=======|   | 3 | blog3 | admin |   | blog1 | melon |
		    |===|=======|=======|   | blog2 | admin |
		 		    	    | blog3 | admin |
      users		   blogs	    |=======|=======|
```
	
---

## Notes on UNIONs
* The query needs to extract the same number of columns from both tables
* The data-type for the columns must be compatible
* You can also UNION the same table

{{% /section %}}

---

## SQLi
{{% section %}}

### SQL Injection
* *TLDR*: blindly trusting user input is bad

* What if we injected control characters which changed how the database interprets the query? e.g. inject our own `UNIONS/WHERES/etc`

* How could it tell the difference?

---

### How does SQLi work

```sql
SELECT * FROM users WHERE user = '{input}' AND password = '{...}'
```

&nbsp;  

If our input was: `' OR 1=1 --`

```sql
--                        vvvvvvvvvvvvvvvvvvvv
SELECT * FROM users WHERE user = '' OR 1=1 --'and password = '...'
--                        ^^^^^^^^^^^^^^^^^^^^
-- user = '' is always false, but 1=1 is always true
-- so this will return every user from the database
```

---

### Issues you may encounter
* Syntax needs to be correct, or you'll throw an error
  * so, determine syntax through errors/fingerprint

* You have SQLi in `items`, but want `users`
  * find out the tables? (database schema)
  * include that table with a `UNION`

{{% /section %}}

---

# SQLi Demo
> A basic login form

---

## Mitigations

{{% section %}}

### Defense
* Reduce information disclosure
  * Don't display error messages
  * Just fail or show a basic error message (e.g. `'username or password incorrect'`)
* Strip out malicious content (e.g. use a WAF)
* Block requests with anything sus (*kinda bad UX*)

---

### Better defence
* Don't use raw content
  * Use parameterised queries rather than raw input
  * use an ORM (database as an object)

> Note: these have historically still been vulnerable, don't solely rely on them

---

### Offense

* Content stripped?
  * embed dummy characters (oORr)
  * use alternating case (WhErE)
* No response?
  * Timing Attacks (IF success THEN sleep(1))
  * Error-based extraction (get the output in an error)
  * Boolean-based extraction (IF success THEN ...)

{{% /section %}}

---

## NoSQL (MongoDB)
* it's not sql so therefore no sqli right?
  * yes but not yes
  * it's still vulnerable to injection
* not *necessarily* in the challenges
> covered in the extended lecture

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

## Presentations
{{% section %}}
### anybody? 
ten minute presentation on something cool security related from the last week?
for bonus marks??

---

### Walkthroughs?
anybody want to present the solutions for blog / files?

{{% /section %}}

---

## Now you
* give the topic3 challenges a shot :)
* get your report ready!!
