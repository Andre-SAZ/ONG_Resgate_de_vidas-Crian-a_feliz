const slider = document.querySelector('.slides');
const radios = document.querySelectorAll('input[name="radio-btn"]');
let startX = 0;
let currentIndex = 0;

// Registra onde o usuário encostou o dedo
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

// Registra onde o usuário soltou o dedo e calcula a direção
slider.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    // Sensibilidade: só muda se arrastar mais de 50px
    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Deslizou para a esquerda -> Próximo Slide
            currentIndex = (currentIndex + 1) % radios.length;
        } else {
            // Deslizou para a direita -> Slide Anterior
            currentIndex = (currentIndex - 1 + radios.length) % radios.length;
        }
        
        // Marca o rádio correspondente para disparar a transição CSS
        radios[currentIndex].checked = true;
    }
});

// Sincroniza o índice caso o usuário clique nas bolinhas manualmente
radios.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        currentIndex = index;
    });
});

// Acessibilidade: Permite navegação por teclado nas bolinhas

const manualBtns = document.querySelectorAll('.manual-btn');

manualBtns.forEach((btn, index) => {
    // 1. Muda o slide ao pressionar Enter ou Espaço
    btn.addEventListener('keydown', (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); 
            radios[index].checked = true;
            currentIndex = index; 
        }
    });

    // 2. Muda o slide automaticamente ao navegar com Tab
    btn.addEventListener('focus', () => {
        radios[index].checked = true;
        currentIndex = index;
    });
});