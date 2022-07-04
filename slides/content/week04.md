---
title: "Week04"
layout: "bundle"
outputs: ["Reveal"]
---

## We'll get started at 16:05

---

{{< slide class="center" >}}
# Week04
### COMP6443 H16A 

---

## Good faith policy

We expect a high standard of professionalism from you at all times while you are taking any of our courses. We expect all students to act in good faith at all times

*TLDR: Don't be a jerk*

[sec.edu.au/good-faith-policy](https://sec.edu.au/good-faith-policy)


---

# Presentations
{{% section %}}
## anybody? 
ten minute presentation on something cool security related from the last week?
for bonus marks??

---

## SOLUTIONS?
anybody want to present the solutions for blog / files?

{{% /section %}}

---

## Upcoming due dates?
* week05
	* wed 6-7pm: mid-sem (10%)
	* sun 11:59pm: report01 (10%)
* week06
	* mon\*: topic03 challenges

\* *probably extended*

---

## SQL
Structured Query Language

{{% section %}}
* SQLite, PostgreSQL, MySQL, MSSQL Server
* Fingerprinting
	* `@@Version`: MSSQL
	* `Version()`: MySQL
	* `sqlite_version()`: sqlite
* DB schema: metadata about the database

---

Queries >
* `SELECT <column> FROM <table>;`
* `INSERT INTO table VALUES (a, b);`
* `UPDATE table SET ... = ...`
* `DELETE FROM table ...`
* `-- a comment (also #)`

---

SELECT \* FROM table WHERE ...
* `col =  ...`
* `col >  ...`
* `col <  ...` 
* `col <> ...	#` not equals (!=)
* `col LIKE ...	#` regexp, (% is wildcard)

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
* You can UNION 2 tables with different numbers of columns, but the query needs to extract the same number of columns from each of them
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

* You have SQLi in `items`, but want user details
  * find out the tables? (database schema)
  * include that table with a `UNION`

{{% /section %}}

---

## Mitigations

{{% section %}}

### Defense
* Reduce information disclosure
  * Don't display error messages
  * Just fail or show a basic error message (e.g. `'username or password incorrect'`)

* Strip out malicious content (e.g. use a WAF)

* Use the built-in parameterised queries, rather than using the raw input (e.g. format strings)

---

## Offense

* Content stripped?
  * embed dummy characters (oORr)
  * use alternating case (WhErE)
* No response?
  * Timing Attacks (IF success THEN sleep(1))
  * Error-based extraction (get the output in an error)
  * Boolean-based extraction (IF success THEN ...)

{{% /section %}}

---

# SQLi Demo
> A basic login form

---

## Now you
* give the challenges a shot :)
* the week05 ones aren't up yet :(
* get your report ready!!
