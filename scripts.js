document.addEventListener("DOMContentLoaded", () => {
    // Theme toggle
    const themeBtn = document.getElementById("theme-toggle");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    
    const setTheme = (isDark) => {
        document.body.classList.toggle("dark-theme", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
        if (themeBtn) {
            themeBtn.textContent = isDark ? "Светлая тема" : "Тёмная тема";
            themeBtn.style.color = isDark ? '#333' : '#fff';
            themeBtn.style.backgroundColor = isDark ? '#fff' : '#333';
        }
    };
    
    // Check saved theme or preferred scheme
    if (themeBtn) {
        const savedTheme = localStorage.getItem("theme");
        const isDark = savedTheme ? savedTheme === "dark" : prefersDark.matches;
        setTheme(isDark);
        
        themeBtn.addEventListener("click", () => {
            const isDark = !document.body.classList.contains("dark-theme");
            setTheme(isDark);
        });
    }
    
    // Form handling
    const handleFormSubmit = (form, successMessage) => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector("button[type='submit']");
            const originalText = submitBtn.textContent;
            
            try {
                submitBtn.disabled = true;
                submitBtn.textContent = "Отправка...";
                
                // Simulate network request
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                const toast = document.createElement("div");
                toast.className = "toast";
                toast.textContent = successMessage;
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.classList.add("show");
                }, 10);
                
                setTimeout(() => {
                    toast.classList.remove("show");
                    setTimeout(() => toast.remove(), 300);
                }, 3000);
                
                form.reset();
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    };
    
    // Review form
    const reviewForm = document.querySelector(".review-form");
    if (reviewForm) {
        handleFormSubmit(reviewForm, "Спасибо за ваш отзыв!");
        
        reviewForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = reviewForm.querySelector("input[name='name']").value;
            const text = reviewForm.querySelector("textarea[name='review']").value;
            
            if (name && text) {
                const reviewsContainer = document.getElementById("reviews-list");
                if (reviewsContainer) {
                    const newReview = document.createElement("div");
                    newReview.className = "card review-card";
                    newReview.innerHTML = `
                        <p><strong>${name}:</strong> ${text}</p>
                        <div class="review-date">${new Date().toLocaleDateString()}</div>
                    `;
                    reviewsContainer.prepend(newReview);
                }
            }
        });
    }
    
    // Contact form
    const contactForm = document.querySelector("form:not(.review-form)");
    if (contactForm) {
        handleFormSubmit(contactForm, "Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
    }
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});