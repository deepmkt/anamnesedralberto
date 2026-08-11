// Exportação CSV dos leads para a planilha do Google Sheets (IMPORTDATA).
// Protegido por chave secreta (?key=...). A planilha do Google atualiza
// automaticamente a cada ~1 hora.

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const EXPORT_KEY = process.env.LEADS_EXPORT_KEY;

function csvCell(v) {
  if (v === null || v === undefined) return "";
  const s = typeof v === "object" ? JSON.stringify(v) : String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(request) {
  const key = new URL(request.url).searchParams.get("key");
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

  if (!res.ok) {
    return new Response("storage_error", { status: 502 });
  }

  const leads = await res.json();
  const r = (l) => l.respostas || {};
  const u = (l) => l.utms || {};
  const header =
    "nome,email,whatsapp,perfil,etapa,gestacao,trimestre,medo,informacao,acompanhante,plano,investir,utm_source,utm_campaign,utm_content,data_hora";
  const rows = leads.map((l) =>
    [
      csvCell(l.nome),
      csvCell(l.email),
      csvCell(l.whatsapp),
      csvCell(l.perfil),
      csvCell(r(l).etapa || "completo"),
      csvCell(r(l).gestacao),
      csvCell(r(l).trimestre),
      csvCell(r(l).medo),
      csvCell(r(l).informacao),
      csvCell(r(l).acompanhante),
      csvCell(r(l).plano),
      csvCell(r(l).investir),
      csvCell(u(l).utm_source),
      csvCell(u(l).utm_campaign),
      csvCell(u(l).utm_content),
      csvCell(l.created_at),
    ].join(",")
  );

  return new Response([header, ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
