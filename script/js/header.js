document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('#secoes');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Função para alternar o menu
    const toggleMenu = () => {
        const isActive = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Acessibilidade: informa leitores de tela se o menu está aberto
        hamburger.setAttribute('aria-expanded', isActive);
        
        // Opcional: impede o scroll do corpo do site quando menu aberto
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    };

    hamburger.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link (importante para Single Page)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});