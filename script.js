const form = document.getElementById('curriculoForm');
const mensagem = document.getElementById('mensagem');



form.addEventListener('submit', function (e) {
  // Cole o seu webhook do Discord aqui:
  const WEBHOOK_URL = "https://pm-curriculo-rp.vercel.app/api/sendWebhook";
  const link = "https://pm-curriculo-rp.vercel.app"
  
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const apelido = document.getElementById('apelido').value;
  const nascimento = document.getElementById('nascimento').value;
  const experiencia = document.getElementById('experiencia').value;
  const subdivisao = document.getElementById('subdivisao').value || "Não informado";
  const cidades = document.getElementById('cidades').value;
  const personagem = document.getElementById('personagem').value;
  const motivacao = document.getElementById('motivacao').value;
  const termos = document.getElementById('termos').checked;

  if (!termos) {
    mensagem.textContent = "❌ Você precisa aceitar os termos de uso.";
    return;
  }

  const payload = {
    username: "Currículo RP",
    embeds: [
      {
        title: "📋 Novo Currículo Recebido",
        color: 3447003,
        fields: [
          { name: "👤 Nome", value: nome },
          { name: "🏷️ Apelido na cidade", value: apelido },
          { name: "🎂 Data de nascimento", value: nascimento },
          { name: "👮‍♂️ Experiência", value: experiencia },
          { name: "🔰 Subdivisão", value: subdivisao },
          { name: "🌆 Cidades", value: cidades },
          { name: "🎭 Personagem", value: personagem },
          { name: "📝 Motivação", value: motivacao }
        ],
        footer: {
          text: "Currículo enviado via site"
        },
        url: [
          {link}
        ],
        timestamp: new Date()
      }
    ]
  };

  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      mensagem.textContent = "✅ Currículo enviado com sucesso!";
      form.reset();
    } else {
      mensagem.textContent = "❌ Erro ao enviar o currículo.";
    }
  })
  .catch(error => {
    console.error("Erro:", error);
    mensagem.textContent = "❌ Erro de rede.";
  });
});
 
