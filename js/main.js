const themeBtn = document.getElementById('themeToggle');
themeBtn.onclick = function() {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = (currentTheme === 'light') ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('user-theme', targetTheme); // حفظ في الذاكرة
};
window.onload = function() {
    let savedTheme = localStorage.getItem('user-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
};
document.getElementById('regForm').onsubmit = function(e) {
    e.preventDefault();
    let email = document.getElementById('userEmail').value;
    let error = document.getElementById('errorMsg');
    
    // التحقق من الصيغة بدون استخدام HTML5 Required
    if (email === "" || email.length < 5 || !email.includes("@")) {
        error.style.display = "block";
        error.innerHTML = "برجاء إدخال بريد إلكتروني صحيح!";
    } else {
        error.style.display = "none";
        alert("تم التسجيل بنجاح: " + email);
        sessionStorage.setItem('last_sub', email);
    }
};