// para a divisao de sobre, projetos e contato (header)
const links = document.querySelectorAll('header nav a');
const secoes = document.querySelectorAll('main section');

links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const idSecao = link.getAttribute('href').substring(1);

    secoes.forEach(secao => {
      if (secao.id === idSecao) {
        secao.style.display = 'block';
      } else {
        secao.style.display = 'none';
      }
    });
  });
});

// para o formulario
const form = document.getElementById('formContato');
const msgStatus = document.getElementById('msgStatus');

window.addEventListener('DOMContentLoaded', () => {
  secoes.forEach((secao, index) => {
    secao.style.display = index === 0 ? 'block' : 'none';
  });
});

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (nome && email && mensagem) {
        msgStatus.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;
        msgStatus.style.color = 'green';
      } else {
        msgStatus.textContent = 'Por favor, preencha todos os campos.';
        msgStatus.style.color = 'red';
      }
    });