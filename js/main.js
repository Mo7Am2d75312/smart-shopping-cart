/**
 * Zenith Store - Main Logic
 * وظائف الثيمات، التخزين (LocalStorage & SessionStorage)
 */

// --- 1. نظام تبديل الثيمات (Theme Switcher) ---
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // تطبيق الثيم على وسم الـ HTML
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // حفظ الاختيار في LocalStorage (متطلب رقم 8)
    localStorage.setItem('user-theme', newTheme);
}

// --- 2. تحميل الإعدادات المحفوظة عند فتح الصفحة ---
window.addEventListener('DOMContentLoaded', () => {
    // استعادة الثيم المحفوظ
    const savedTheme = localStorage.getItem('user-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // تحديث عدد المنتجات في السلة (من SessionStorage)
    updateCartCount();
});

// --- 3. إدارة سلة التسوق (SessionStorage) ---
function addToCart(productName, price) {
    let cart = JSON.parse(sessionStorage.getItem('shopping-cart')) || [];
    
    const item = {
        id: Date.now(),
        name: productName,
        price: price
    };
    
    cart.push(item);
    
    // الكتابة في SessionStorage (متطلب رقم 8)
    sessionStorage.setItem('shopping-cart', JSON.stringify(cart));
    
    alert(`تم إضافة ${productName} إلى السلة بنجاح!`);
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(sessionStorage.getItem('shopping-cart')) || [];
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cart.length;
    }
}

// --- 4. التحكم في التبويبات (Tabs) لصفحة تفاصيل المنتج ---
function showTab(tabId) {
    // إخفاء كل المحتويات
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    // إظهار التبويب المختار
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
}
document.getElementById('subscribeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('subscriberEmail');
    const statusMsg = document.getElementById('subStatus');
    const emailValue = emailInput.value;

    // 1. Custom JS Validation (Regex) - متطلب رقم 7
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(emailValue)) {
        statusMsg.style.color = "#ffcccc";
        statusMsg.innerText = "Please enter a valid email address!";
        return;
    }

    // 2. Storage Operation (Write to LocalStorage) - متطلب رقم 8
    // حفظ قائمة المشتركين
    let subscribers = JSON.parse(localStorage.getItem('newsSubscribers')) || [];
    subscribers.push(emailValue);
    localStorage.setItem('newsSubscribers', JSON.stringify(subscribers));

    // النجاح
    statusMsg.style.color = "#dcfce7";
    statusMsg.innerText = "Awesome! You've been subscribed successfully.";
    emailInput.value = ""; // تفريغ الحقل
});