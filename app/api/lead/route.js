// Webhook first-party de captura de leads do quiz.
// Recebe o POST do formulário e grava no Supabase pelo SERVIDOR.
// Vantagens: bloqueadores de anúncio não barram (mesmo domínio) e a
// gravação não depende do navegador da gestante.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(request) {
  try {
    const body = await request.json();

    // Validação mínima — não deixa lixo entrar, não trava lead legítimo.
    const nome = String(body?.nome || "").slice(0, 120).trim();
    const email = String(body?.email || "").slice(0, 200).trim();
    const whatsapp = String(body?.whatsapp || "").slice(0, 40).trim();
    if (!nome && !email && !whatsapp) {
      return Response.json({ ok: false, error: "empty" }, { status: 400 });
    }

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      // Sem banco configurado: loga no server pra não perder silenciosamente.
      console.error("[lead] Supabase não configurado — lead descartado:", email);
      return Response.json({ ok: false, error: "storage_unconfigured" }, { status: 503 });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/quiz_leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        nome,
        email,
        whatsapp,
        perfil: String(body?.perfil || "").slice(0, 4),
        respostas: body?.respostas ?? null,
        utms: body?.utms ?? null,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[lead] Falha ao gravar no Supabase:", res.status, detail);
      return Response.json({ ok: false, error: "storage_error" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[lead] Erro inesperado:", e);
    return Response.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}
