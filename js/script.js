// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTopbar();
    initScrollToTop();
    initCurrentYear();
    initContactForm();
    initPortfolio();
    initProjectPages();
    initLazyLoading();
});

// Topbar functionality
function initTopbar() {
    const topbar = document.querySelector('.topbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                topbar.classList.add('hidden');
            } else {
                // Scrolling up
                topbar.classList.remove('hidden');
            }
        } else {
            topbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.btn-scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Current year in footer
function initCurrentYear() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> Отправка...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual email sending)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Сообщение успешно отправлено!', 'success');
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
                if (modal) {
                    modal.hide();
                }
            }, 2000);
        });
    }
}

// Portfolio functionality
function initPortfolio() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.projectId || '1';
            openProjectPage(projectId);
        });
    });
}

// Project page functionality
function initProjectPages() {
    // Handle back to main button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('back-to-main')) {
            e.preventDefault();
            closeProjectPage();
        }
    });
    
    // Handle project close button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('project-close') || e.target.closest('.project-close')) {
            closeProjectPage();
        }
    });
    
    // Handle overlay click to close
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('project-overlay')) {
            closeProjectPage();
        }
    });
    
    // Handle ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectPage();
        }
    });
}

function openProjectPage(projectId) {
    // Create project page if it doesn't exist
    let projectPage = document.querySelector('.project-page');
    let projectOverlay = document.querySelector('.project-overlay');
    
    if (!projectPage) {
        projectOverlay = document.createElement('div');
        projectOverlay.className = 'project-overlay';
        document.body.appendChild(projectOverlay);
        
        projectPage = document.createElement('div');
        projectPage.className = 'project-page';
        projectPage.innerHTML = getProjectPageContent(projectId);
        document.body.appendChild(projectPage);
    } else {
        projectPage.innerHTML = getProjectPageContent(projectId);
    }
    
    // Show project page
    setTimeout(() => {
        projectOverlay.classList.add('active');
        projectPage.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update URL
        const newUrl = window.location.origin + window.location.pathname + '?project=' + projectId;
        window.history.pushState({project: projectId}, '', newUrl);
    }, 100);
}

function closeProjectPage() {
    const projectPage = document.querySelector('.project-page');
    const projectOverlay = document.querySelector('.project-overlay');
    
    if (projectPage && projectOverlay) {
        projectOverlay.classList.remove('active');
        projectPage.classList.remove('active');
        document.body.style.overflow = '';
        
        // Update URL
        const newUrl = window.location.origin + window.location.pathname;
        window.history.pushState({}, '', newUrl);
        
        // Remove elements after animation
        setTimeout(() => {
            if (projectPage && projectOverlay) {
                projectPage.remove();
                projectOverlay.remove();
            }
        }, 500);
    }
}

function getProjectPageContent(projectId) {
    const projects = {
        '1': {
            title: 'Корпоративный сайт для IT-компании',
            description: 'Современный адаптивный сайт для технологической компании с интеграцией CRM системы и системой аналитики.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Главная+страница',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=О+компании',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Услуги'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'PHP'],
            features: ['Адаптивный дизайн', 'SEO оптимизация', 'Интеграция с CRM', 'Система аналитики']
        },
        '2': {
            title: 'Логотип для ресторана',
            description: 'Уникальный логотип в современном стиле для сети ресторанов премиум-класса.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Логотип+вариант+1',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Логотип+вариант+2'
            ],
            technologies: ['Adobe Illustrator', 'Adobe Photoshop'],
            features: ['Векторная графика', 'Брендбук', 'Варианты использования']
        },
        '3': {
            title: 'Интернет-магазин электроники',
            description: 'Полнофункциональный интернет-магазин с системой управления товарами и интеграцией с платежными системами.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Каталог+товаров',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Корзина+покупок',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Оформление+заказа'
            ],
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
            features: ['Каталог товаров', 'Корзина покупок', 'Система оплаты', 'Личный кабинет']
        },
        '4': {
            title: 'Рекламный баннер для соцсетей',
            description: 'Яркий и привлекательный баннер для продвижения в социальных сетях.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Баннер+вариант+1',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Баннер+вариант+2'
            ],
            technologies: ['Adobe Photoshop', 'Adobe Illustrator'],
            features: ['Адаптивные размеры', 'Высокое качество', 'Быстрая загрузка']
        },
        '5': {
            title: 'Анимация логотипа',
            description: 'Креативная анимация логотипа для использования в видео и презентациях.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Анимация+логотипа',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Варианты+анимации'
            ],
            technologies: ['After Effects', 'Premiere Pro'],
            features: ['Плавная анимация', 'Разные форматы', 'Высокое качество']
        },
        '6': {
            title: 'Лендинг страница для консалтинга',
            description: 'Эффективная лендинг страница для привлечения клиентов в сфере консалтинга.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Главная+секция',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Услуги',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Контакты'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
            features: ['Высокая конверсия', 'SEO оптимизация', 'Адаптивный дизайн']
        },
        '7': {
            title: 'PDF презентация для инвестиций',
            description: 'Профессиональная презентация для привлечения инвестиций в проект.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Титульный+слайд',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Бизнес+модель',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Финансовые+показатели'
            ],
            technologies: ['Adobe InDesign', 'Adobe Illustrator'],
            features: ['Профессиональный дизайн', 'Инфографика', 'Высокое качество печати']
        },
        '8': {
            title: 'Логотип для стартапа',
            description: 'Современный и запоминающийся логотип для технологического стартапа.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Логотип+стартапа',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Варианты+использования'
            ],
            technologies: ['Adobe Illustrator', 'Adobe Photoshop'],
            features: ['Современный стиль', 'Масштабируемость', 'Брендбук']
        },
        '9': {
            title: 'Портфолио сайт фотографа',
            description: 'Элегантный сайт-портфолио для демонстрации работ фотографа.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Галерея+работ',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=О+фотографе',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Контакты'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Lightbox'],
            features: ['Галерея изображений', 'Быстрая загрузка', 'Адаптивный дизайн']
        },
        '10': {
            title: 'Баннер акции для розничной торговли',
            description: 'Привлекательный баннер для рекламной акции в розничной торговле.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Баннер+акции',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Мобильная+версия'
            ],
            technologies: ['Adobe Photoshop', 'Adobe Illustrator'],
            features: ['Яркий дизайн', 'Читаемость', 'Разные форматы']
        },
        '11': {
            title: 'Интерактивная анимация для образования',
            description: 'Образовательная интерактивная анимация для онлайн-курса.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Интерактивная+анимация',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Элементы+управления'
            ],
            technologies: ['After Effects', 'HTML5', 'CSS3', 'JavaScript'],
            features: ['Интерактивность', 'Образовательный контент', 'Кроссплатформенность']
        },
        '12': {
            title: 'Блог платформа для контента',
            description: 'Современная платформа для ведения блога с системой управления контентом.',
            images: [
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Главная+страница',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Статьи',
                'https://via.placeholder.com/800x600/D2CABD/590000?text=Админ+панель'
            ],
            technologies: ['WordPress', 'PHP', 'MySQL', 'Bootstrap'],
            features: ['CMS система', 'SEO оптимизация', 'Адаптивный дизайн']
        }
    };
    
    const project = projects[projectId] || projects['1'];
    
    return `
        <div class="project-header">
            <button class="project-close">&times;</button>
            <h1 class="project-title">${project.title}</h1>
        </div>
        <div class="project-content">
            <p class="project-description">${project.description}</p>
            
            <div class="project-images">
                ${project.images.map(img => `<img src="${img}" alt="${project.title}" loading="lazy">`).join('')}
            </div>
            
            <div class="row mb-4">
                <div class="col-md-6">
                    <h4>Технологии:</h4>
                    <ul class="list-unstyled">
                        ${project.technologies.map(tech => `<li><i class="fas fa-check text-success me-2"></i>${tech}</li>`).join('')}
                    </ul>
                </div>
                <div class="col-md-6">
                    <h4>Особенности:</h4>
                    <ul class="list-unstyled">
                        ${project.features.map(feature => `<li><i class="fas fa-star text-warning me-2"></i>${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="text-center">
                <a href="index.html" class="back-to-main">Вернуться на главную</a>
            </div>
        </div>
    `;
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    if (projectId) {
        openProjectPage(projectId);
    } else {
        closeProjectPage();
    }
});

// Initialize project from URL on page load
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    if (projectId) {
        setTimeout(() => {
            openProjectPage(projectId);
        }, 500);
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Search functionality (placeholder)
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    showNotification(`Поиск по запросу: "${searchTerm}"`, 'info');
                }
            }
        });
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
});

