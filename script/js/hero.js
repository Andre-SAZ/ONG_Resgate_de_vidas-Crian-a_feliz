const wrapper = document.querySelector('.slides-wrapper');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');
let currentIndex = 0;
let autoPlayTimer;

// Função principal de movimento
function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentIndex = index;
    
    // Move o slider usando Transform (Mais rápido)
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Atualiza as bolinhas
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Navegação por cliques nas bolinhas
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoPlay();
    });
    
    // Muda o slide ao focar com Tab (Acessibilidade)
    dot.addEventListener('focus', () => goToSlide(index));
});

// Lógica de Touch (Swipe)
let startX = 0;
wrapper.addEventListener('touchstart', e => startX = e.touches[0].clientX, {passive: true});

wrapper.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) { // Sensibilidade de 50px
        diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
        resetAutoPlay();
    }
}, {passive: true});

// Auto-play Inteligente
function startAutoPlay() {
    autoPlayTimer = setInterval(() => goToSlide(currentIndex + 1), 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
}

// Para o auto-play se o usuário estiver interagindo
wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
wrapper.addEventListener('mouseleave', startAutoPlay);

startAutoPlay(); // Inicia o carrossel