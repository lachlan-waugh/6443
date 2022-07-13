import requests
import re
import sys

proxy = { 'https:': 'http://127.0.0.1:8080', 'http:' : 'http://127.0.0.1:8080' }

def read_domain(subd):
	res = requests.get(f'https://{subd}.quoccabank.com', proxies = proxy)

	if (res.status_code == 404):
		# page not found
		continue

	print(page.text)

def post_domain(subd)
	res = requests.post(f'https://{subd}.quoccabank.com', data={'password': 'Hunter2'} proxies=proxy)

	if (res.status_code == 404):
		# page not found
		continue

	print(res.text)