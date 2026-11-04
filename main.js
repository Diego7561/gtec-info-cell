document.addEventListener('DOMContentLoaded', () => {
 
    /* ---------- MENU MOBILE ---------- */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
 
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const aberto = navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            mobileToggle.textContent = aberto ? '✕' : '☰';
        });
 
        // fecha o menu ao clicar em um link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });
    }
 
    /* ---------- ROLAGEM SUAVE ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length < 2) return;
 
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
 
    /* ---------- CARROSSEL AUTOMÁTICO ---------- */
    const slides = document.querySelector('.carrossel .slides');
    const total = document.querySelectorAll('.carrossel .slide').length;
 
    if (slides && total > 1) {
        let atual = 0;
 
        setInterval(() => {
            atual = (atual + 1) % total;
            slides.style.transform = `translateX(-${atual * 100}%)`;
        }, 3000); // troca a cada 3 segundos (valor em milissegundos)
    }
});
 