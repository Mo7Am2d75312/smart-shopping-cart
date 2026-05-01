/**
 * Zenith Store - Form Validation
 * التحقق المخصص من صحة البيانات (Custom Validation)
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const checkoutForm = document.getElementById('checkoutForm');

    // التحقق من نموذج الاتصال أو إتمام الشراء
    const validateForm = (e, formType) => {
        let errors = [];
        
        // جلب القيم (بناءً على الـ ID في الـ HTML)
        const name = document.getElementById('uName')?.value;
        const email = document.getElementById('uEmail')?.value;
        const phone = document.getElementById('uPhone')?.value;

        // 1. التحقق من الاسم (أكثر من 8 أحرف)
        if (name && name.trim().length < 8) {
            errors.push("الرجاء إدخال الاسم الرباعي (على الأقل 8 أحرف).");
        }

        // 2. التحقق المخصص للإيميل (Regular Expression)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email)) {
            errors.push("تنسيق البريد الإلكتروني غير صحيح (مثال: name@domain.com).");
        }

        // 3. التحقق من رقم الهاتف (يجب أن يكون مصري 11 رقم)
        const phonePattern = /^01[0125]\d{8}$/;
        if (phone && !phonePattern.test(phone)) {
            errors.push("رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01 (010, 011, 012, 015).");
        }

        // إذا وجدت أخطاء
        if (errors.length > 0) {
            e.preventDefault(); // منع إرسال النموذج (متطلب أساسي)
            
            // عرض الأخطاء في رسالة واحدة منظمة
            alert("عذراً، هناك أخطاء في البيانات:\n\n" + errors.join("\n"));
        } else {
            // إذا كانت البيانات صحيحة
            alert("تم التحقق من البيانات بنجاح! جاري المعالجة...");
            
            // كتابة آخر عملية ناجحة في LocalStorage للذكرى
            localStorage.setItem('last_action', `قام ${name} بالإرسال في ${new Date().toLocaleString()}`);
        }
    };

    // ربط الحدث بالنموذج المتاح في الصفحة
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => validateForm(e, 'contact'));
    }
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => validateForm(e, 'checkout'));
    }
});