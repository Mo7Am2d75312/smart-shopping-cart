const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
    themeBtn.onclick = function() {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let targetTheme = (currentTheme === 'light') ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('user-theme', targetTheme);
    };
}
window.onload = function() {
    let savedTheme = localStorage.getItem('user-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
};
const registrationForm = document.getElementById('regForm');
if (registrationForm) {
    registrationForm.onsubmit = function(e) {
        e.preventDefault();
        let email = document.getElementById('userEmail').value;
        let error = document.getElementById('errorMsg');
        if (email === "" || email.length < 5 || !email.includes("@")) {
            error.style.display = "block";
            error.style.color = "red";
            error.innerHTML = "Please enter a valid email address!";
        } else {
            error.style.display = "none";
            alert("Registration successful for: " + email);
            sessionStorage.setItem('last_sub', email);
        }
    };
}