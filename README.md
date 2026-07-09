# Quiz Parto Sem Medo — v2

Quiz funnel do Dr. Alberto Guimarães. Next.js 14 (App Router) + Tailwind.

## O que mudou em relação à versão do Manus

- **Pixel Meta instalado corretamente** (era o problema central: o pixel nunca
  disparou em produção). PageView dispara em toda mudança de rota — o erro
  clássico em SPA.
- **Q1 é a landing** — sem tela de "Começar". Ataca a rejeição de 92,6%.
- Captura do **primeiro nome** entre a Q3 e a Q4; as perguntas seguintes usam o nome.
- **Micro-feedbacks**, barra de progresso animada, tela de processamento,
  micro-compromisso antes do formulário.
- **Persistência** em localStorage (retoma de onde parou por 7 dias).
- **Exit intent** com modal único.
- **4 diagnósticos segmentados** (A/B/C/D) na página de resultado.
- **Timer honesto de 72h** (persiste entre visitas, não reinicia).
- Bônus com valor monetário, bloco de autoridade (Michel Odent), FAQ com 8 itens.
- UTMs capturados na entrada e repassados ao checkout do Cakto.

## Eventos do Pixel

| Evento | Quando |
|---|---|
| PageView | toda rota |
| ViewContent | carga da landing |
| quiz_start | resposta da Q1 |
| quiz_question_answered | cada resposta |
| name_captured | envio do nome |
| quiz_complete | fim da Q7 |
| quiz_form_view | formulário exibido |
| Lead | envio do formulário (+ Advanced Matching) |
| CompleteRegistration | carga de /resultado |
| result_scroll_50 / _90 | scroll na /resultado |
| faq_open | abertura de FAQ |
| InitiateCheckout | clique no CTA de compra |
| quiz_abandon | saída no meio do quiz |

## Rodar local

```bash
npm install
npm run dev
```

## Deploy na Vercel

1. Suba este projeto num repo do GitHub (ou arraste a pasta em vercel.com/new)
2. Framework: Next.js (auto-detectado). Nenhuma configuração extra.
3. Environment Variables (Settings → Environment Variables):
   - `NEXT_PUBLIC_META_PIXEL_ID` = `1699926681212647`
   - `NEXT_PUBLIC_CHECKOUT_URL` = url do Cakto
4. Teste na URL `*.vercel.app` ANTES de trocar o domínio.
5. Só então: Settings → Domains → `anamnese.dralbertoguimaraes.com`
   e no DNS, CNAME `anamnese` → `cname.vercel-dns.com`

## Validar o pixel antes de trocar o DNS

Instale a extensão **Meta Pixel Helper** no Chrome, abra a URL de preview e
percorra o quiz inteiro. Você deve ver, em ordem:
PageView → ViewContent → quiz_start → quiz_question_answered (x7) →
name_captured → quiz_complete → Lead → PageView → CompleteRegistration.

Confirme também no Gerenciador de Eventos → Testar Eventos.

## Plugar o Supabase depois

Crie as tabelas e adicione as duas env vars. O `saveLead()` em `lib/track.js`
já está pronto e é fire-and-forget (não bloqueia a UI se falhar).

```sql
create table quiz_leads (
  id uuid primary key default gen_random_uuid(),
  nome text, email text, whatsapp text,
  perfil text,
  respostas jsonb,
  utms jsonb,
  created_at timestamptz default now()
);
alter table quiz_leads enable row level security;
create policy "anon insert" on quiz_leads for insert to anon with check (true);
```
