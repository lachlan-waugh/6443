---
title: ""
layout: "bundle"
outputs: ["Reveal"]
---

{{< slide class="center" >}}
# JSONP

---

## Origin vs Site

{{% section %}}
### Origin
> <span style="color: #021691">https://</span><span style="color: #fffacd">www\.example\.com</span><span style="color: #7FFFD4">:80</span>

origin = <span style="color: #021691">scheme</span> + <span style="color: #fffacd">host</span> + <span style="color: #7FFFD4">port</span>

---

### Site
> <span style="color: #021691">http://</span><span style="color: #A52A2A">www.</span><u><span style="color: #fffacd">example</span><span style="color: #D2691E">.com</span></u><span style="color: #7FFFD4">:80</span>
> <span style="color: #021691">https://</span><span style="color: #A52A2A">api.</span><u><span style="color: #fffacd">example</span><span style="color: #D2691E">.com</span></u><span style="color: #7FFFD4">:443</span>

site = <span style="color: #fffacd">private_domain</span> + <span style="color: #D2691E">public_suffix</span>
* <s><span style="color: #021691">scheme</span>, <span style="color: #A52A2A">subdomain</span> and <span style="color: #7FFFD4">port</span></s>
{{% /section %}}

---

{{% section %}}

## SOP (Same Origin Policy)
* Blocks resource requests to/from an *external* site

* "*External*" is based on *SOP*: only requests from the same `origin` are allowed to use the resources

* more secure ~~*but how people bypassed it isn't xd*~~

---

### Cross-Origin Resource Sharing
* Obviously sometimes you need to access resources from another origin (e.g. using images, videos)

* This can be achieved if the resource owner sets certain headers on the resource ([more here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers))

---

### Can it be bypassed
* It's just a browser protection
* Doesn't prevent the request (it'll still succeed), it prevents you from accessing the response.
* Would it block you if accessed it through a script?

{{% /section %}}

---

{{% section %}}

### JSONP
* What did people do before CORS was available?

* JSON with Padding
    * You can't load a resource from another domain (but you can load a script).

    * So, return a script which loads the content? :brain:

---

### How 2 JSONP
* How do you load the content? You run a function which takes the data as an argument.

* Since we're loading the data, we define what function is being used to load it.

---

### JSONP Example
* Define the function using a `callback` parameter
```html
<!-- https://melon.com/numbers?callback=load_data -->
load_data([1, 2, 3, 4, 5])
```

&nbsp;

* The script below will invoke `load_data([...])`
```html
<script src="https://melon.com/numbers?callback=load_data"></script>
```

---

### JSONP Demo

{{% /section %}}