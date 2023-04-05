const melon = () => {
    const btn = document.querySelector('[data-role=button]');
    btn.innerHTML = btn.getAttribute('data-text');
}
melon();