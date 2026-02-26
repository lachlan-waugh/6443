import requests, urllib3, re
# helpful, as it ignores the annoying HTTPS error message
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

WORDLIST='/usr/share/seclists/Passwords/Common-Credentials/best1050.txt'

s = requests.Session()
s.proxy = { "https": "http://127.0.0.1:8080", "http" : "http://127.0.0.1:8080" }
s.verify = False

page = s.post('http://localhost:5000', data={'username': 'hackme', 'password': 'test'})
print(page.status_code)
