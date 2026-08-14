const systems = [
  {category:"Espaços e agenda",name:"Reservas INOVALAB",description:"Consulta de disponibilidade e solicitação de reserva dos espaços do INOVALAB.",features:["Agenda por espaço","Reserva por data e horário","Acesso pelo celular ou computador"],audience:"Servidores docentes que desejam reservar os espaços do INOVALAB.",url:"https://reservas-inovalab.rogerio-bittencourt.chatgpt.site"},
  {category:"Espaços e agenda",name:"Agenda INOVALAB",description:"Visão consolidada da programação e dos indicadores de uso dos ambientes.",features:["Acompanhamento diário e mensal","Indicadores de ocupação","Consulta rápida de horários"],audience:"Servidores que atuam no INOVALAB e na gestão do INOVALAB.",url:"https://agenda-inovalab.rogerio-bittencourt.chatgpt.site"},
  {category:"Espaços e agenda",name:"Ocupação de Salas",description:"Painel para consultar salas ocupadas, livres ou com atividade próxima.",features:["Situação atual por sala","Próximas atividades","Leitura em monitores e celulares"],audience:"Servidores que atuam no INOVALAB e na gestão do INOVALAB.",url:"https://ocupacao-salas-inovalab.rogerio-bittencourt.chatgpt.site"},
  {category:"Atendimento e documentos",name:"Termos de Autorização",description:"Geração orientada de termos de autorização utilizados nas atividades do laboratório.",features:["Preenchimento padronizado","Geração do documento final","Redução de erros e retrabalho"],audience:"Equipe responsável pela operação do INOVALAB e Coordenação do INOVALAB.",url:"https://termos-autorizacao-inovalab.rogerio-bittencourt.chatgpt.site"},
  {category:"Equipamentos e patrimônio",name:"Portal de Movimentação",description:"Registra empréstimos e devoluções de equipamentos, acessórios e kits.",features:["Termos e comprovantes automáticos","Controle individual","Fotos, checklist e auditoria"],audience:"Equipe responsável pela operação do INOVALAB e Coordenação do INOVALAB.",url:"https://portal-movimentacao-inovalab.rogerio-bittencourt.chatgpt.site"},
  {category:"Equipamentos e patrimônio",name:"Mapa de Armários",description:"Localiza rapidamente equipamentos por ambiente, armário e prateleira.",features:["Busca por nome ou código","Posição física detalhada","Consulta de disponibilidade"],audience:"Equipe responsável pela operação do INOVALAB e Coordenação do INOVALAB.",url:"https://mapa-armarios-inovalab.rogerio-bittencourt.chatgpt.site"},
  {category:"Equipamentos e patrimônio",name:"Gerador de Etiquetas",description:"Cria etiquetas padronizadas com identificação e QR Code para o acervo.",features:["Modelos prontos para impressão","QR Code ligado ao item","Geração em lote"],audience:"Equipe responsável pela operação do INOVALAB e Coordenação do INOVALAB.",url:"https://gerador-etiquetas-inovalab.rogerio-bittencourt.chatgpt.site"},
  {category:"Equipamentos e patrimônio",name:"QRCode para Inventário",description:"Lê etiquetas para consultar itens, iniciar movimentações e registrar ocorrências.",features:["Consulta e localização","Registro rápido de problemas","Checklist de salas com data e horário"],audience:"Equipe responsável pela operação do INOVALAB e Coordenação do INOVALAB.",url:"https://qrcode-inventario-inovalab.rogerio-bittencourt.chatgpt.site"},
  {category:"Inventário e controle",name:"Patrimônio Fácil",description:"Realiza levantamentos patrimoniais por câmera e voz diretamente no celular.",features:["Leitura ágil de patrimônio","Organização por localização","Inventários presenciais"],audience:"Equipe responsável pela operação do INOVALAB e Coordenação do INOVALAB.",url:"https://patrimonio-facil-app.rogerio-bittencourt.chatgpt.site"},
  {category:"Inventário e controle",name:"Conciliação de Inventário",description:"Compara o cadastro oficial do INOVALAB com as leituras realizadas em campo.",features:["Itens existentes","Ausências e divergências","Comparação por localização"],audience:"Equipe responsável pela operação do INOVALAB e Coordenação do INOVALAB.",url:"https://dashboard-academico-if.rogerio-bittencourt.chatgpt.site"},
  {category:"Gestão e indicadores",name:"Saúde do Patrimônio",description:"Indicadores sobre disponibilidade, manutenção e qualidade cadastral do acervo.",features:["Situação patrimonial","Sinalização de pontos críticos","Priorização de ações"],audience:"Equipe responsável pela operação do INOVALAB e Coordenação do INOVALAB.",url:"https://saude-patrimonio-inovalab.rogerio-bittencourt.chatgpt.site"},
  {category:"Gestão e indicadores",name:"Relatórios INOVALAB",description:"Gera relatórios operacionais e gerenciais sobre as atividades do laboratório.",features:["Relatórios por período","Resumo gerencial mensal","Reservas, patrimônio e manutenção"],audience:"Equipe responsável pela operação do INOVALAB e Coordenação do INOVALAB.",url:"https://relatorios-inovalab.rogerio-bittencourt.chatgpt.site"},
  {category:"Gestão e indicadores",name:"Central de Gestão INOVALAB",description:"Reúne indicadores operacionais, alertas e pendências para apoiar decisões.",features:["Painel consolidado","Alertas e pendências","Atalhos para sistemas especializados"],audience:"Equipe responsável pela operação do INOVALAB e Coordenação do INOVALAB.",url:"https://portal-operacional-inovalab.rogerio-bittencourt.chatgpt.site"}
];

const categories = ["Todos", ...new Set(systems.map(system => system.category))];
const grid = document.querySelector("#systems");
const search = document.querySelector("#search");
const filters = document.querySelector("#filters");
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty");
let activeCategory = "Todos";

filters.innerHTML = categories.map((category, index) => `<button type="button" class="${index === 0 ? "active" : ""}" data-category="${category}">${category}</button>`).join("");

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function render() {
  const term = normalize(search.value.trim());
  const visible = systems.filter(system => {
    const matchesCategory = activeCategory === "Todos" || system.category === activeCategory;
    const haystack = normalize([system.name, system.category, system.description, system.audience, ...system.features].join(" "));
    return matchesCategory && (!term || haystack.includes(term));
  });

  count.textContent = `${visible.length} ${visible.length === 1 ? "serviço encontrado" : "serviços encontrados"}`;
  empty.hidden = visible.length !== 0;
  grid.innerHTML = visible.map(system => {
    const number = String(systems.indexOf(system) + 1).padStart(2, "0");
    return `<article class="system-card">
      <span class="index">${number}</span>
      <div>
        <span class="category">${system.category}</span>
        <h2>${system.name}</h2>
        <p class="description">${system.description}</p>
        <ul class="features">${system.features.map(feature => `<li>${feature}</li>`).join("")}</ul>
        <p class="audience"><strong>Público:</strong> ${system.audience}</p>
      </div>
      <a class="open" href="${system.url}" target="_blank" rel="noreferrer" aria-label="Abrir ${system.name}">Abrir sistema <span>↗</span></a>
    </article>`;
  }).join("");
}

filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  filters.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button));
  render();
});
search.addEventListener("input", render);
render();
