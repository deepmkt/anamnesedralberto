// Página dos prompts de criativo — abre no navegador, com botão de copiar.
import { promptsCriativos } from "@/lib/prompts-criativos";

export const dynamic = "force-dynamic";

const EXPORT_KEY = process.env.LEADS_EXPORT_KEY;

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

export async function GET(request) {
  const key = new URL(request.url).searchParams.get("key");
  if (!EXPORT_KEY || key !== EXPORT_KEY) {
    return new Response("unauthorized", { status: 401 });
  }

  const cards = promptsCriativos.map((p, i) => {
    const risco = p.risco === "A"
      ? '<span class="badge ba">texto longo · confira os acentos</span>'
      : '<span class="badge bb">texto curto · seguro</span>';
    return `<article class="card" id="p${i}">
      <div class="chead">
        <h2>${esc(p.titulo)}</h2>
        ${risco}
      </div>
      <pre class="prompt" data-i="${i}">${esc(p.prompt)}</pre>
      <button class="copy" data-i="${i}">📋 copiar prompt</button>
      ${p.legenda ? `<div class="leg"><strong>Legenda do post:</strong> ${esc(p.legenda)}
        <button class="copyleg" data-i="${i}">copiar legenda</button></div>` : ""}
      ${p.nota ? `<div class="nota">💡 ${esc(p.nota)}</div>` : ""}
    </article>`;
  }).join("");

  const indice = promptsCriativos.map((p, i) =>
    `<a href="#p${i}">${esc(p.titulo.split("·")[0].trim())}</a>`).join("");

  const html = `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex,nofollow"/>
<title>Prompts de criativo — Parto Sem Medo</title>
<style>
  *{box-sizing:border-box}
  body{font-family:system-ui,-apple-system,sans-serif;background:#FAF5F0;color:#2B2B2B;margin:0;padding:24px;line-height:1.6}
  .wrap{max-width:860px;margin:0 auto}
  h1{font-size:23px;margin:0 0 4px}
  .sub{color:#8a7f77;font-size:13.5px;margin-bottom:18px}
  .sub a{color:#D96562;font-weight:700;text-decoration:none}
  .aviso{background:#FFF3E8;border:1px solid #F0D8C4;border-left:4px solid #D96562;border-radius:12px;padding:14px 16px;font-size:13.5px;margin-bottom:20px}
  .idx{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px}
  .idx a{font-size:12px;font-weight:600;color:#8a6a5f;background:#fff;border:1px solid #eaddd4;border-radius:999px;padding:4px 11px;text-decoration:none}
  .idx a:hover{background:#D96562;color:#fff;border-color:#D96562}
  .card{background:#fff;border:1px solid #f0e4da;border-radius:16px;padding:18px;margin-bottom:18px;box-shadow:0 3px 18px rgba(0,0,0,.04)}
  .chead{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px}
  h2{font-size:16.5px;margin:0}
  .badge{font-size:10.5px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}
  .ba{background:#FFE8D6;color:#9A5B25}
  .bb{background:#E3F1E6;color:#256B33}
  .prompt{background:#F6F1EC;border:1px solid #ece0d6;border-radius:12px;padding:14px;font:13px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre-wrap;word-break:break-word;margin:0;max-height:340px;overflow-y:auto}
  .copy{margin-top:10px;font:700 13px system-ui;color:#fff;background:#1BA05B;border:none;border-radius:999px;padding:8px 18px;cursor:pointer}
  .copy:hover{background:#158a4c}
  .leg{margin-top:12px;background:#FDF6F6;border-radius:10px;padding:11px 13px;font-size:13.5px}
  .leg button{margin-left:8px;font:600 11px system-ui;color:#a66;background:#fff;border:1px solid #e3d3c8;border-radius:999px;padding:3px 10px;cursor:pointer}
  .nota{margin-top:10px;font-size:12.5px;color:#7d726a;border-left:3px solid #f0d8d0;padding-left:10px}
  .toast{position:fixed;right:18px;bottom:18px;background:#166534;color:#fff;font:600 13px system-ui;padding:10px 18px;border-radius:999px;opacity:0;transition:opacity .25s;pointer-events:none}
  .toast.on{opacity:1}
  @media(max-width:600px){body{padding:14px}.prompt{font-size:12px}}
</style></head><body>
<div class="wrap">
  <h1>🎨 Prompts de criativo</h1>
  <div class="sub">
    Cola direto no nano banana pro, ChatGPT ou Higgsfield — o texto já vai dentro do prompt.
    · <a href="/admin/leads?key=${esc(key)}">📋 Leads ao vivo</a>
    · <a href="/admin/playbook?key=${esc(key)}">📖 Playbook da SDR</a>
  </div>
  <div class="aviso">
    <strong>A regra que não muda:</strong> nos depoimentos a frase é de paciente real, então
    nenhum prompt gera rosto humano junto com ela. Rosto inventado + frase real é falso
    testemunho — reprova no Meta e expõe o CRM do Dr. Alberto (CFM 1.974/2011 e CONAR).
    Nos prompts de curiosidade, que não afirmam nada sobre ninguém, pode gerar pessoa à vontade.
    <br/><br/>
    Toda imagem gerada precisa ir para o Meta com <code>self_ai_disclosure: OPT_IN</code>.
  </div>
  <div class="idx">${indice}</div>
  ${cards}
</div>
<div class="toast" id="toast">copiado ✓</div>
<script>
var DADOS = ${JSON.stringify(promptsCriativos)};
function toast(t){
  var el = document.getElementById("toast");
  el.textContent = t; el.classList.add("on");
  setTimeout(function(){ el.classList.remove("on"); }, 1600);
}
function copiar(txt, ok){
  navigator.clipboard.writeText(txt).then(function(){ toast(ok); }).catch(function(){
    var ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta);
    ta.select(); document.execCommand("copy"); ta.remove(); toast(ok);
  });
}
document.querySelectorAll("button.copy").forEach(function(b){
  b.addEventListener("click", function(){
    copiar(DADOS[+b.getAttribute("data-i")].prompt, "prompt copiado ✓");
    b.textContent = "✓ copiado";
    setTimeout(function(){ b.textContent = "📋 copiar prompt"; }, 1800);
  });
});
document.querySelectorAll("button.copyleg").forEach(function(b){
  b.addEventListener("click", function(){
    copiar(DADOS[+b.getAttribute("data-i")].legenda, "legenda copiada ✓");
  });
});
</script>
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
