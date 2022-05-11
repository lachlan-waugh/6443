const set_cookie = () => {
    const age = document.getElementById("age").textContent;
    document.cookie = `age: ${age}`;
}