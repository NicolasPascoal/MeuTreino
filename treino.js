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
//  Atenção: o histórico fica ligado ao NOME do exercício naquele dia.
//  Se renomear um exercício, ele começa um histórico novo.
//  Os registros de cada pessoa ficam separados.
// =====================================================================

// TREINOS DE EXEMPLO — serão trocados pelos de vocês
const PERFIS = {
  ele: {
    nome: "Nicolas",
    tema: "padrao",
    treino: {
      seg: {
        nome: "Treino A · Peito e tríceps",
        itens: [
          { nome: "Supino reto", series: 3, reps: "8–12" },
          { nome: "Supino inclinado com halteres", series: 3, reps: "10–12" },
          { nome: "Crucifixo na máquina", series: 3, reps: "12" },
          { nome: "Tríceps corda", series: 4, reps: "10–12" },
          { nome: "Esteira", tipo: "cardio", meta: "20 min" },
        ],
      },
      ter: {
        nome: "Treino B · Costas e bíceps",
        itens: [
          { nome: "Puxada frontal", series: 3, reps: "8–12" },
          { nome: "Remada baixa", series: 3, reps: "10–12" },
          { nome: "Rosca direta", series: 3, reps: "10–12" },
          { nome: "Rosca martelo", series: 3, reps: "12" },
          { nome: "Esteira", tipo: "cardio", meta: "20 min" },
        ],
      },
      qua: {
        nome: "Treino C · Pernas",
        itens: [
          { nome: "Agachamento livre", series: 4, reps: "8–10" },
          { nome: "Leg press", series: 3, reps: "10–12" },
          { nome: "Cadeira extensora", series: 3, reps: "12" },
          { nome: "Mesa flexora", series: 3, reps: "12" },
          { nome: "Bike", tipo: "cardio", meta: "15 min" },
        ],
      },
      qui: {
        nome: "Treino D · Ombros e abdômen",
        itens: [
          { nome: "Desenvolvimento com halteres", series: 3, reps: "8–12" },
          { nome: "Elevação lateral", series: 3, reps: "12–15" },
          { nome: "Abdominal na máquina", series: 3, reps: "15" },
          { nome: "Esteira", tipo: "cardio", meta: "25 min", obs: "caminhada inclinada" },
        ],
      },
      sex: {
        nome: "Treino E · Cardio",
        itens: [
          { nome: "Esteira", tipo: "cardio", meta: "30 min" },
          { nome: "Escada", tipo: "cardio", meta: "10 min" },
        ],
      },
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
