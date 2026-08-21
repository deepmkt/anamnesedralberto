// Atualiza a etiqueta de atendimento de um lead. Protegido pela mesma chave do painel.
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const EXPORT_KEY = process.env.LEADS_EXPORT_KEY;

const VALIDOS = ["novo", "contatado", "follow_up", "comprou", "sem_interesse"];

export async function POST(request) {
  try {
    const body = await request.json();
    const { key, phone, status } = body || {};

    if (!EXPORT_KEY || key !== EXPORT_KEY) {
      return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    if (!VALIDOS.includes(status)) {
      return Response.json({ ok: false, error: "status_invalido" }, { status: 400 });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/set_lead_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        secret_key: key,
        p_phone: phone,
        p_status: status,
        p_nota: null,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[lead-status]", res.status, detail);
      return Response.json({ ok: false, error: "storage_error" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error("[lead-status] erro:", e);
    return Response.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}
