// Painel AO VIVO de leads — protegido por chave (?key=...).
// WhatsApp com mensagem pronta + etiqueta por dropdown + exclusão reversível.

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

// valor: [rótulo, fundo, texto]
const STATUS = {
  novo:          ["🆕 A contatar",   "#EFE7DF", "#6B615A"],
  contatado:     ["✅ 1º contato",    "#E3F1E6", "#256B33"],
  conversando:   ["💬 Conversando",  "#E3E8FF", "#33459B"],
  follow_up:     ["🔁 Follow-up",    "#FFF3D6", "#8A6A1F"],
  comprou:       ["💰 COMPROU",      "#D8F0DD", "#166534"],
  sem_interesse: ["✖️ Sem interesse", "#EEE9E4", "#8A8078"],
  excluido:      ["🗑️ Excluído",     "#F6E4E4", "#9B4444"],
};
const ORDEM = ["novo","contatado","conversando","follow_up","comprou","sem_interesse","excluido"];

const PERFIS = { A:"Gestante Ansiosa", B:"Gestante Defensora", C:"Gestante Confusa", D:"Quase Pronta" };

function primeiraMensagem(lead) {
  const primeiro = String(lead.nome || "").trim().split(/\s+/)[0] || "tudo bem";
  const etapa = lead.respostas?.etapa;
  if (etapa === "chegou_checkout") {
    return `Oi ${primeiro}! Aqui é o ${SDR_NOME}, da equipe do Dr. Alberto Guimarães 💛 Vi que você chegou pertinho de garantir seu acesso ao Parto Sem Medo e algo te interrompeu. Antes de tudo: a página abriu certinho pra você? Às vezes o banco trava o cartão na primeira tentativa e eu resolvo isso contigo em 2 minutinhos.`;
  }
  if (etapa === "parcial_whatsapp") {
    return `Oi ${primeiro}! Aqui é o ${SDR_NOME}, da equipe do Dr. Alberto Guimarães 💛 Vi que você começou sua análise de preparo pro parto e a vida interrompeu no meio — acontece direto por aqui 😅 Suas respostas ficaram salvinhas. Quer que eu te mande o link pra concluir? Faltam 3 perguntinhas, literalmente 1 minuto.`;
  }
  return `Oi ${primeiro}! Sou o ${SDR_NOME}, da equipe do Dr. Alberto Guimarães 💛 Sua análise ficou pronta e eu queria te entregar pessoalmente, porque seu perfil tem uma particularidade.`;
}

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

  const totais = { comprou:0, conversando:0, follow_up:0, contatado:0, novo:0, excluido:0 };
  lista.forEach((l) => { const s = l.status || "novo"; if (totais[s] !== undefined) totais[s]++; });

  const excluidosQtd = totais.excluido;
  if (!verExcluidos) lista = lista.filter((l) => (l.status || "novo") !== "excluido");

  const rows = lista.map((l) => {
    const tel = String(l.whatsapp || "").replace(/\D/g, "");
    const msg = primeiraMensagem(l);
    const wa = `https://wa.me/55${tel}?text=${encodeURIComponent(msg)}`;
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
      <td class="acoes">
        <a class="wa" href="${wa}" target="_blank" rel="noopener">WhatsApp →</a>
        <button class="cp" type="button" data-msg="${esc(msg)}">copiar msg</button>
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
  .dt{white-space:nowrap;color:#777;font-size:12px}
  .mini{color:#aaa;font-size:11px}
  .mail{color:#999;font-size:11.5px}
  tr.st-comprou{background:#F5FBF6}
  tr.st-excluido{opacity:.55}
  .toggle{font-size:12.5px;color:#a66;text-decoration:none;border:1px solid #e3d3c8;border-radius:999px;padding:5px 12px;background:#fff}
  .salvo{position:fixed;right:18px;bottom:18px;background:#166534;color:#fff;font:600 13px system-ui;padding:9px 16px;border-radius:999px;opacity:0;transition:opacity .25s;pointer-events:none}
  .salvo.on{opacity:1}
  @media(max-width:900px){th:nth-child(5),td:nth-child(5){display:none}}
</style></head><body>
<h1>📋 Leads ao vivo — Quiz Parto Sem Medo</h1>
<div class="sub"><span class="count">${lista.length}</span> gestantes na lista · atualiza sozinho a cada 60s · <a href="/admin/playbook?key=${esc(key)}" style="color:#D96562;font-weight:700">📖 Playbook da SDR</a></div>
<div class="kpis">
  <div class="kpi">💰 Compraram <b>${totais.comprou}</b></div>
  <div class="kpi">💬 Conversando <b>${totais.conversando}</b></div>
  <div class="kpi">🔁 Follow-up <b>${totais.follow_up}</b></div>
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
<div class="salvo" id="toast">salvo ✓</div>
<script>
var KEY = ${JSON.stringify(key)};
var CORES = ${JSON.stringify(STATUS)};
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

// Dropdown de etiqueta
document.querySelectorAll("select.sel").forEach(function(sel){
  sel.addEventListener("change", function(){
    var tr = sel.closest("tr");
    var v = sel.value;
    var c = CORES[v];
    if(c){ sel.style.background = c[1]; sel.style.color = c[2]; }
    salvar(tr, v).then(function(d){
      if(d && d.ok){
        tr.className = "st-" + v;
        toast(v === "excluido" ? "lead excluído 🗑️" : "etiqueta salva ✓");
        if(v === "excluido"){ tr.style.transition="opacity .4s"; tr.style.opacity="0"; setTimeout(function(){ tr.remove(); }, 400); }
      } else { toast("erro ao salvar ✕"); }
    }).catch(function(){ toast("erro ao salvar ✕"); });
  });
});

// Clicar em WhatsApp marca 1º contato (sem rebaixar quem já avançou)
document.querySelectorAll("a.wa").forEach(function(a){
  a.addEventListener("click", function(){
    var tr = a.closest("tr");
    var sel = tr.querySelector("select.sel");
    if(sel && sel.value !== "novo") return; // já avançou, não mexe
    salvar(tr, "contatado", true).then(function(d){
      if(d && d.ok && sel){
        sel.value = "contatado";
        var c = CORES["contatado"]; sel.style.background=c[1]; sel.style.color=c[2];
        tr.className = "st-contatado"; toast("1º contato registrado ✓");
      }
    }).catch(function(){});
  });
});

// Copiar mensagem
document.querySelectorAll("button.cp").forEach(function(b){
  b.addEventListener("click", function(){
    var t = b.getAttribute("data-msg"); agendar(120000);
    navigator.clipboard.writeText(t).then(function(){ toast("mensagem copiada ✓"); })
    .catch(function(){
      var ta=document.createElement("textarea"); ta.value=t; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy"); ta.remove(); toast("mensagem copiada ✓");
    });
  });
});
</script>
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
