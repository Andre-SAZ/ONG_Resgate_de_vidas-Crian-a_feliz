/* ==========================================================================
   1. ACESSIBILIDADE E CONTROLE DE FOCO
   ========================================================================== */
document.addEventListener('focusin', (e) => {
    const el = e.target;

    // Filtra elementos que NÃO devem disparar o scroll automático
    const ignoreScroll = 
        el.classList.contains('skip-link') || 
        el.closest('.main-header') || 
        el.classList.contains('nav-dot') || 
        el.closest('.slider') ||            // Se estiver no slider, o JS do slider cuida disso
        el.closest('.galeria-slider') ||    // Proteção extra para galeria
        el.id === 'conteudo-principal';

    if (ignoreScroll) return;

    // Se focar no título (H2), move a seção inteira. Caso contrário, o próprio elemento.
    const target = el.tagName === 'H2' ? el.closest('section') : el;

    if (target) {
        // block: 'start' alinha o topo do elemento com o topo da viewport
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

/* ==========================================================================
   2. HEADER & MENU HAMBÚRGUER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('#secoes');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (!hamburger || !navMenu) return;

    const toggleMenu = () => {
        const isActive = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        hamburger.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    };

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});

/* ==========================================================================
   3. MECÂNICA DOS CARDS (FLIP - CLIQUE, ENTER E ESPAÇO)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.atividade-item');

    cards.forEach(card => {
        // Função para girar
        const toggleFlip = () => card.classList.toggle('flipped');

        // Gira ao clicar
        card.addEventListener('click', toggleFlip);

        // Gira ao apertar Enter ou Espaço (Acessibilidade)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Evita o scroll da página ao apertar espaço
                toggleFlip();
            }
        });
    });
});

/* ==========================================================================
   4. SLIDER (HERO E GENÉRICO)
   ========================================================================== */
// Usando uma função para não dar erro caso existam múltiplos ou nenhum slider
function initHeroSlider() {
    const wrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    
    if (!wrapper || slides.length === 0) return;

    let currentIndex = 0;
    let autoPlayTimer;

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;
        
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
        
        // Muda o slide ao focar com Tab SEM causar o pulo do navegador
        dot.addEventListener('focus', () => {
            goToSlide(index);
        });
    });

    // Touch / Swipe
    let startX = 0;
    wrapper.addEventListener('touchstart', e => startX = e.touches[0].clientX, {passive: true});
    wrapper.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
            resetAutoPlay();
        }
    }, {passive: true});

    // Auto-play
    function startAutoPlay() {
        autoPlayTimer = setInterval(() => goToSlide(currentIndex + 1), 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    wrapper.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
}

// Inicia o slider após o carregamento
document.addEventListener('DOMContentLoaded', initHeroSlider);