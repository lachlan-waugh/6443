import requests
import re
import sys

proxy = { "https:": "https://127.0.0.1:8080", "http:" : "http://127.0.0.1:8080" }

def usage():
	print("Usage: ./fetch.py [options] input"
		+ "\t -r FILE (a file containing urls to check)"
		+ "\t -f URL")

def recursive(file):
	for line in open(file).readlines():
		read_domain(line.strip())

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

if len(sys.argv) == 3:
	if (sys.argv[1] == "-r"):
		recursive(sys.argv[2])
	elif (sys.argv[1] == "-f"):
		read_domain(sys.argv[2])
	else:
		usage()
else:
	usage()