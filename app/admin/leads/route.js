// Painel AO VIVO de leads — protegido por chave (?key=...).
// WhatsApp com mensagem pronta + etiqueta por dropdown + exclusão reversível.

import { planoDeContato } from "@/lib/gatilhos";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const EXPORT_KEY = process.env.LEADS_EXPORT_KEY;

const SDR_NOME = "Bebeto";

const ETAPAS = {
  parcial_whatsapp: ["📱 Parcial", "#FFF3D6"],
  completo: ["✅ Quiz completo", "#DDF3DF"],
  chegou_checkout: ["🔥 CHEGOU NO CHECKOUT", "#FFD6D6"],
};

// valor: [rótulo, fundo, texto] — cada etiqueta é uma fase do funil.
const STATUS = {
  novo:          ["🆕 A contatar",        "#EFE7DF", "#6B615A"],
  contatado:     ["✅ 1º contato feito",   "#E3F1E6", "#256B33"],
  follow_1:      ["🔁 Follow-up 1",       "#FFF6E0", "#8A6A1F"],
  follow_2:      ["🔁 Follow-up 2",       "#FFF0CF", "#8A6A1F"],
  follow_3:      ["🔁 Follow-up 3 · áudio","#FFE9BC", "#7A5C15"],
  follow_4:      ["🔁 Follow-up 4",       "#FFE2A8", "#7A5C15"],
  follow_5:      ["🔁 Follow-up 5 · última","#FFD894","#6E5210"],
  conversando:   ["💬 Conversando",       "#E3E8FF", "#33459B"],
  comprou:       ["💰 COMPROU",           "#D8F0DD", "#166534"],
  sem_interesse: ["✖️ Sem interesse",      "#EEE9E4", "#8A8078"],
  excluido:      ["🗑️ Excluído",           "#F6E4E4", "#9B4444"],
};
const ORDEM = ["novo","contatado","follow_1","follow_2","follow_3","follow_4","follow_5",
               "conversando","comprou","sem_interesse","excluido"];

// Qual mensagem o botão do WhatsApp carrega em cada etiqueta.
// [grupo do plano, índice] — grupo "escada" é a trilha fria.
const MSG_DA_ETIQUETA = {
  novo:          ["escada", 0],
  contatado:     ["escada", 2],
  follow_1:      ["escada", 3],
  follow_2:      ["escada", 4],
  follow_3:      ["escada", 5],
  follow_4:      ["escada", 6],
  follow_5:      ["escada", 7],
  conversando:   ["conversando", 0],
  comprou:       ["comprou", 0],
  sem_interesse: ["sem_interesse", 0],
  excluido:      null,
};
// Clicar no WhatsApp avança sozinho na trilha fria.
const PROXIMA_FASE = {
  novo: "contatado", contatado: "follow_1", follow_1: "follow_2",
  follow_2: "follow_3", follow_3: "follow_4", follow_4: "follow_5",
};

const PERFIS = { A:"Gestante Ansiosa", B:"Gestante Defensora", C:"Gestante Confusa", D:"Quase Pronta" };

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;",
  }[c]));
}

export async function GET(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const verExcluidos = url.searchParams.get("excluidos") === "1";
  if (!EXPORT_KEY || key !== EXPORT_KEY) {
    return new Response("unauthorized", { status: 401 });
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/export_quiz_leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify({ secret_key: key }),
    cache: "no-store",
  });
  let leads = res.ok ? await res.json() : [];
  leads.reverse();

  // uma linha por gestante: fica o registro mais avançado/recente
  const porTel = new Map();
  const peso = { chegou_checkout: 3, completo: 2, parcial_whatsapp: 1 };
  leads.forEach((l) => {
    const tel = String(l.whatsapp || "").replace(/\D/g, "");
    if (!tel) return;
    const atual = porTel.get(tel);
    const p = peso[l.respostas?.etapa] || 2;
    if (!atual || p > (peso[atual.respostas?.etapa] || 2)) {
      porTel.set(tel, { ...l, _etapaPeso: p, _email: l.email || atual?._email || "" });
    } else if (!atual._email && l.email) {
      atual._email = l.email;
    }
  });
  let lista = [...porTel.values()];

  const totais = {}; ORDEM.forEach((k) => (totais[k] = 0));
  lista.forEach((l) => { const s = l.status || "novo"; if (totais[s] !== undefined) totais[s]++; });
  const emFollow = totais.follow_1 + totais.follow_2 + totais.follow_3 + totais.follow_4 + totais.follow_5;

  const excluidosQtd = totais.excluido;
  if (!verExcluidos) lista = lista.filter((l) => (l.status || "novo") !== "excluido");

  const rows = lista.map((l) => {
    const tel = String(l.whatsapp || "").replace(/\D/g, "");
    const plano = planoDeContato(l, SDR_NOME);
    const dt = l.created_at
      ? new Date(l.created_at).toLocaleString("pt-BR", { timeZone:"America/Sao_Paulo", day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit" })
      : "";
    const et = ETAPAS[l.respostas?.etapa] || ETAPAS.completo;
    const st = l.status || "novo";
    const cor = STATUS[st] || STATUS.novo;
    const opcoes = ORDEM.map((v) =>
      `<option value="${v}"${v === st ? " selected" : ""}>${STATUS[v][0]}</option>`).join("");

    return `<tr data-tel="${esc(tel)}" class="st-${st}">
      <td><strong>${esc(l.nome)}</strong><br/><span class="etapa" style="background:${et[1]}">${et[0]}</span></td>
      <td>${esc(l.whatsapp)}${l._email ? `<br/><span class="mail">${esc(l._email)}</span>` : ""}</td>
      <td><span class="perfil p${esc(l.perfil)}">${esc(l.perfil)} · ${esc(PERFIS[l.perfil] || "")}</span></td>
      <td><select class="sel" style="background:${cor[1]};color:${cor[2]}">${opcoes}</select></td>
      <td class="dt">${esc(dt)}<br/><span class="mini">${esc(l.utms?.utm_source || "")}</span></td>
      <td class="acoes" data-nome="${esc(l.nome)}" data-plano="${esc(JSON.stringify(plano))}">
        <a class="wa" href="#" target="_blank" rel="noopener">WhatsApp →</a>
        <div class="prox"></div>
        <button class="cp" type="button">copiar msg</button>
        <button class="gt" type="button">🎯 todas as fases</button>
      </td>
    </tr>`;
  }).join("");

  const html = `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex,nofollow"/>
<title>Leads ao vivo — Parto Sem Medo</title>
<style>
  *{box-sizing:border-box}
  body{font-family:system-ui,-apple-system,sans-serif;background:#FAF5F0;color:#2B2B2B;margin:0;padding:24px}
  h1{font-size:20px;margin:0 0 4px}
  .sub{color:#888;font-size:13px;margin-bottom:14px}
  .count{display:inline-block;background:#F08080;color:#fff;border-radius:999px;padding:2px 12px;font-weight:700}
  .kpis{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px}
  .kpi{background:#fff;border:1px solid #f0e8e0;border-radius:12px;padding:8px 14px;font-size:12.5px}
  .kpi b{display:block;font-size:19px;font-variant-numeric:tabular-nums}
  table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.05)}
  th,td{text-align:left;padding:10px 14px;font-size:14px;border-bottom:1px solid #f0e8e0;vertical-align:top}
  th{background:#fff5f0;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#a66}
  .perfil{border-radius:999px;padding:2px 10px;font-size:12px;font-weight:600;background:#eee}
  .etapa{border-radius:999px;padding:1px 8px;font-size:11px;font-weight:600;color:#333}
  .pA{background:#FFE8CC}.pB{background:#FFD6D6}.pC{background:#E3E8FF}.pD{background:#DDF3DF}
  .sel{border:1px solid #e3d3c8;border-radius:999px;padding:5px 10px;font:700 12px system-ui;cursor:pointer;outline:none;min-width:150px}
  .sel:focus{box-shadow:0 0 0 3px rgba(240,128,128,.25)}
  .wa{color:#1BA05B;font-weight:700;text-decoration:none;font-size:14px;display:inline-block}
  .cp{display:block;margin-top:6px;font:600 11px system-ui;color:#a66;background:transparent;border:1px solid #e3d3c8;border-radius:999px;padding:2px 9px;cursor:pointer}
  .cp:hover{background:#a66;color:#fff}
  .prox{font:600 10.5px system-ui;color:#8a7f77;margin:3px 0 5px;max-width:190px;line-height:1.35}
  .gt{display:block;margin-top:5px;font:700 11px system-ui;color:#fff;background:#D96562;border:none;border-radius:999px;padding:3px 10px;cursor:pointer}
  .gt:hover{background:#c04f4c}
  .dt{white-space:nowrap;color:#777;font-size:12px}
  .ov{position:fixed;inset:0;background:rgba(20,12,8,.55);display:none;z-index:50}
  .ov.on{display:block}
  .dw{position:fixed;top:0;right:0;bottom:0;width:min(560px,100%);background:#FAF5F0;overflow-y:auto;padding:22px;box-shadow:-8px 0 40px rgba(0,0,0,.2)}
  .dw h2{font-size:17px;margin:0 0 2px}
  .dw .lead{color:#8a7f77;font-size:12.5px;margin-bottom:16px}
  .gcard{background:#fff;border:1px solid #f0e4da;border-radius:14px;padding:14px;margin-bottom:12px}
  .gwhen{font:700 11px system-ui;color:#D96562;text-transform:uppercase;letter-spacing:.05em}
  .gmec{font:700 13.5px system-ui;margin:3px 0 5px}
  .gpor{font-size:12px;color:#7d726a;line-height:1.5;margin-bottom:10px;border-left:3px solid #f0d8d0;padding-left:9px}
  .gtxt{background:#F6F1EC;border-radius:10px;padding:11px;font-size:13.5px;line-height:1.55;white-space:pre-wrap}
  .gsec{font:700 12px system-ui;color:#8a7f77;text-transform:uppercase;letter-spacing:.06em;margin:18px 0 8px}
  .gcard.agora{border:2px solid #D96562;box-shadow:0 4px 18px rgba(217,101,98,.18)}
  .gnow{font:700 10.5px system-ui;color:#D96562;margin-bottom:6px}
  .gcopy{margin-top:8px;font:700 11.5px system-ui;color:#fff;background:#1BA05B;border:none;border-radius:999px;padding:5px 13px;cursor:pointer}
  .dwx{position:sticky;top:0;float:right;font:700 20px system-ui;background:none;border:none;cursor:pointer;color:#a99}
  .mini{color:#aaa;font-size:11px}
  .mail{color:#999;font-size:11.5px}
  tr.st-comprou{background:#F5FBF6}
  tr.st-excluido{opacity:.55}
  .toggle{font-size:12.5px;color:#a66;text-decoration:none;border:1px solid #e3d3c8;border-radius:999px;padding:5px 12px;background:#fff}
  .salvo{position:fixed;right:18px;bottom:18px;background:#166534;color:#fff;font:600 13px system-ui;padding:9px 16px;border-radius:999px;opacity:0;transition:opacity .25s;pointer-events:none}
  .salvo.on{opacity:1}
  @media(max-width:900px){th:nth-child(5),td:nth-child(5){display:none}}

  /* Celular: a tabela vira cartões. Sem isso, o dropdown e os botões
     ficam fora da tela e o painel não serve pra trabalhar no telefone. */
  @media(max-width:760px){
    body{padding:12px}
    h1{font-size:17px}
    table{box-shadow:none;background:transparent}
    thead{display:none}
    tbody,tr,td{display:block;width:100%}
    tr{background:#fff;border-radius:14px;padding:14px;margin-bottom:12px;
       box-shadow:0 3px 16px rgba(0,0,0,.06);border:1px solid #f0e4da}
    td{border:none;padding:0;font-size:14px}
    td:nth-child(1){font-size:15.5px;margin-bottom:6px}
    td:nth-child(2){color:#5c534d;margin-bottom:8px}
    td:nth-child(3){margin-bottom:10px}
    .sel{width:100%;min-width:0;padding:11px 12px;font-size:14px;text-align:center}
    td.acoes{margin-top:12px;display:flex;flex-direction:column;gap:8px}
    .wa{order:1;background:#1BA05B;color:#fff;text-align:center;padding:13px;
        border-radius:12px;font-size:15.5px}
    .prox{order:2;max-width:100%;text-align:center;margin:0;font-size:11.5px}
    .cp{order:3;margin:0;padding:9px;font-size:12.5px;width:100%}
    .gt{order:4;margin:0;padding:9px;font-size:12.5px;width:100%}
    .kpis{gap:7px}
    .kpi{flex:1 1 calc(50% - 4px);padding:8px 10px}
    .dw{width:100%;padding:16px}
  }
</style></head><body>
<h1>📋 Leads ao vivo — Quiz Parto Sem Medo</h1>
<div class="sub"><span class="count">${lista.length}</span> gestantes na lista · atualiza sozinho a cada 60s · <a href="/admin/playbook?key=${esc(key)}" style="color:#D96562;font-weight:700">📖 Playbook da SDR</a> · <a href="/admin/prompts?key=${esc(key)}" style="color:#D96562;font-weight:700">🎨 Prompts de criativo</a></div>
<div class="kpis">
  <div class="kpi">💰 Compraram <b>${totais.comprou}</b></div>
  <div class="kpi">💬 Conversando <b>${totais.conversando}</b></div>
  <div class="kpi">🔁 Em follow-up <b>${emFollow}</b></div>
  <div class="kpi">✅ 1º contato <b>${totais.contatado}</b></div>
  <div class="kpi">🆕 A contatar <b>${totais.novo}</b></div>
  <div class="kpi" style="display:flex;align-items:center">
    <a class="toggle" href="/admin/leads?key=${esc(key)}${verExcluidos ? "" : "&excluidos=1"}">
      ${verExcluidos ? "← ocultar excluídos" : `🗑️ ver excluídos (${excluidosQtd})`}
    </a>
  </div>
</div>
<table>
<thead><tr><th>Nome / etapa</th><th>Contato</th><th>Perfil</th><th>Etiqueta</th><th>Entrou</th><th>Ações</th></tr></thead>
<tbody>${rows || `<tr><td colspan="6">Nenhuma gestante nesta visão.</td></tr>`}</tbody>
</table>
<div class="ov" id="ov"><div class="dw" id="dw"></div></div>
<div class="salvo" id="toast">salvo ✓</div>
<script>
var KEY = ${JSON.stringify(key)};
var CORES = ${JSON.stringify(STATUS)};
var MAPA = ${JSON.stringify(MSG_DA_ETIQUETA)};
var PROX = ${JSON.stringify(PROXIMA_FASE)};
var timer;
function agendar(ms){ clearTimeout(timer); timer = setTimeout(function(){ location.reload(); }, ms || 60000); }
agendar();

function toast(txt){
  var t = document.getElementById("toast");
  t.textContent = txt || "salvo ✓"; t.classList.add("on");
  setTimeout(function(){ t.classList.remove("on"); }, 1600);
}

function salvar(tr, status, onlyIfNovo){
  var tel = tr.getAttribute("data-tel");
  if(!tel) return Promise.resolve();
  agendar(120000); // dá tempo de trabalhar sem a página recarregar
  return fetch("/api/lead-status", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ key: KEY, phone: tel, status: status, onlyIfNovo: !!onlyIfNovo })
  }).then(function(r){ return r.json(); });
}

// ---------------------------------------------------------------------
// Motor: a etiqueta define a mensagem. Trocou a etiqueta, trocou o texto.
// ---------------------------------------------------------------------
function planoDe(tr){ return JSON.parse(tr.querySelector("td.acoes").getAttribute("data-plano")); }

function msgDaEtiqueta(tr, status){
  var m = MAPA[status];
  if(!m) return null;
  var g = planoDe(tr)[m[0]];
  if(!g || !g[m[1]]) return null;
  var passo = g[m[1]];
  // na 1ª mensagem vão os dois degraus juntos: entrega + pergunta de 1 toque
  if(status === "novo" && g[1]) return { rotulo: passo.mecanismo, texto: passo.texto + "\\n\\n—\\n\\n" + g[1].texto };
  return { rotulo: passo.mecanismo, texto: passo.texto };
}

function pintarLinha(tr, status){
  var sel = tr.querySelector("select.sel");
  var c = CORES[status];
  if(sel){ sel.value = status; if(c){ sel.style.background = c[1]; sel.style.color = c[2]; } }
  tr.className = "st-" + status;

  var td = tr.querySelector("td.acoes");
  var a = td.querySelector("a.wa"), prox = td.querySelector(".prox"), cp = td.querySelector("button.cp");
  var m = msgDaEtiqueta(tr, status);
  if(m){
    a.href = "https://wa.me/55" + tr.getAttribute("data-tel") + "?text=" + encodeURIComponent(m.texto);
    a.style.display = ""; cp.style.display = "";
    prox.textContent = "envia: " + m.rotulo;
    cp.setAttribute("data-msg", m.texto);
  } else {
    a.style.display = "none"; cp.style.display = "none"; prox.textContent = "";
  }
}

function salvar(tr, status){
  var tel = tr.getAttribute("data-tel");
  if(!tel) return Promise.resolve();
  agendar(300000);
  return fetch("/api/lead-status", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ key: KEY, phone: tel, status: status })
  }).then(function(r){ return r.json(); });
}

document.querySelectorAll("tbody tr[data-tel]").forEach(function(tr){
  var sel = tr.querySelector("select.sel");
  if(!sel) return;
  pintarLinha(tr, sel.value);

  // trocar a etiqueta troca a mensagem na hora
  sel.addEventListener("change", function(){
    var v = sel.value;
    pintarLinha(tr, v);
    salvar(tr, v).then(function(d){
      if(d && d.ok){
        toast(v === "excluido" ? "lead excluído 🗑️" : "etiqueta salva ✓");
        if(v === "excluido"){ tr.style.transition="opacity .4s"; tr.style.opacity="0"; setTimeout(function(){ tr.remove(); }, 400); }
      } else { toast("erro ao salvar ✕"); }
    }).catch(function(){ toast("erro ao salvar ✕"); });
  });

  // clicar no WhatsApp avança sozinho para a próxima fase
  tr.querySelector("a.wa").addEventListener("click", function(){
    var atual = sel.value;
    var seguinte = PROX[atual];
    if(!seguinte) return; // conversando/comprou/sem interesse: você controla na mão
    setTimeout(function(){
      pintarLinha(tr, seguinte);
      salvar(tr, seguinte).then(function(d){
        if(d && d.ok) toast("→ " + CORES[seguinte][0]);
      }).catch(function(){});
    }, 600);
  });
});

function copiar(t){
  agendar(300000);
  navigator.clipboard.writeText(t).then(function(){ toast("copiado ✓"); })
  .catch(function(){
    var ta=document.createElement("textarea"); ta.value=t; document.body.appendChild(ta);
    ta.select(); document.execCommand("copy"); ta.remove(); toast("copiado ✓");
  });
}
document.querySelectorAll("button.cp").forEach(function(b){
  b.addEventListener("click", function(){ copiar(b.getAttribute("data-msg")); });
});

// Gaveta: todas as fases do funil para essa gestante
var ov = document.getElementById("ov"), dw = document.getElementById("dw");
ov.addEventListener("click", function(e){ if(e.target === ov) ov.classList.remove("on"); });
document.addEventListener("keydown", function(e){ if(e.key === "Escape") ov.classList.remove("on"); });

var GRUPOS = [
  ["escada", "Trilha fria — ela ainda não respondeu"],
  ["conversando", "Ela respondeu — trilha de conversa"],
  ["comprou", "Pós-venda"],
  ["sem_interesse", "Porta aberta"],
];

document.querySelectorAll("button.gt").forEach(function(b){
  b.addEventListener("click", function(){
    agendar(600000);
    var tr = b.closest("tr");
    var td = tr.querySelector("td.acoes");
    var plano = planoDe(tr);
    var nome = td.getAttribute("data-nome");
    var atual = MAPA[tr.querySelector("select.sel").value];
    var textos = [];
    var html = '<button class="dwx" id="fechar">✕</button><h2>🎯 Todas as fases</h2>'
      + '<div class="lead">' + nome + ' · a etiqueta escolhida define qual mensagem o botão do WhatsApp carrega.</div>';
    GRUPOS.forEach(function(gr){
      var lista = plano[gr[0]] || [];
      if(!lista.length) return;
      html += '<div class="gsec">' + gr[1] + '</div>';
      lista.forEach(function(g, i){
        var ativo = atual && atual[0] === gr[0] && atual[1] === i;
        html += '<div class="gcard' + (ativo ? ' agora' : '') + '">'
          + (ativo ? '<div class="gnow">◀ é essa que está no botão agora</div>' : '')
          + '<div class="gwhen">' + g.quando + '</div>'
          + '<div class="gmec">' + g.mecanismo + '</div>'
          + '<div class="gpor">' + g.porque + '</div>'
          + '<div class="gtxt"></div><button class="gcopy">copiar ⧉</button></div>';
        textos.push(g.texto);
      });
    });
    dw.innerHTML = html;
    dw.querySelectorAll(".gtxt").forEach(function(el, i){ el.textContent = textos[i]; });
    dw.querySelectorAll(".gcopy").forEach(function(btn, i){
      btn.addEventListener("click", function(){ copiar(textos[i]); });
    });
    dw.querySelector("#fechar").addEventListener("click", function(){ ov.classList.remove("on"); });
    dw.scrollTop = 0; ov.classList.add("on");
  });
});
</script>
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
