// Painel AO VIVO de leads — protegido por chave (?key=...).
// Atualiza sozinho a cada 30s. Botão de WhatsApp para abordagem imediata.

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const EXPORT_KEY = process.env.LEADS_EXPORT_KEY;

const ETAPAS = {
  parcial_whatsapp: ["📱 Parcial (só WhatsApp)", "#FFF3D6"],
  completo: ["✅ Quiz completo", "#DDF3DF"],
  chegou_checkout: ["🔥 CHEGOU NO CHECKOUT", "#FFD6D6"],
};

const SDR_NOME = "Bebeto";

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

const PERFIS = {
  A: "Gestante Ansiosa",
  B: "Gestante Defensora",
  C: "Gestante Confusa",
  D: "Quase Pronta",
};

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

  const rows = leads
    .map((l) => {
      const tel = String(l.whatsapp || "").replace(/\D/g, "");
      const msg = primeiraMensagem(l);
      const wa = tel ? `https://wa.me/55${tel}?text=${encodeURIComponent(msg)}` : "";
      const dt = l.created_at
        ? new Date(l.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
        : "";
      const et = ETAPAS[l.respostas?.etapa] || ETAPAS.completo;
      return `<tr>
        <td><strong>${esc(l.nome)}</strong><br/><span class="etapa" style="background:${et[1]}">${et[0]}</span></td>
        <td>${esc(l.email)}</td>
        <td>${esc(l.whatsapp)}</td>
        <td><span class="perfil p${esc(l.perfil)}">${esc(l.perfil)} · ${esc(PERFIS[l.perfil] || "")}</span></td>
        <td>${esc(l.utms?.utm_source || "")}</td>
        <td class="dt">${esc(dt)}</td>
        <td>${wa ? `<a class="wa" href="${wa}" target="_blank" rel="noopener">WhatsApp →</a><br/><button class="cp" type="button" data-msg="${esc(msg)}">copiar msg</button>` : ""}</td>
      </tr>`;
    })
    .join("");

  const html = `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex,nofollow"/>
<meta http-equiv="refresh" content="30"/>
<title>Leads ao vivo — Parto Sem Medo</title>
<style>
  body{font-family:system-ui,-apple-system,sans-serif;background:#FAF5F0;color:#2B2B2B;margin:0;padding:24px}
  h1{font-size:20px;margin:0 0 4px}
  .sub{color:#888;font-size:13px;margin-bottom:20px}
  .count{display:inline-block;background:#F08080;color:#fff;border-radius:999px;padding:2px 12px;font-weight:700}
  table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.05)}
  th,td{text-align:left;padding:10px 14px;font-size:14px;border-bottom:1px solid #f0e8e0}
  th{background:#fff5f0;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#a66}
  .perfil{border-radius:999px;padding:2px 10px;font-size:12px;font-weight:600;background:#eee}
  .etapa{border-radius:999px;padding:1px 8px;font-size:11px;font-weight:600;color:#333}
  .pA{background:#FFE8CC}.pB{background:#FFD6D6}.pC{background:#E3E8FF}.pD{background:#DDF3DF}
  .wa{color:#1BA05B;font-weight:700;text-decoration:none}
  .cp{margin-top:5px;font:600 11px system-ui;color:#a66;background:transparent;border:1px solid #e3d3c8;border-radius:999px;padding:2px 9px;cursor:pointer}
  .cp:hover{background:#a66;color:#fff;border-color:#a66}
  .dt{white-space:nowrap;color:#777;font-size:12px}
  @media(max-width:760px){th:nth-child(2),td:nth-child(2),th:nth-child(5),td:nth-child(5){display:none}}
</style></head><body>
<h1>📋 Leads ao vivo — Quiz Parto Sem Medo</h1>
<div class="sub"><span class="count">${leads.length}</span> leads · atualiza sozinho a cada 30s · horário de Brasília · <a href="/admin/playbook?key=${esc(key)}" style="color:#D96562;font-weight:700">📖 Playbook da SDR</a></div>
<table>
<thead><tr><th>Nome</th><th>E-mail</th><th>WhatsApp</th><th>Perfil</th><th>Origem</th><th>Quando</th><th></th></tr></thead>
<tbody>${rows || `<tr><td colspan="7">Nenhum lead ainda.</td></tr>`}</tbody>
</table>
<script>
document.querySelectorAll("button.cp").forEach(function(b){
  b.addEventListener("click", function(){
    var t=b.getAttribute("data-msg");
    navigator.clipboard.writeText(t).then(function(){
      b.textContent="copiado \u2713"; setTimeout(function(){b.textContent="copiar msg"},1500);
    }).catch(function(){
      var ta=document.createElement("textarea"); ta.value=t; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy"); ta.remove();
      b.textContent="copiado \u2713"; setTimeout(function(){b.textContent="copiar msg"},1500);
    });
  });
});
</script>
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
