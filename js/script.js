document.addEventListener("DOMContentLoaded", function () {
    // Cargar idioma guardado o usar español por defecto
    const savedLang = localStorage.getItem('selectedLanguage') || 'es';
    changeLanguage(savedLang);
    document.getElementById('currentLanguage').textContent = savedLang.toUpperCase();
    document.getElementById('currentLanguageDesktop').textContent = savedLang.toUpperCase();

    // Configurar el selector de idiomas
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            localStorage.setItem('selectedLanguage', lang);
            document.getElementById('currentLanguage').textContent = lang.toUpperCase();
            document.getElementById('currentLanguageDesktop').textContent = lang.toUpperCase();
            
            // Actualizar los botones de WhatsApp para las experiencias
            setupWhatsAppButtons();
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
                    element.innerHTML = translation;
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
            
            // Hero subtitle
            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle && translations[lang].hero?.subtitle) {
                heroSubtitle.textContent = translations[lang].hero.subtitle;
            }
    
            // Sección de actividades
            const activitiesTitle = document.querySelector('#actividades .section-title');
            if (activitiesTitle && translations[lang].activities?.title) {
                activitiesTitle.innerHTML = translations[lang].activities.title;
            }
            const testimoniosTitle = document.querySelector('#testimonios-title');
            if (testimoniosTitle && translations[lang].testimonials?.title) {
                testimoniosTitle.innerHTML = translations[lang].testimonials.title;
            }

            const contactTitle = document.querySelector('#contact-title');
            if (contactTitle && translations[lang].contact?.title) {
                contactTitle.innerHTML = translations[lang].contact.title;
            }
            // Actualizar cards de actividades
            const activityCards = document.querySelectorAll('.experience-card');
            
            // Primera tarjeta - Paseos en Lancha
            if (activityCards[0]) {
                activityCards[0].querySelector('h3').textContent = translations[lang].activities.boat;
                activityCards[0].querySelector('.card-content p').textContent = translations[lang].activities.boatDesc;
                activityCards[0].querySelectorAll('.features-list li')[0].querySelector('span').textContent = `${translations[lang].activities.duration}: 3 ${lang === 'en' ? 'hours, schedules to be arranged.' : lang === 'pt' ? 'horas, a combinar horários' : 'horas, a combinar horario.'}`;
                activityCards[0].querySelectorAll('.features-list li')[1].querySelector('span').textContent = translations[lang].activities.people;
                activityCards[0].querySelectorAll('.features-list li')[2].querySelector('span').textContent = translations[lang].activities.route;
                activityCards[0].querySelector('.btn-gold span').textContent = translations[lang].activities.book;
            }
    
            // Segunda tarjeta - Atardecer & Luna naciente
            if (activityCards[1]) {
                activityCards[1].querySelector('h3').textContent = translations[lang].activities.tours;
                activityCards[1].querySelector('.card-content p').textContent = translations[lang].activities.toursDesc;
                activityCards[1].querySelectorAll('.features-list li')[0].querySelector('span').textContent = `${translations[lang].activities.duration}: 2 ${lang === 'en' ? 'hours Synchronized with the moment when the sun sets and the moon appears, on those days when the moon can be seen.' : lang === 'pt' ? 'horas, Sincronizado com o momento em que o sol se põe e a lua aparece, naqueles dias em que a lua pode ser vista.' : 'horas aproximadas, a combinar horarios. Sincronizadas con el instante en que el sol se esconde y la luna se asoma, en aquellos días en los que la luna se deja ver.'}`;
                activityCards[1].querySelectorAll('.features-list li')[1].querySelector('span').textContent = translations[lang].activities.groups;
                activityCards[1].querySelectorAll('.features-list li')[2].querySelector('span').textContent = translations[lang].activities.photo;
                activityCards[1].querySelector('.btn-gold span').textContent = translations[lang].activities.book;
            }
            
            // Tercera tarjeta - Almuerzo adaptado
            if (activityCards[2]) {
                activityCards[2].querySelector('h3').textContent = translations[lang].activities.dinner;
                activityCards[2].querySelector('.card-content p').textContent = translations[lang].activities.dinnerDesc;
                
                // Actualizar las características de la tercera tarjeta
                const features = activityCards[2].querySelectorAll('.features-list li');
                
                // Duración
                if (features[0]) {
                    features[0].querySelector('span').textContent = `${translations[lang].activities.duration}: ${lang === 'en' ? 'Full day, schedules to be arranged.' : lang === 'pt' ? 'Dia completo, schedules to be arranged.' : 'Día completo, a combinar horario.'}`;
                }
                
                // Opciones de menú
                if (features[1]) {
                    features[1].querySelector('span').textContent = translations[lang].activities.options;
                }
                
                // Opciones de menú (lista anidada)
                const menuOptions = activityCards[2].querySelectorAll('.features-list ul li');
                if (menuOptions.length >= 3) {
                    menuOptions[0].querySelector('span').textContent = translations[lang].activities.menu;
                    menuOptions[1].querySelector('span').textContent = translations[lang].activities.wine;
                    menuOptions[2].querySelector('span').textContent = translations[lang].activities.music;
                }
                
                // Puesta del sol
                if (features[features.length - 1]) {
                    features[features.length - 1].querySelector('span').textContent = translations[lang].activities.sun;
                }
                
                // Botón de reserva
                activityCards[2].querySelector('.btn-gold span').textContent = translations[lang].activities.book;
            }
    
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
            
            // Actualizar mensaje de WhatsApp
            const whatsappButton = document.getElementById("whatsappButton");
            if (whatsappButton && translations[lang].whatsapp?.message) {
                const encodedMessage = encodeURIComponent(translations[lang].whatsapp.message);
                whatsappButton.href = `https://wa.me/+5491131977801?text=${encodedMessage}`;
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
            
            // Mostrar indicador de carga
            responseElement.textContent = "Enviando...";
            responseElement.style.color = "#d4af37";
            
            // Envío real del formulario
            fetch('./enviar.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    responseElement.textContent = translations.contact.success || "¡Mensaje enviado con éxito!";
                    responseElement.style.color = "#d4af37";
                    contactForm.reset();
                    
                    // Efecto de confeti
                    createConfetti();
                } else {
                    responseElement.textContent = data.message || translations.contact.error || "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.";
                    responseElement.style.color = "#ff6b6b";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                responseElement.textContent = translations.contact.error || "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.";
                responseElement.style.color = "#ff6b6b";
            });
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

    // Configurar los botones de reserva para abrir WhatsApp con mensajes personalizados
    setupWhatsAppButtons();
});

// Función para configurar los botones de WhatsApp con mensajes personalizados
function setupWhatsAppButtons() {
    // Obtener todos los enlaces de reserva
    const bookLinks = document.querySelectorAll('.experience-card .btn-gold');
    
    // Obtener el idioma actual
    const currentLang = localStorage.getItem('selectedLanguage') || 'es';
    console.log('Idioma actual para WhatsApp:', currentLang);
    
    // Configurar cada enlace con su mensaje personalizado
    bookLinks.forEach((link, index) => {
        // Eliminar eventos anteriores para evitar duplicados
        if (link.clickHandler) {
            link.removeEventListener('click', link.clickHandler);
        }
        
        // Crear un nuevo manejador de eventos
        link.clickHandler = function(e) {
            e.preventDefault();
            
            // Obtener el idioma actual
            const currentLang = localStorage.getItem('selectedLanguage') || 'es';
            
            let messageKey;
            
            // Determinar qué mensaje usar según el índice del enlace
            switch(index) {
                case 0:
                    messageKey = 'boatMessage';
                    break;
                case 1:
                    messageKey = 'toursMessage';
                    break;
                case 2:
                    messageKey = 'dinnerMessage';
                    break;
                default:
                    messageKey = 'message';
            }
            
            // Obtener el mensaje traducido
            const message = translations[currentLang].whatsapp[messageKey];
            console.log('Mensaje de WhatsApp:', message);
            const encodedMessage = encodeURIComponent(message);
            
            // Abrir WhatsApp con el mensaje personalizado
            window.open(`https://wa.me/+5491131977801?text=${encodedMessage}`, '_blank');
        };
        
        // Agregar el nuevo manejador de eventos
        link.addEventListener('click', link.clickHandler);
    });
}