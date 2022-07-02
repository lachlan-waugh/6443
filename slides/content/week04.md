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

### General injection vulnerabilities
* using raw user input is dangerous
* mixing up `data` and `control` characters

```
'";<script/>../--#`ls`
```

---

## What is the issue?
* User input contains control characters that interfere with the syntax of the SQL statement
* Programmers can be kinda dumb
* The expectation that user input is trustworthy

---

## How does SQLi work

```sql
   SELECT col FROM table WHERE col = '<userInput>'
```

&nbsp;  

Using: `' OR 1=1 #`

```sql
                            vvvvvvvvvvvvvvvvv
SELECT col FROM table WHERE col = '' OR 1=1 #
                            ^^^^^^^^^^^^^^^^^
```

---

## Exploiting SQLi
* determine syntax (errors, fingerprint)
* find out the tables? (database schema)

{{% /section %}}

---

## Mitigations
* Hide error messages, disable debug mode
  * Just fail, display generic errors, blank screen?
* Web Application Firewalls (WAFs)
  * Strip out malicious payloads (regex replace OR/FROM etc)
  * or just fail when you encounter bad input (better?)
* Parameterised Queries

---

## Defeating mitigations!1!!

* Stripped payloads? > embed dummy characters (OORR)
* No response? Side channel attacks
    * Timing Attacks (IF success THEN sleep(1))
    * Out of Band Attacks
* Error-based extraction
* Boolean-based extraction

---

# Demo

---

## Now you
* give the challenges a shot :)
* the week05 ones aren't up yet :(
* get your report ready!!
