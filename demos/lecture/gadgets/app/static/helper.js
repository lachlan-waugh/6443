(() => {
  const btn = document.querySelector('[data-role=button]');
  btn.innerHTML = btn.getAttribute('data-text');
})();

// <a data-role="button" data-text="<img src=x onerror=alert(1) />"></a>
