// Painel AO VIVO de leads — protegido por chave (?key=...).
// Atualiza sozinho a cada 30s. Botão de WhatsApp com mensagem pronta + etiquetas de atendimento.

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const EXPORT_KEY = process.env.LEADS_EXPORT_KEY;

const SDR_NOME = "Bebeto";

const ETAPAS = {
  parcial_whatsapp: ["📱 Parcial (só WhatsApp)", "#FFF3D6"],
  completo: ["✅ Quiz completo", "#DDF3DF"],
  chegou_checkout: ["🔥 CHEGOU NO CHECKOUT", "#FFD6D6"],
};

const STATUS = {
  novo: ["Novo", "#EFE7DF", "#6B615A"],
  contatado: ["✅ 1º contato realizado", "#DDF3DF", "#256B33"],
  follow_up: ["🔁 Follow-up", "#FFF3D6", "#8A6A1F"],
  comprou: ["💰 COMPROU", "#D8F0DD", "#166534"],
  sem_interesse: ["✖️ Sem interesse", "#EEE9E4", "#8A8078"],
};

const PERFIS = {
  A: "Gestante Ansiosa",
  B: "Gestante Defensora",
  C: "Gestante Confusa",
  D: "Quase Pronta",
};

// Primeira mensagem pronta, personalizada por etapa do funil.
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
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

export async function GET(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
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
  const leads = res.ok ? await res.json() : [];
  leads.reverse(); // mais recente primeiro

  const totais = { comprou: 0, follow_up: 0, contatado: 0, novo: 0 };
  const vistos = new Set();
  leads.forEach((l) => {
    const tel = String(l.whatsapp || "").replace(/\D/g, "");
    if (tel && !vistos.has(tel)) {
      vistos.add(tel);
      const st = l.status || "novo";
      if (totais[st] !== undefined) totais[st]++;
    }
  });

  const rows = leads
    .map((l) => {
      const tel = String(l.whatsapp || "").replace(/\D/g, "");
      const msg = primeiraMensagem(l);
      const wa = tel ? `https://wa.me/55${tel}?text=${encodeURIComponent(msg)}` : "";
      const dt = l.created_at
        ? new Date(l.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
        : "";
      const et = ETAPAS[l.respostas?.etapa] || ETAPAS.completo;
      const st = STATUS[l.status || "novo"] || STATUS.novo;
      const contatoEm = l.contato_em
        ? new Date(l.contato_em).toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
          })
        : "";

      return `<tr data-tel="${esc(tel)}">
        <td><strong>${esc(l.nome)}</strong><br/><span class="etapa" style="background:${et[1]}">${et[0]}</span></td>
        <td>${esc(l.whatsapp)}${l.email ? `<br/><span class="mail">${esc(l.email)}</span>` : ""}</td>
        <td><span class="perfil p${esc(l.perfil)}">${esc(l.perfil)} · ${esc(PERFIS[l.perfil] || "")}</span></td>
        <td class="stcell">
          <span class="status" style="background:${st[1]};color:${st[2]}">${st[0]}</span>
          ${contatoEm ? `<br/><span class="mini">desde ${contatoEm}</span>` : ""}
        </td>
        <td class="dt">${esc(dt)}<br/><span class="mini">${esc(l.utms?.utm_source || "")}</span></td>
        <td class="acoes">
          ${wa ? `<a class="wa" href="${wa}" target="_blank" rel="noopener" data-marca="contatado">WhatsApp →</a>` : ""}
          <div class="tags">
            <button class="tag t-comprou" data-st="comprou" title="Marcar como comprou">💰 Comprou</button>
            <button class="tag t-follow" data-st="follow_up" title="Precisa de follow-up">🔁 Follow-up</button>
            <button class="tag t-sem" data-st="sem_interesse" title="Sem interesse">✖️</button>
            <button class="tag t-copy" data-msg="${esc(msg)}">copiar msg</button>
          </div>
        </td>
      </tr>`;
    })
    .join("");

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
  .kpis{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px}
  .kpi{background:#fff;border:1px solid #f0e8e0;border-radius:12px;padding:8px 14px;font-size:13px}
  .kpi b{display:block;font-size:19px;font-variant-numeric:tabular-nums}
  table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.05)}
  th,td{text-align:left;padding:10px 14px;font-size:14px;border-bottom:1px solid #f0e8e0;vertical-align:top}
  th{background:#fff5f0;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#a66}
  .perfil{border-radius:999px;padding:2px 10px;font-size:12px;font-weight:600;background:#eee}
  .etapa{border-radius:999px;padding:1px 8px;font-size:11px;font-weight:600;color:#333}
  .status{display:inline-block;border-radius:999px;padding:2px 10px;font-size:11.5px;font-weight:700}
  .pA{background:#FFE8CC}.pB{background:#FFD6D6}.pC{background:#E3E8FF}.pD{background:#DDF3DF}
  .wa{color:#1BA05B;font-weight:700;text-decoration:none;font-size:14px}
  .dt{white-space:nowrap;color:#777;font-size:12px}
  .mini{color:#aaa;font-size:11px}
  .mail{color:#999;font-size:11.5px}
  .tags{display:flex;gap:5px;flex-wrap:wrap;margin-top:6px}
  .tag{font:600 11px system-ui;border-radius:999px;padding:3px 9px;cursor:pointer;border:1px solid #e3d3c8;background:#fff;color:#8a7f76}
  .tag:hover{background:#8a7f76;color:#fff}
  .t-comprou:hover{background:#166534;border-color:#166534}
  .t-follow:hover{background:#8A6A1F;border-color:#8A6A1F}
  tr.linha-ok{background:#F6FBF7}
  @media(max-width:820px){th:nth-child(5),td:nth-child(5){display:none}}
</style></head><body>
<h1>📋 Leads ao vivo — Quiz Parto Sem Medo</h1>
<div class="sub"><span class="count">${vistos.size}</span> gestantes · atualiza sozinho a cada 30s · horário de Brasília · <a href="/admin/playbook?key=${esc(key)}" style="color:#D96562;font-weight:700">📖 Playbook da SDR</a></div>
<div class="kpis">
  <div class="kpi">💰 Compraram <b>${totais.comprou}</b></div>
  <div class="kpi">🔁 Follow-up <b>${totais.follow_up}</b></div>
  <div class="kpi">✅ Contatadas <b>${totais.contatado}</b></div>
  <div class="kpi">🆕 A contatar <b>${totais.novo}</b></div>
</div>
<table>
<thead><tr><th>Nome / etapa</th><th>Contato</th><th>Perfil</th><th>Status</th><th>Quando</th><th>Ações</th></tr></thead>
<tbody>${rows || `<tr><td colspan="6">Nenhum lead ainda.</td></tr>`}</tbody>
</table>
<script>
var KEY = ${JSON.stringify(key)};
var refreshTimer = setTimeout(function(){ location.reload(); }, 30000);
function pausarRefresh(){ clearTimeout(refreshTimer); refreshTimer = setTimeout(function(){ location.reload(); }, 60000); }

function marcar(tr, status, botao, textoOk){
  var tel = tr.getAttribute("data-tel");
  if(!tel) return;
  pausarRefresh();
  fetch("/api/lead-status", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ key: KEY, phone: tel, status: status })
  }).then(function(r){ return r.json(); }).then(function(d){
    if(d && d.ok){
      var cel = tr.querySelector(".stcell .status");
      var mapa = {
        contatado:["✅ 1º contato realizado","#DDF3DF","#256B33"],
        follow_up:["🔁 Follow-up","#FFF3D6","#8A6A1F"],
        comprou:["💰 COMPROU","#D8F0DD","#166534"],
        sem_interesse:["✖️ Sem interesse","#EEE9E4","#8A8078"]
      }[status];
      if(cel && mapa){ cel.textContent = mapa[0]; cel.style.background = mapa[1]; cel.style.color = mapa[2]; }
      tr.classList.add("linha-ok");
      if(botao && textoOk){ var t0 = botao.textContent; botao.textContent = textoOk; setTimeout(function(){ botao.textContent = t0; }, 1600); }
    }
  }).catch(function(){});
}

// Clicar em WhatsApp marca "1º contato realizado"
document.querySelectorAll("a.wa").forEach(function(a){
  a.addEventListener("click", function(){ marcar(a.closest("tr"), "contatado"); });
});

// Botões de etiqueta
document.querySelectorAll("button.tag[data-st]").forEach(function(b){
  b.addEventListener("click", function(){ marcar(b.closest("tr"), b.getAttribute("data-st"), b, "feito ✓"); });
});

// Copiar mensagem
document.querySelectorAll("button.t-copy").forEach(function(b){
  b.addEventListener("click", function(){
    var t = b.getAttribute("data-msg");
    pausarRefresh();
    navigator.clipboard.writeText(t).then(function(){
      b.textContent="copiado ✓"; setTimeout(function(){b.textContent="copiar msg";},1500);
    }).catch(function(){
      var ta=document.createElement("textarea"); ta.value=t; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy"); ta.remove();
      b.textContent="copiado ✓"; setTimeout(function(){b.textContent="copiar msg";},1500);
    });
  });
});
</script>
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
