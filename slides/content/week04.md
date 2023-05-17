---
title: "04: sqli"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 18:05

---

{{< slide class="center" >}}
# Week04
### COMP6443 H18A 

---

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
