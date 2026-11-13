// =====================================================================
//  OS TREINOS DA SEMANA  —  é só este arquivo que muda quando trocar o treino
// ---------------------------------------------------------------------
//  Cada pessoa tem:  nome (aparece no botão), tema ("padrao" ou "rosa")
//  e o treino de cada dia.
//
//  Musculação:  { nome: "Supino reto", series: 3, reps: "8–12" }
//  Cardio:      { nome: "Esteira", tipo: "cardio", meta: "20 min" }
//  Observação (opcional, aparece embaixo do nome):  obs: "pegada aberta"
//  Dia de descanso:  null
//
//  Mesmo treino em dois dias (ex.: seg e sex): crie o treino numa constante
//  e use a mesma constante nos dois dias. Aí os dois dias compartilham o
//  histórico (na sexta, o "último treino" é o de segunda, e vice-versa).
//
//  Atenção: o histórico fica ligado ao NOME do exercício.
//  Se renomear um exercício, ele começa um histórico novo.
//  Os registros de cada pessoa ficam separados.
// =====================================================================

// Nicolas — segunda e sexta (mesmo treino, histórico compartilhado)
const NICOLAS_POSTERIOR_GLUTEO = {
  nome: "Posterior e glúteo",
  itens: [
    { nome: "Cadeira abdutora 45°", series: 2, reps: "12/10", obs: "pico 1″" },
    { nome: "Elevação pélvica unilateral banco", series: 2, reps: "10–12", obs: "pico 1″" },
    { nome: "Elevação pélvica máquina articulada", series: 3, reps: "10–12", obs: "pico 1″" },
    { nome: "Stiff com halteres", series: 2, reps: "10–12" },
    { nome: "Stiff unilateral com halteres", series: 2, reps: "10–12" },
    { nome: "Cadeira flexora", series: 4, reps: "8–12" },
    { nome: "Panturrilha sentado máquina", series: 3, reps: "10–15", obs: "pico 1″" },
  ],
};

const PERFIS = {
  ele: {
    nome: "Nicolas",
    tema: "padrao",
    treino: {
      seg: NICOLAS_POSTERIOR_GLUTEO,
      ter: {
        nome: "Peito",
        itens: [
          { nome: "Crossover polia alta", series: 3, reps: "10–12", obs: "biset ➜ emenda com o supino declinado no crossover" },
          { nome: "Supino declinado no crossover", series: 3, reps: "até a falha (5–8)", obs: "biset ➜ logo após o crossover polia alta" },
          { nome: "Supino declinado articulado neutra", series: 3, reps: "10/8/8" },
          { nome: "Crucifixo máquina", series: 3, reps: "10–12", obs: "pico 2″" },
          { nome: "Supino inclinado hammer", series: 4, reps: "12/10/8/8" },
          { nome: "Elevação lateral máquina", series: 4, reps: "15/12/10/8" },
          { nome: "Desenvolvimento máquina (pegada neutra)", series: 2, reps: "12/10" },
          { nome: "Testa barra V + polia barra V", series: 2, reps: "12/10 + falha", obs: "polia de frente" },
          { nome: "Extensão de tríceps máquina", series: 3, reps: "12/10/8" },
        ],
      },
      qua: {
        nome: "Quadríceps",
        itens: [
          { nome: "Cadeira extensora", series: 3, reps: "10–12" },
          { nome: "Hack machine 45°", series: 3, reps: "10–12" },
          { nome: "Leg press 45° pés afastados", series: 2, reps: "10–15" },
          { nome: "Leg press horizontal unilateral", series: 2, reps: "10–12", obs: "biset ➜ emenda com o recuo unilateral" },
          { nome: "Recuo unilateral peso corporal", series: 2, reps: "10", obs: "biset ➜ logo após o leg press horizontal" },
          { nome: "Panturrilha no hack invertido", series: 3, reps: "10–15", obs: "pico 1″" },
        ],
      },
      qui: {
        nome: "Costas",
        itens: [
          { nome: "Remada cavalinho máquina pronada", series: 4, reps: "15/12/10/8" },
          { nome: "Remada máquina pronada ultra", series: 3, reps: "8–12" },
          { nome: "Remada máquina unilateral neutra", series: 3, reps: "12/10/8" },
          { nome: "Puxada máquina articulada neutra unilateral", series: 2, reps: "10–12" },
        ],
      },
      sex: NICOLAS_POSTERIOR_GLUTEO,
      sab: null,
      dom: null,
    },
  },

  ela: {
    nome: "Sayuri",
    tema: "rosa",
    treino: {
      seg: {
        nome: "Inferior A · Quadríceps",
        itens: [
          { nome: "Agachamento livre", series: 3, reps: "8–10" },
          { nome: "Leg press 45°", series: 3, reps: "10–12" },
          { nome: "Cadeira extensora", series: 3, reps: "10–15" },
          { nome: "Cadeira adutora", series: 2, reps: "12–15" },
          { nome: "Panturrilha em pé", series: 3, reps: "12–15" },
          { nome: "Abdominal reverso", series: 2, reps: "12–15" },
        ],
      },
      ter: {
        nome: "Superior A · Costas, ombros e braços",
        itens: [
          { nome: "Puxada neutra", series: 3, reps: "8–12" },
          { nome: "Remada máquina c/ apoio", series: 3, reps: "8–12" },
          { nome: "Desenvolvimento com halteres", series: 2, reps: "8–12" },
          { nome: "Elevação lateral", series: 3, reps: "12–15" },
          { nome: "Crucifixo inverso", series: 2, reps: "12–15" },
          { nome: "Rosca direta", series: 2, reps: "10–12" },
          { nome: "Tríceps corda", series: 2, reps: "10–15" },
        ],
      },
      qua: {
        nome: "Inferior B · Glúteo completo + posterior",
        itens: [
          { nome: "Elevação pélvica", series: 3, reps: "8–12" },
          { nome: "Stiff", series: 3, reps: "8–10" },
          { nome: "Cadeira flexora", series: 3, reps: "10–12" },
          { nome: "Mesa flexora", series: 2, reps: "12–15" },
          { nome: "Coice na polia", series: 2, reps: "12–15" },
          { nome: "Cadeira abdutora", series: 4, reps: "15–25" },
        ],
      },
      qui: {
        nome: "Superior B · Costas, ombros e braços",
        itens: [
          { nome: "Puxada aberta", series: 3, reps: "8–12" },
          { nome: "Remada aberta", series: 3, reps: "8–12" },
          { nome: "Pullover na polia", series: 2, reps: "12–15" },
          { nome: "Elevação lateral na polia", series: 3, reps: "12–15" },
          { nome: "Face pull", series: 2, reps: "12–15" },
          { nome: "Rosca alternada", series: 2, reps: "10–12" },
          { nome: "Tríceps francês na polia", series: 2, reps: "10–15" },
        ],
      },
      sex: {
        nome: "Inferior C · Quadríceps + posterior + glúteo",
        itens: [
          { nome: "Agachamento hack", series: 3, reps: "8–12" },
          { nome: "Búlgaro", series: 2, reps: "8–10 / perna" },
          { nome: "Elevação pélvica", series: 2, reps: "10–12" },
          { nome: "Cadeira flexora", series: 4, reps: "10–12" },
          { nome: "Cadeira abdutora", series: 4, reps: "15–25" },
          { nome: "Panturrilha sentada", series: 3, reps: "12–15" },
        ],
      },
      sab: null,
      dom: null,
    },
  },
};
