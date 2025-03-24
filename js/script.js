document.addEventListener("DOMContentLoaded", function () {
    // Cargar idioma guardado o usar español por defecto
    const savedLang = localStorage.getItem('selectedLanguage') || 'es';
    changeLanguage(savedLang);
    document.getElementById('currentLanguage').textContent = savedLang.toUpperCase();

    // Configurar el selector de idiomas
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            localStorage.setItem('selectedLanguage', lang);
            document.getElementById('currentLanguage').textContent = lang.toUpperCase();
        });
    });

    function changeLanguage(lang) {
        // Verificar que las traducciones existen
        if (!translations[lang]) {
            console.error(`No translations found for language: ${lang}`);
            return;
        }
    
        // 1. Actualizar elementos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            try {
                const keys = element.getAttribute('data-i18n').split('.');
                let translation = translations[lang];
                
                keys.forEach(key => {
                    if (!translation[key]) {
                        console.warn(`Missing translation for key: ${key}`);
                        return;
                    }
                    translation = translation[key];
                });
                
                if (translation && typeof translation === 'string') {
                    element.textContent = translation;
                }
            } catch (error) {
                console.error(`Error updating element:`, element, error);
            }
        });
    
        // 2. Actualizar placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            try {
                const keys = element.getAttribute('data-i18n-placeholder').split('.');
                let translation = translations[lang];
                
                keys.forEach(key => {
                    if (!translation[key]) {
                        console.warn(`Missing translation for placeholder key: ${key}`);
                        return;
                    }
                    translation = translation[key];
                });
                
                if (translation && typeof translation === 'string') {
                    element.placeholder = translation;
                }
            } catch (error) {
                console.error(`Error updating placeholder:`, element, error);
            }
        });
    
        // 3. Actualizar elementos específicos que no usan data-i18n
        try {
            // Hero section
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle && translations[lang].hero?.title) {
                heroTitle.textContent = translations[lang].hero.title;
            }
    
            // Sección de actividades
            const activitiesTitle = document.querySelector('#actividades .section-title');
            if (activitiesTitle && translations[lang].activities?.title) {
                activitiesTitle.innerHTML = translations[lang].activities.title;
            }
            const testimoniosTitle = document.querySelector('#testimonios-title');
            if (testimoniosTitle && translations[lang].voces?.title) {
            testimoniosTitle.innerHTML = translations[lang].voces.title;
            }

            const contactTitle = document.querySelector('#contact-title');
            if (contactTitle && translations[lang].contact?.title) {
            contactTitle.innerHTML = translations[lang].contact.title;
            }
            // Actualizar cards de actividades
            const activityCards = document.querySelectorAll('.experience-card');
            activityCards[0].querySelector('h3').textContent = translations[lang].activities.boat;
            activityCards[0].querySelector('.card-content p').textContent = translations[lang].activities.boatDesc;
            activityCards[0].querySelectorAll('.features-list li')[0].querySelector('span').textContent = `${translations[lang].activities.duration}: 2 ${lang === 'en' ? 'hours' : lang === 'pt' ? 'horas' : 'horas'}`;
            activityCards[0].querySelectorAll('.features-list li')[1].querySelector('span').textContent = translations[lang].activities.people;
            activityCards[0].querySelectorAll('.features-list li')[2].querySelector('span').textContent = translations[lang].activities.route;
            activityCards[0].querySelector('.btn-gold span').textContent = translations[lang].activities.book;
    
            activityCards[1].querySelector('h3').textContent = translations[lang].activities.tours;
            activityCards[1].querySelector('.card-content p').textContent = translations[lang].activities.toursDesc;
            activityCards[1].querySelectorAll('.features-list li')[0].querySelector('span').textContent = `${translations[lang].activities.duration}: 4 ${lang === 'en' ? 'hours' : lang === 'pt' ? 'horas' : 'horas'}`;
            activityCards[1].querySelectorAll('.features-list li')[1].querySelector('span').textContent = translations[lang].activities.groups;
            activityCards[1].querySelectorAll('.features-list li')[2].querySelector('span').textContent = translations[lang].activities.photo;
            activityCards[1].querySelector('.btn-gold span').textContent = translations[lang].activities.book;
    
            activityCards[2].querySelector('h3').textContent = translations[lang].activities.dinner;
            activityCards[2].querySelector('.card-content p').textContent = translations[lang].activities.dinnerDesc;
            activityCards[2].querySelectorAll('.features-list li')[0].querySelector('span').textContent = translations[lang].activities.menu;
            activityCards[2].querySelectorAll('.features-list li')[1].querySelector('span').textContent = translations[lang].activities.wine;
            activityCards[2].querySelectorAll('.features-list li')[2].querySelector('span').textContent = translations[lang].activities.music;
            activityCards[2].querySelector('.btn-gold span').textContent = translations[lang].activities.book;
    
            // Actualizar testimonios
            document.querySelector('#resenas .section-title').innerHTML = 
                `${translations[lang].testimonials.title}`;
            document.querySelectorAll('.testimonial-text')[0].textContent = `"${translations[lang].testimonials.testimonial1}"`;
            document.querySelectorAll('.testimonial-text')[1].textContent = `"${translations[lang].testimonials.testimonial2}"`;
    
            // Actualizar sección de contacto
            document.querySelector('#contacto .section-title').innerHTML = 
                `${translations[lang].contact.title}`;
            document.querySelector('#contacto .lead').textContent = translations[lang].contact.subtitle;
            document.querySelector('#contacto input[name="nombre"]').placeholder = translations[lang].contact.name;
            document.querySelector('#contacto input[name="email"]').placeholder = translations[lang].contact.emailPlaceholder;
            document.querySelector('#contacto textarea').placeholder = translations[lang].contact.message;
            document.querySelector('#contacto .btn-gold span').textContent = translations[lang].contact.send;
            
            // Actualizar el mensaje de respuesta del formulario
            const responseElement = document.getElementById("formResponse");
            if (responseElement) {
                responseElement.dataset.i18nResponse = "contact.response";
            }
        } catch (error) {
            console.error('Error updating specific elements:', error);
        }
    }

    // Efecto navbar al hacer scroll
    const navbar = document.querySelector(".navbar");
    
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Efecto parallax para las cards de experiencia
    const experienceCards = document.querySelectorAll(".experience-card");
    
    window.addEventListener("mousemove", function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        experienceCards.forEach((card, index) => {
            const offsetX = (x - 0.5) * 20 * (index % 2 === 0 ? 1 : -1);
            const offsetY = (y - 0.5) * 20;
            
            card.style.transform = `translateY(-10px) rotateX(${5 + offsetY/2}deg) rotateY(${offsetX/2}deg)`;
        });
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    // Efecto de aparición para las secciones
    const sections = document.querySelectorAll("section");
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add("visible");
            }
        });
    }
    
    window.addEventListener("scroll", checkScroll);
    checkScroll();

    // Formulario de contacto
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const responseElement = document.getElementById("formResponse");
            const currentLang = localStorage.getItem('selectedLanguage') || 'es';
            const translations = window.translations[currentLang];
            
            // Simulación de envío (reemplazar con fetch real)
            setTimeout(() => {
                responseElement.textContent = translations.contact.response;
                responseElement.style.color = "#d4af37";
                contactForm.reset();
                
                // Efecto de confeti
                for (let i = 0; i < 100; i++) {
                    createConfetti();
                }
            }, 1000);
        });
    }
    
    // Función de confeti para éxito en formulario
    function createConfetti() {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "8px";
        confetti.style.backgroundColor = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`;
        confetti.style.borderRadius = "50%";
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = "-10px";
        confetti.style.zIndex = "9999";
        confetti.style.opacity = "0.8";
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        const animationDuration = Math.random() * 3 + 2;
        
        confetti.animate([
            { top: "-10px", opacity: 1 },
            { top: `${Math.random() * 100 + 50}vh`, opacity: 0 }
        ], {
            duration: animationDuration * 1000,
            easing: "cubic-bezier(0.1, 0.8, 0.3, 1)"
        });
        
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }
});