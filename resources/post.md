```python
#!/usr/bin/python3

import requests
import urllib3
import re

from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

# cert  = ('/path/to/cert.pem', '/path/to/cert.key') # no longer required :(
proxy = { "https:": "https://127.0.0.1:8080", "http:" : "http://127.0.0.1:8080" }

def view():
	usr = "melon"
	pwd = "Hunter2"

	# Create the post
	page = requests.post("https://login.quoccabank.com", proxies = proxy,
        verify = False, data = {"username": usr, "password": pwd}
	)

	# you could extract the session cookie like so!
	cookie = re.search(r"session=(.+?);", page.headers['Set-Cookie']).group(1)
	print(cookie)

	# now we can view the page maybe??
	page = requests.get("https://quoccabank.com/view/", proxies = proxy, verify = False)
	print(page.text)

view()
```