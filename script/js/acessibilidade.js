document.addEventListener('focusin', (e) => {
    const el = e.target;

    // 1. Lista de exceções atualizada
    const ignoreScroll = 
        el.classList.contains('skip-link') || 
        el.closest('.main-header') || 
        el.classList.contains('nav-dot') || // Atualizado para a nova classe
        el.closest('.slider') ||            // Evita que qualquer item dentro do slider force scroll
        el.id === 'conteudo-principal';

    if (ignoreScroll) return;

    // 2. Lógica de alvo (Target)
    // Se for um título, foca na section. Se não, no próprio elemento.
    const target = el.tagName === 'H2' ? el.closest('section') : el;

    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});