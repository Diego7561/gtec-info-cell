document.addEventListener('DOMContentLoaded', () => {
 
    const ENDPOINT = 'https://script.google.com/macros/s/AKfycbyd2KLPeYGUc1IO1FC-qpqzgWmKiD9bmTP3eUTARtCw_YgVfCfuvnYMNsebeas-lLCrwA/exec';
 
    const lista = document.getElementById('lista');
    const form  = document.getElementById('form');
    const msg   = document.getElementById('msg');
    const btn   = document.getElementById('btn');
 
    if (!lista || !form) return;
 
    function mostrarAvaliacoes(itens) {
        lista.textContent = '';
        if (!itens.length) {
            const p = document.createElement('p');
            p.className = 'vazio';
            p.textContent = 'Seja o primeiro a avaliar!';
            lista.appendChild(p);
            return;
        }
        itens.forEach(a => {
            const c = document.createElement('div'); c.className = 'card';
            const n = document.createElement('div'); n.className = 'nome'; n.textContent = a.nome || 'Cliente';
            const e = document.createElement('div'); e.className = 'estrelas';
            const nota = Math.max(1, Math.min(5, parseInt(a.nota) || 5));
            e.textContent = '★'.repeat(nota) + '☆'.repeat(5 - nota);
            const t = document.createElement('p'); t.textContent = a.comentario || '';
            c.append(n, e, t);
            lista.appendChild(c);
        });
    }
 
    async function carregar() {
        if (ENDPOINT.startsWith('COLE_')) { mostrarAvaliacoes([]); return; }
        try {
            const r = await fetch(ENDPOINT);
            mostrarAvaliacoes(await r.json());
        } catch (err) {
            lista.textContent = '';
            const p = document.createElement('p');
            p.className = 'vazio';
            p.textContent = 'Não foi possível carregar as avaliações agora.';
            lista.appendChild(p);
        }
    }
 
    form.addEventListener('submit', async ev => {
        ev.preventDefault();
        msg.className = 'msg';
 
        const nota = (form.querySelector('input[name=nota]:checked') || {}).value;
        const nome = document.getElementById('nome').value.trim();
        const comentario = document.getElementById('comentario').value.trim();
 
        if (!nota || !nome || !comentario) {
            msg.textContent = 'Escolha as estrelas e preencha nome e comentário.';
            msg.classList.add('erro');
            return;
        }
        if (ENDPOINT.startsWith('COLE_')) {
            msg.textContent = 'Falta configurar a URL do Apps Script.';
            msg.classList.add('erro');
            return;
        }
 
        btn.disabled = true;
        msg.textContent = 'Enviando…';
 
        try {
            await fetch(ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ nota, nome, comentario, site: document.getElementById('site').value })
            });
            form.reset();
            msg.textContent = 'Obrigado pela sua avaliação! Ela aparecerá no site após a aprovação.';
            msg.classList.add('ok');
        } catch (err) {
            msg.textContent = 'Erro ao enviar. Tente novamente em instantes.';
            msg.classList.add('erro');
        } finally {
            btn.disabled = false;
        }
    });
 
    carregar();
});
 