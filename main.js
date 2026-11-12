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
 
  const slides = document.querySelectorAll('.carrossel .slide');
let atual = 0;

if (slides.length > 0) {
    slides[0].classList.add('active');

    setInterval(() => {
        slides[atual].classList.remove('active');
        atual = (atual + 1) % slides.length;
        slides[atual].classList.add('active');
    }, 5000); // troca a cada 5 segundos
}
});
 