// ============================================================
//  App de treino — lógica (não precisa mexer aqui para trocar o treino)
// ============================================================

const DIAS = [
  { id: "seg", curto: "Seg", nome: "Segunda" },
  { id: "ter", curto: "Ter", nome: "Terça" },
  { id: "qua", curto: "Qua", nome: "Quarta" },
  { id: "qui", curto: "Qui", nome: "Quinta" },
  { id: "sex", curto: "Sex", nome: "Sexta" },
  { id: "sab", curto: "Sáb", nome: "Sábado" },
  { id: "dom", curto: "Dom", nome: "Domingo" },
];

const DIFICULDADES = ["Fácil", "Médio", "Difícil", "Falha"];

const CAMPOS = {
  forca: [
    { k: "reps", rotulo: "Reps", modo: "numeric" },
    { k: "peso", rotulo: "Peso (kg)", modo: "decimal" },
  ],
  cardio: [
    { k: "tempo", rotulo: "Tempo (min)", modo: "decimal" },
    { k: "vel", rotulo: "Vel./nível", modo: "decimal" },
    { k: "incl", rotulo: "Inclinação", modo: "decimal" },
  ],
};

// O que é comparado com o último treino (campo, unidade)
const COMPARACAO = {
  forca: [["peso", " kg"], ["reps", " reps"]],
  cardio: [["tempo", " min"], ["vel", " vel"], ["incl", " incl"]],
};

const CHAVE_PERFIL = "app-treino-perfil";

// Cada pessoa tem os próprios registros, salvos em "app-treino-v1-<perfil>".
// Formato salvo:
// { "ter|Puxada frontal": [ { data: "2026-11-10", series: [ { reps: "12", peso: "55", dif: "Médio" }, ... ] } ] }
let perfilAtual = carregarPerfil();
let dados = carregar();
let diaAtual = idDeHoje();

// ---------------- pessoas (perfis) ----------------

function carregarPerfil() {
  try {
    const p = localStorage.getItem(CHAVE_PERFIL);
    if (p && PERFIS[p]) return p;
  } catch {}
  return Object.keys(PERFIS)[0];
}

function chaveDados() {
  return "app-treino-v1-" + perfilAtual;
}

function trocarPerfil(id) {
  perfilAtual = id;
  try { localStorage.setItem(CHAVE_PERFIL, id); } catch {}
  dados = carregar();
  aplicarPerfil();
  renderDia();
}

function aplicarPerfil() {
  const perfil = PERFIS[perfilAtual];
  document.body.dataset.tema = perfil.tema || "padrao";
  document.getElementById("titulo").textContent = "Treino de " + perfil.nome;
  document.title = "Treino de " + perfil.nome;
  document.querySelector('meta[name="theme-color"]').content = perfil.tema === "rosa" ? "#1c1220" : "#101317";

  const caixa = document.getElementById("perfis");
  caixa.replaceChildren();
  for (const [id, p] of Object.entries(PERFIS)) {
    caixa.append(el("button", {
      class: "perfil" + (id === perfilAtual ? " ativo" : ""),
      type: "button",
      "aria-pressed": String(id === perfilAtual),
      onclick: () => { if (id !== perfilAtual) trocarPerfil(id); },
    }, p.nome));
  }
}

// ---------------- utilidades ----------------

function idDeHoje() {
  return DIAS[(new Date().getDay() + 6) % 7].id; // getDay(): 0 = domingo
}

function dataHoje() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function dataCurta(iso) {
  const [, m, d] = iso.split("-");
  return d + "/" + m;
}

function num(v) {
  if (v == null) return NaN;
  const s = String(v).trim().replace(",", ".");
  return s === "" ? NaN : Number(s);
}

function fmt(n) {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

function el(tag, props = {}, ...filhos) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") e.className = v;
    else if (k === "text") e.textContent = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  for (const f of filhos.flat()) if (f != null) e.append(f);
  return e;
}

// ---------------- salvar / carregar ----------------

function carregar() {
  try {
    const t = localStorage.getItem(chaveDados());
    const d = t ? JSON.parse(t) : {};
    return d && typeof d === "object" && !Array.isArray(d) ? d : {};
  } catch {
    return {};
  }
}

function gravar() {
  try {
    localStorage.setItem(chaveDados(), JSON.stringify(dados));
    avisar("Salvo ✓");
  } catch {
    avisar("Não foi possível salvar neste navegador", true);
  }
}

let timerAviso;
function avisar(msg, erro = false) {
  const s = document.getElementById("status");
  s.textContent = msg;
  s.classList.toggle("erro", erro);
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => (s.textContent = ""), erro ? 5000 : 1500);
}

// Se o mesmo treino é usado em mais de um dia (ex.: seg e sex), todos esses
// dias usam o histórico do primeiro deles.
function chave(item) {
  const treinos = PERFIS[perfilAtual].treino;
  const atual = treinos[diaAtual];
  const diaHistorico = DIAS.find((d) => treinos[d.id] === atual).id;
  return diaHistorico + "|" + item.nome;
}

function ultimoAntesDeHoje(k) {
  const hoje = dataHoje();
  const anteriores = (dados[k] || []).filter((r) => r.data < hoje).sort((a, b) => a.data.localeCompare(b.data));
  return anteriores[anteriores.length - 1] || null;
}

function registroDeHoje(k) {
  return (dados[k] || []).find((r) => r.data === dataHoje()) || null;
}

// Cria ou atualiza o registro de hoje (nunca duplica no mesmo dia)
function salvarRegistro(k, series) {
  const hoje = dataHoje();
  const lista = (dados[k] || []).filter((r) => r.data !== hoje);
  const vazio = series.every((s) => Object.keys(s).length === 0);
  if (!vazio) lista.push({ data: hoje, series });
  if (lista.length) dados[k] = lista;
  else delete dados[k];
  gravar();
}

// ---------------- textos de comparação ----------------

function descrever(tipo, s) {
  const p = [];
  if (tipo === "forca") {
    if (s.reps && s.peso) p.push(`${s.reps} × ${s.peso} kg`);
    else if (s.reps) p.push(`${s.reps} reps`);
    else if (s.peso) p.push(`${s.peso} kg`);
  } else {
    if (s.tempo) p.push(`${s.tempo} min`);
    if (s.vel) p.push(`vel ${s.vel}`);
    if (s.incl) p.push(`incl ${s.incl}`);
  }
  if (s.dif) p.push(s.dif);
  return p.length ? p.join(" · ") : "—";
}

function comparar(tipo, atual, anterior, badge) {
  const partes = [];
  let subiu = 0, caiu = 0, comparou = false;
  for (const [k, unidade] of COMPARACAO[tipo]) {
    const a = num(anterior && anterior[k]);
    const c = num(atual[k]);
    if (isNaN(a) || isNaN(c)) continue;
    comparou = true;
    const d = Math.round((c - a) * 100) / 100;
    if (d > 0) { subiu++; partes.push("▲ +" + fmt(d) + unidade); }
    if (d < 0) { caiu++; partes.push("▼ −" + fmt(-d) + unidade); }
  }
  if (!comparou) {
    badge.textContent = "";
    badge.className = "badge";
  } else if (!partes.length) {
    badge.textContent = "= igual";
    badge.className = "badge eq";
  } else {
    badge.textContent = partes.join("  ");
    badge.className = "badge " + (subiu && caiu ? "mix" : subiu ? "up" : "down");
  }
}

// ---------------- tela ----------------

function renderAbas() {
  const nav = document.getElementById("abas");
  nav.replaceChildren();
  const hoje = idDeHoje();
  for (const d of DIAS) {
    const classes = "aba" + (d.id === diaAtual ? " ativa" : "") + (d.id === hoje ? " hoje" : "");
    nav.append(
      el("button", {
        class: classes,
        type: "button",
        "aria-pressed": String(d.id === diaAtual),
        title: d.nome + (d.id === hoje ? " (hoje)" : ""),
        onclick: () => { diaAtual = d.id; renderAbas(); renderDia(); },
      }, d.curto)
    );
  }
}

function renderDia() {
  const main = document.getElementById("treino");
  main.replaceChildren();
  const dia = DIAS.find((d) => d.id === diaAtual);
  const treino = PERFIS[perfilAtual].treino[diaAtual];

  if (!treino || !treino.itens || !treino.itens.length) {
    main.append(el("div", { class: "descanso" },
      el("h2", { class: "titulo-dia", text: dia.nome }),
      el("p", { text: "Dia de descanso." })
    ));
    return;
  }

  main.append(el("h2", { class: "titulo-dia", text: treino.nome || dia.nome }));
  for (const item of treino.itens) main.append(cartao(item));
  window.scrollTo(0, 0);
}

function cartao(item) {
  const tipo = item.tipo === "cardio" ? "cardio" : "forca";
  const campos = CAMPOS[tipo];
  const k = chave(item);
  const ultimo = ultimoAntesDeHoje(k);
  const atual = registroDeHoje(k);
  const nSeries = tipo === "cardio" ? 1 : item.series || 3;

  const meta = tipo === "cardio"
    ? "cardio" + (item.meta ? " · " + item.meta : "")
    : nSeries + " × " + (item.reps || "?");

  const card = el("section", { class: "cartao " + tipo },
    el("div", { class: "cab" }, el("h3", { text: item.nome }), el("span", { class: "meta", text: meta })),
    item.obs ? el("p", { class: "obs", text: item.obs }) : null,
    el("p", { class: "ultima-data", text: ultimo ? "último treino: " + dataCurta(ultimo.data) : "primeira vez: ainda sem registro anterior" })
  );

  // cabeçalho das colunas
  const cabecalho = el("div", { class: "grade " + tipo });
  if (tipo === "forca") cabecalho.append(el("span"));
  for (const c of campos) cabecalho.append(el("span", { class: "rotulo", text: c.rotulo }));
  cabecalho.append(el("span", { class: "rotulo", text: "Dificuldade" }));
  card.append(cabecalho);

  const linhas = [];
  for (let i = 0; i < nSeries; i++) {
    const ant = (ultimo && ultimo.series[i]) || null;
    const cur = (atual && atual.series[i]) || {};
    const sufixo = tipo === "forca" ? " S" + (i + 1) : "";
    const linha = el("div", { class: "grade " + tipo });
    if (tipo === "forca") linha.append(el("span", { class: "serie", text: "S" + (i + 1) }));

    const campo = {};
    for (const c of campos) {
      const inp = el("input", {
        type: "text",
        inputmode: c.modo,
        autocomplete: "off",
        "aria-label": c.rotulo + sufixo,
        placeholder: (ant && ant[c.k]) || "",
      });
      inp.value = cur[c.k] || "";
      campo[c.k] = inp;
      linha.append(inp);
    }

    const sel = el("select", { "aria-label": "Dificuldade" + sufixo },
      el("option", { value: "" }, "—"),
      DIFICULDADES.map((d) => el("option", { value: d }, d))
    );
    sel.value = cur.dif || "";
    sel.dataset.dif = sel.value;
    campo.dif = sel;
    linha.append(sel);

    const badge = el("span", { class: "badge" });
    card.append(linha, el("div", { class: "info" },
      el("span", { text: ant ? "último: " + descrever(tipo, ant) : "" }),
      badge
    ));
    linhas.push({ campo, ant, badge });
  }

  const lerSeries = () => linhas.map((l) => {
    const s = {};
    for (const [kk, inp] of Object.entries(l.campo)) {
      const v = inp.value.trim();
      if (v) s[kk] = v;
    }
    return s;
  });

  const atualizarComparacoes = (series) => linhas.forEach((l, i) => {
    l.campo.dif.dataset.dif = l.campo.dif.value;
    comparar(tipo, series[i], l.ant, l.badge);
  });

  atualizarComparacoes(lerSeries());

  // salva automaticamente a cada alteração
  card.addEventListener("input", () => {
    const series = lerSeries();
    atualizarComparacoes(series);
    salvarRegistro(k, series);
  });

  return card;
}

// ---------------- backup ----------------

document.getElementById("btn-backup").addEventListener("click", () => {
  const nome = PERFIS[perfilAtual].nome;
  const conteudo = JSON.stringify({ app: "app-treino", versao: 1, perfil: nome, exportadoEm: new Date().toISOString(), dados }, null, 2);
  const url = URL.createObjectURL(new Blob([conteudo], { type: "application/json" }));
  const arquivoNome = nome.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
  const a = el("a", { href: url, download: `treino-${arquivoNome}-backup-${dataHoje()}.json` });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  avisar("Backup baixado ✓");
});

document.getElementById("arquivo").addEventListener("change", async (e) => {
  const arquivo = e.target.files[0];
  e.target.value = "";
  if (!arquivo) return;
  try {
    const json = JSON.parse(await arquivo.text());
    const novo = json && json.dados ? json.dados : json;
    if (!novo || typeof novo !== "object" || Array.isArray(novo)) throw new Error("formato");
    const nome = PERFIS[perfilAtual].nome;
    const origem = json && json.perfil ? ` (backup de ${json.perfil})` : "";
    if (!confirm(`Restaurar este backup${origem} no treino de ${nome}? Os registros atuais de ${nome} neste aparelho serão substituídos.`)) return;
    dados = novo;
    gravar();
    renderDia();
    avisar("Backup restaurado ✓");
  } catch {
    avisar("Arquivo de backup inválido", true);
  }
});

// ---------------- início ----------------

document.getElementById("data-hoje").textContent =
  "hoje: " + DIAS.find((d) => d.id === idDeHoje()).nome.toLowerCase() + ", " + dataCurta(dataHoje());

aplicarPerfil();
renderAbas();
renderDia();
