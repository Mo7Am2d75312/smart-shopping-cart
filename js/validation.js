document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const checkoutForm = document.getElementById('checkoutForm');
    const validateForm = (e, formType) => {
        let errors = [];
        const name = document.getElementById('uName')?.value;
        const email = document.getElementById('uEmail')?.value;
        const phone = document.getElementById('uPhone')?.value;
        if (name && name.trim().length < 8) {
            errors.push("Please enter your full name (at least 8 characters).");
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email)) {
            errors.push("Invalid email format (Example: name@domain.com).");
        }
        const phonePattern = /^01[0125]\d{8}$/;
        if (phone && !phonePattern.test(phone)) {
            errors.push("Phone must be 11 digits starting with 01 (010, 011, 012, or 015).");
        }
        if (errors.length > 0) {
            e.preventDefault();
            alert("Validation Errors:\n\n" + errors.join("\n"));
        } else {
            alert("Data validated successfully! Processing your request...");
            localStorage.setItem('last_action', `${name} submitted the ${formType} form on ${new Date().toLocaleString()}`);
        }
    };
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => validateForm(e, 'contact'));
    }
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => validateForm(e, 'checkout'));
    }
});
function toggleTheme() {
    const html = document.documentElement;
    let currentTheme = html.getAttribute('data-theme');
    let targetTheme = (currentTheme === 'light') ? 'dark' : 'light';
    html.setAttribute('data-theme', targetTheme);
    localStorage.setItem('user-theme', targetTheme);
}
(function loadSavedTheme() {
    const savedTheme = localStorage.getItem('user-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
})();