# CLAUDE.md — Quiz Parto Sem Medo

Contexto do projeto para o Claude Code. Este arquivo é lido automaticamente ao abrir a pasta.

## Quem é o cliente

**Dr. Alberto Guimarães** — obstetra, CRM-SP 66026, RQE-SP 14176.
+30 anos de carreira, +3.000 partos, autor de 2 livros, único médico brasileiro
certificado pelo Instituto Michel Odent (Lyon, França). Atende no Einstein,
Pro Matre e Santa Joana. Instagram @dralbertoguimaraes (47,9 mil seguidores).

Agência: **Deep Assessoria** (Bebeto / Adalberto Farias).

## O produto

Curso digital **"Parto Sem Medo"** — R$ 497 à vista ou 12x R$ 57,97.
Âncora de preço: "De R$ 997". Garantia de 30 dias.
Checkout (Cakto): `https://pay.cakto.com.br/35objdm_667163`

## O que este projeto é

Quiz funnel de 7 perguntas que qualifica gestantes, entrega um diagnóstico
personalizado (4 perfis) e vende o curso.

Stack: **Next.js 14 (App Router) + Tailwind**. Sem TypeScript.

## Estado atual (09/07/2026)

- Código completo e buildando limpo (`npx next build` passa)
- Git inicializado, branch `main`, 1 commit feito
- Remote: `https://github.com/deepmkt/anamnesedralberto.git`
- **O push AINDA NÃO FOI FEITO.** O repositório remoto tem só um `README.md`.
- Ainda não há projeto na Vercel para este quiz.

## Contexto crítico: por que reconstruímos

A versão anterior do quiz foi feita no Manus (HTML estático). Auditoria revelou:

1. **O Pixel do Meta nunca esteve instalado.** Dataset `1699926681212647` disparou
   17 PageViews e 15 ViewContent em 04/07/2026 (alguém testando) e ficou mudo
   desde então — mesmo com 484 cliques pagos chegando. Zero eventos, zero
   otimização, zero remarketing.
2. **Taxa de rejeição de 92,6%** com duração média de 49s: a landing pedia uma
   decisão ("Começar Análise") antes de qualquer envolvimento.
3. **Leads descartados.** Nome, e-mail e WhatsApp eram coletados e jogados fora.

## O que esta versão corrige

- **Pixel instalado corretamente**, com PageView disparando a cada mudança de
  rota (o erro clássico em SPA). 12 eventos ao todo.
- **Q1 é a landing** — sem tela intermediária. A primeira pergunta já abre com
  botões grandes e emoji. Toque num botão custa quase zero de decisão.
- Captura do **primeiro nome** entre a Q3 e a Q4; as perguntas seguintes usam o nome.
- Micro-feedbacks personalizados, barra de progresso animada, tela de
  processamento (3 checkmarks), micro-compromisso antes do formulário.
- **Persistência** em localStorage — retoma de onde parou por 7 dias.
- **Exit intent** com modal único.
- **4 diagnósticos segmentados** (A/B/C/D) na página de resultado.
- **Timer honesto de 72h**, persistido (não reinicia a cada visita).
- Bloco de autoridade (Michel Odent), bônus com valor monetário (R$ 658), FAQ de 8 itens.
- UTMs capturados na entrada e repassados ao checkout do Cakto.

## Eventos do Pixel

Pixel ID: **`1699926681212647`** (embutido como padrão em `lib/track.js` e `app/layout.js`)

| Evento | Quando dispara |
|---|---|
| PageView | toda rota (SPA-aware) |
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

## Estrutura

```
app/
  layout.js           # Pixel base + fontes
  PixelPageView.js    # PageView por rota (correção do bug de SPA)
  page.js             # o quiz inteiro (7 perguntas + retenção + formulário)
  resultado/page.js   # diagnóstico + autoridade + bônus + oferta + FAQ
  globals.css         # design system
lib/
  quiz-data.js        # perguntas, feedbacks, 4 perfis, bônus, FAQ, depoimentos
  track.js            # pixel, UTMs, saveLead (Supabase), checkoutUrl
```

## Lógica dos 4 perfis (em `lib/quiz-data.js` → `getProfile`)

Prioridade: **B > C > D > A**

- **B — Gestante Defensora**: medo = violência obstétrica
- **C — Gestante Confusa**: informação = perdida | ansiosa | confusa
- **D — Quase Pronta**: informação = duvidas, OU já tem plano de parto
- **A — Gestante Ansiosa**: o resto

## Design system

- Fundo creme `#FAF5F0`, rosa `#F08080`, rosa claro `#FF8FB3`, tinta `#2B2B2B`
- Títulos: Playfair Display. Corpo: Inter. (carregadas via `<link>` no layout)
- Mobile-first, viewport de referência 390x844. 90%+ do tráfego é mobile.
- Botões de resposta: mín. 60px de altura, feedback visual < 150ms.

## PRÓXIMAS TAREFAS (em ordem)

### 1. Push do código
```bash
git pull --rebase origin main   # o remoto tem um README solto
git push -u origin main
```

### 2. Deploy na Vercel
Time: **Deep Marketing's projects** (`team_AaUE1UM0CqYVGFTRgqiqPGjE`)
Nome sugerido do projeto: `anamnese-parto-sem-medo`

```bash
npx vercel --prod
```
Ou importar o repo em vercel.com/new. Framework Next.js, **não mexer em Output Directory**.

Env vars:
- `NEXT_PUBLIC_META_PIXEL_ID=1699926681212647`
- `NEXT_PUBLIC_CHECKOUT_URL=https://pay.cakto.com.br/35objdm_667163`

### 3. Desligar Deployment Protection
Settings → Deployment Protection → Vercel Authentication → **Disabled**.
Sem isso a gestante cai numa tela de login da Vercel.

### 4. Validar o pixel ANTES de trocar o DNS
Abrir a URL `*.vercel.app` com a extensão **Meta Pixel Helper** e percorrer o
quiz inteiro. Ordem esperada:

PageView → ViewContent → quiz_start → quiz_question_answered (×7) →
name_captured → quiz_complete → Lead → PageView → CompleteRegistration

Confirmar também no Gerenciador de Eventos → Testar Eventos.

### 5. Apontar o subdomínio
Vercel → Settings → Domains → `anamnese.dralbertoguimaraes.com`
Hostinger (hpanel) → DNS → deletar o registro atual de `anamnese` e criar:
`CNAME` · nome `anamnese` · valor `cname.vercel-dns.com` · TTL 3600

⚠️ O subdomínio hoje aponta pro quiz antigo do Manus, **com anúncio rodando**.
Só virar depois de validar o pixel.

### 6. Plugar o Supabase (opcional, depois)
`saveLead()` em `lib/track.js` já está pronto e é fire-and-forget. Basta criar a
tabela e adicionar as env vars — nada mais no código.

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

Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
Nunca hardcodar as chaves — o repositório é público.

## Contexto de tráfego pago (Meta)

Conta: **DR. ALBERTO GUIMARAES** (`1733679400983258`), business "Parto Sem Medo".

| Campanha | ID | Status | Gasto | CTR | CPC |
|---|---|---|---|---|---|
| REC 01 (Reconhecimento) | 120248287312070061 | **PAUSADA** em 09/07 | R$ 688,90 | 0,0665% | R$ 1,74 |
| QUIZ (Engajamento) | 120248428138700061 | ATIVA | R$ 334,63 | 3,00% | R$ 0,34 |

A REC 01 foi pausada por comprar impressão barata no Status do WhatsApp — CPM de
R$ 1,13 e CTR quase zero. A campanha QUIZ (anúncio AN 01) é a boa.

**Depois do pixel validado:** trocar o evento de otimização da campanha QUIZ de
"Ver conteúdo" para **Lead**. É isso que finalmente vai fazer o algoritmo aprender
quem preenche o formulário.

## Metas do funil (com R$ 100/dia)

| Etapa | Meta mês 1 | Meta mês 3 |
|---|---|---|
| Landing → inicia quiz | 50% | 65% |
| Inicia → completa | 60% | 75% |
| Completa → lead | 70% | 80% |
| Lead → venda | 3% | 5% |
| **Vendas/mês** | 12-14 | 55-60 |

Rejeição atual da landing antiga: 92,6%. Alvo com a Q1-como-landing: **< 55%**.

## Backlog futuro

- 4 VSLs por perfil (vídeo de 60-90s do Dr. Alberto na página de resultado)
- Depoimentos em vídeo (hoje são texto)
- Plano Premium R$ 997 (curso + encontro ao vivo + WhatsApp + livro físico)
- Order bump no checkout (+R$ 197 consulta 1a1)
- Dashboard de métricas do quiz (drop-off por pergunta, tempo por etapa)

## Convenções

- JavaScript, não TypeScript. Sem libs desnecessárias.
- `next.config.js` deve ficar limpo: `module.exports = { reactStrictMode: true }`.
  (Se aparecer `distDir: "dist"`, era gambiarra de um projeto antigo — remova.)
- Rodar `npx next build` antes de todo push.
- Commits em português, imperativo: `feat:`, `fix:`, `chore:`.
