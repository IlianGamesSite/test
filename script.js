document.addEventListener('DOMContentLoaded', function() {
    // Создание дополнительных звездочек
    createStars();
    
    // Добавление интерактивности к фотографиям
    addPhotoInteractions();
    
    // Добавление эффекта печатной машинки к тексту
    typewriterEffect();
    
    // Добавление частиц при клике
    addClickParticles();
    
    // Добавление музыкального эффекта при наведении
    addHoverSounds();
    
    // Анимация появления элементов при скролле
    observeElements();
});

function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
        `;
        starsContainer.appendChild(star);
    }
    
    // Добавляем CSS анимацию для мерцания
    if (!document.getElementById('star-styles')) {
        const style = document.createElement('style');
        style.id = 'star-styles';
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.2; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }
}

function addPhotoInteractions() {
    const photos = document.querySelectorAll('.photo');
    
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            // Создаем эффект увеличения при клике
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            // Добавляем сердечки вокруг фото
            createHeartBurst(this);
        });
        
        photo.addEventListener('mouseenter', function() {
            this.style.filter = 'saturate(1.3) brightness(1.1) contrast(1.1)';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.filter = 'saturate(1.1) brightness(1.05)';
        });
    });
}

function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['💕', '💖', '💗', '💝', '💞'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 1000;
            animation: heartBurst 2s ease-out forwards;
        `;
        
        const angle = (i / 8) * Math.PI * 2;
        heart.style.setProperty('--angle', angle + 'rad');
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
    
    // Добавляем CSS анимацию для взрыва сердечек
    if (!document.getElementById('heart-burst-styles')) {
        const style = document.createElement('style');
        style.id = 'heart-burst-styles';
        style.textContent = `
            @keyframes heartBurst {
                0% {
                    transform: translate(0, 0) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translate(
                        calc(cos(var(--angle)) * 100px),
                        calc(sin(var(--angle)) * 100px)
                    ) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(
                        calc(cos(var(--angle)) * 150px),
                        calc(sin(var(--angle)) * 150px)
                    ) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function typewriterEffect() {
    const greetingText = document.querySelector('.greeting-text');
    const originalText = greetingText.textContent;
    greetingText.textContent = '';
    
    let index = 0;
    const typingSpeed = 50;
    
    function type() {
        if (index < originalText.length) {
            greetingText.textContent += originalText.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }
    
    // Запускаем эффект печати через небольшую задержку
    setTimeout(type, 1000);
}

function addClickParticles() {
    document.addEventListener('click', function(e) {
        createParticle(e.clientX, e.clientY);
    });
}

function createParticle(x, y) {
    const particles = ['✨', '🌟', '💫', '⭐'];
    const particle = document.createElement('div');
    
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: particleFloat 3s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
    
    // Добавляем CSS анимацию для частиц
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translate(0, 0) scale(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(
                        ${Math.random() * 200 - 100}px,
                        ${Math.random() * -200 - 50}px
                    ) scale(1.5) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function addHoverSounds() {
    // Создаем аудио контекст для звуковых эффектов
    let audioContext;
    
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }
    
    function playTone(frequency, duration) {
        const context = initAudio();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + duration);
    }
    
    // Добавляем звуки к интерактивным элементам
    const interactiveElements = document.querySelectorAll('.photo-card, .family-member, .gift-box');
    
    interactiveElements.forEach((element, index) => {
        element.addEventListener('mouseenter', () => {
            const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            playTone(frequencies[index % frequencies.length], 0.2);
        });
    });
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Добавляем специальные эффекты для разных элементов
                if (entry.target.classList.contains('family-member')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'scale(1.02)';
                        setTimeout(() => {
                            entry.target.style.transform = 'scale(1)';
                        }, 300);
                    }, 500);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Наблюдаем за всеми основными секциями
    const elementsToObserve = document.querySelectorAll('.greeting-section, .photos-section, .family-member, .egypt-section, .final-section');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Добавляем дополнительные интерактивные эффекты
function addSpecialEffects() {
    // Эффект параллакса для фона
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.stars');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Добавляем rainbow эффект к заголовку при двойном клике
    const mainTitle = document.querySelector('.main-title');
    mainTitle.addEventListener('dblclick', () => {
        mainTitle.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            mainTitle.style.animation = 'titleGlow 2s ease-in-out infinite alternate';
        }, 2000);
    });
    
    // Добавляем CSS для rainbow эффекта
    if (!document.getElementById('rainbow-styles')) {
        const style = document.createElement('style');
        style.id = 'rainbow-styles';
        style.textContent = `
            @keyframes rainbow {
                0% { color: #d63384; }
                16% { color: #fd7e14; }
                32% { color: #ffc107; }
                48% { color: #198754; }
                64% { color: #0dcaf0; }
                80% { color: #6f42c1; }
                100% { color: #d63384; }
            }
            
            .animate-in {
                animation: slideInUp 0.8s ease-out;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Функция для создания снегопада из лепестков роз
function createPetalFall() {
    const petals = ['🌸', '🌺', '🌹', '💮'];
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${Math.random() * window.innerWidth}px;
            font-size: ${Math.random() * 20 + 15}px;
            pointer-events: none;
            z-index: 1000;
            animation: petalFall ${Math.random() * 3 + 4}s linear forwards;
            opacity: ${Math.random() * 0.7 + 0.3};
        `;
        
        document.body.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 7000);
    }
    
    // Создаем лепестки каждые 2 секунды
    setInterval(createPetal, 2000);
    
    // Добавляем CSS анимацию для падения лепестков
    if (!document.getElementById('petal-styles')) {
        const style = document.createElement('style');
        style.id = 'petal-styles';
        style.textContent = `
            @keyframes petalFall {
                to {
                    transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Функция для добавления мерцающих огоньков
function addTwinklingLights() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        const light = document.createElement('div');
        light.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #fff 0%, #ffb6c1 100%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 2 + 1}s infinite alternate;
            box-shadow: 0 0 10px #ffb6c1;
        `;
        container.appendChild(light);
    }
}

// Инициализация дополнительных эффектов
setTimeout(() => {
    addSpecialEffects();
    createPetalFall();
    addTwinklingLights();
}, 2000);

// Добавляем обработчик для предотвращения проблем с аудио контекстом
document.addEventListener('click', () => {
    // Первый клик для активации аудио контекста
}, { once: true });