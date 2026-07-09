export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1699926681212647";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
];

/** Captura UTMs da URL na entrada e persiste em localStorage. */
export function captureUtms() {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const stored = JSON.parse(localStorage.getItem("psm_utms") || "{}");
    let changed = false;
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) {
        stored[k] = v;
        changed = true;
      }
    });
    if (changed) localStorage.setItem("psm_utms", JSON.stringify(stored));
    return stored;
  } catch {
    return {};
  }
}

export function getUtms() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("psm_utms") || "{}");
  } catch {
    return {};
  }
}

/** Evento padrão do Meta (ViewContent, Lead, InitiateCheckout...) */
export function fbTrack(event, params = {}) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, { ...getUtms(), ...params });
}

/** Evento customizado (quiz_start, quiz_complete...) */
export function fbTrackCustom(event, params = {}) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", event, { ...getUtms(), ...params });
}

/** Advanced Matching: melhora atribuição das campanhas. O Meta faz o hash. */
export function fbAdvancedMatching({ email, phone, firstName }) {
  if (typeof window === "undefined" || !window.fbq || !PIXEL_ID) return;
  const data = {};
  if (email) data.em = email.trim().toLowerCase();
  if (phone) data.ph = "55" + phone.replace(/\D/g, "");
  if (firstName) data.fn = firstName.trim().toLowerCase();
  window.fbq("init", PIXEL_ID, data);
}

/** Salva o lead no Supabase, se configurado. Fire-and-forget. */
export async function saveLead(payload) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return; // banco ainda não plugado — não bloqueia nada
  try {
    await fetch(`${url}/rest/v1/quiz_leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("saveLead:", e);
  }
}

/** Monta o link do checkout carregando UTMs + perfil. */
export function checkoutUrl(base, perfil) {
  try {
    const u = new URL(base);
    const utms = getUtms();
    Object.entries(utms).forEach(([k, v]) => u.searchParams.set(k, v));
    if (perfil) u.searchParams.set("perfil", perfil);
    return u.toString();
  } catch {
    return base;
  }
}
