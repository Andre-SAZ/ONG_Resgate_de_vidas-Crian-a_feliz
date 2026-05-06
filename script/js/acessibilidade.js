document.addEventListener('focusin', (e) => {
    const el = e.target;

    // Filtra elementos que não devem disparar o scroll automático
    const ignoreScroll = 
        el.classList.contains('skip-link') || 
        el.closest('.main-header') || 
        el.classList.contains('manual-btn') || 
        el.id === 'conteudo-principal';

    if (ignoreScroll) return;

    // Se focar no título (H2), move a seção inteira para a tela. 
    // Caso contrário, move o próprio elemento.
    const target = el.tagName === 'H2' ? el.closest('section') : el;

    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});