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
      const wa = tel ? `https://wa.me/55${tel}` : "";
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
        <td>${wa ? `<a class="wa" href="${wa}" target="_blank" rel="noopener">WhatsApp →</a>` : ""}</td>
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
  .dt{white-space:nowrap;color:#777;font-size:12px}
  @media(max-width:760px){th:nth-child(2),td:nth-child(2),th:nth-child(5),td:nth-child(5){display:none}}
</style></head><body>
<h1>📋 Leads ao vivo — Quiz Parto Sem Medo</h1>
<div class="sub"><span class="count">${leads.length}</span> leads · atualiza sozinho a cada 30s · horário de Brasília · <a href="/admin/playbook?key=${esc(key)}" style="color:#D96562;font-weight:700">📖 Playbook da SDR</a></div>
<table>
<thead><tr><th>Nome</th><th>E-mail</th><th>WhatsApp</th><th>Perfil</th><th>Origem</th><th>Quando</th><th></th></tr></thead>
<tbody>${rows || `<tr><td colspan="7">Nenhum lead ainda.</td></tr>`}</tbody>
</table>
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
