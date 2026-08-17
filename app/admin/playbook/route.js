// Playbook da SDR — mesmo esquema de proteção do painel de leads (?key=...).
export const dynamic = "force-dynamic";

const EXPORT_KEY = process.env.LEADS_EXPORT_KEY;

const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Playbook SDR Parto Sem Medo</title>
</head>
<body>

<style>
  :root{
    --ground:#FAF6F1; --card:#FFFFFF; --card-soft:#FDF9F5;
    --ink:#2B2724; --ink-2:#6B615A; --ink-3:#9A8F86;
    --rose:#D96562; --rose-soft:#FBEAE9;
    --wa:#128C5E; --wa-bubble:#E7F6EC; --wa-ink:#1C3B2A;
    --lead-bubble:#F1EDE8;
    --pa:#C97B2D; --pa-bg:#F9EEDF;
    --pb:#C2566B; --pb-bg:#F9E4E9;
    --pc:#5A6BB5; --pc-bg:#E8EBF8;
    --pd:#3E8C4A; --pd-bg:#E2F2E4;
    --line:#EADFD5; --warn-bg:#FBF3E2; --warn-ink:#8A6A1F;
  }
  @media (prefers-color-scheme: dark){
    :root:not([data-theme="light"]){
      --ground:#211B17; --card:#2B241F; --card-soft:#272019;
      --ink:#F1EAE3; --ink-2:#BCB0A6; --ink-3:#8E837A;
      --rose:#F0908D; --rose-soft:#3D2B29;
      --wa:#5BC98D; --wa-bubble:#1F3328; --wa-ink:#CFEEDB;
      --lead-bubble:#352E27;
      --pa:#E2A45E; --pa-bg:#3A2E1E;
      --pb:#E58BA0; --pb-bg:#3B262C;
      --pc:#93A2E4; --pc-bg:#262B44;
      --pd:#72C480; --pd-bg:#1F3524;
      --line:#3B322A; --warn-bg:#3A3020; --warn-ink:#E4C87A;
    }
  }
  :root[data-theme="dark"]{
    --ground:#211B17; --card:#2B241F; --card-soft:#272019;
    --ink:#F1EAE3; --ink-2:#BCB0A6; --ink-3:#8E837A;
    --rose:#F0908D; --rose-soft:#3D2B29;
    --wa:#5BC98D; --wa-bubble:#1F3328; --wa-ink:#CFEEDB;
    --lead-bubble:#352E27;
    --pa:#E2A45E; --pa-bg:#3A2E1E;
    --pb:#E58BA0; --pb-bg:#3B262C;
    --pc:#93A2E4; --pc-bg:#262B44;
    --pd:#72C480; --pd-bg:#1F3524;
    --line:#3B322A; --warn-bg:#3A3020; --warn-ink:#E4C87A;
  }
  *{box-sizing:border-box}
  body{
    background:var(--ground); color:var(--ink);
    font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
    line-height:1.55; margin:0; padding:0 20px 80px;
  }
  .wrap{max-width:820px; margin:0 auto}
  header.hero{padding:56px 0 8px}
  .eyebrow{font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--rose); font-weight:700}
  h1{font-family:Georgia,"Times New Roman",serif; font-size:clamp(30px,5vw,42px); line-height:1.12; margin:10px 0 8px; text-wrap:balance}
  .lede{color:var(--ink-2); max-width:60ch; font-size:17px}
  nav.chips{display:flex; flex-wrap:wrap; gap:8px; margin:26px 0 8px}
  nav.chips a{
    text-decoration:none; color:var(--ink-2); background:var(--card);
    border:1px solid var(--line); border-radius:999px; padding:7px 14px; font-size:13px; font-weight:600;
  }
  nav.chips a:hover,nav.chips a:focus-visible{color:var(--rose); border-color:var(--rose); outline:none}
  section{margin-top:52px}
  h2{font-family:Georgia,serif; font-size:26px; margin:0 0 6px; text-wrap:balance}
  .sub{color:var(--ink-2); margin:0 0 22px; max-width:62ch}
  h3{font-size:15px; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-3); margin:28px 0 12px}

  .card{background:var(--card); border:1px solid var(--line); border-radius:16px; padding:22px 24px; margin-bottom:14px}
  .card-soft{background:var(--card-soft)}

  ul.rules{margin:0; padding:0; list-style:none; display:grid; gap:10px}
  ul.rules li{display:flex; gap:12px; align-items:flex-start}
  ul.rules li::before{content:"—"; color:var(--rose); font-weight:700; flex:0 0 auto}

  ol.steps{margin:0; padding:0; list-style:none; counter-reset:s; display:grid; gap:0}
  ol.steps li{counter-increment:s; display:grid; grid-template-columns:44px 1fr; gap:14px; padding:16px 0; border-bottom:1px dashed var(--line)}
  ol.steps li:last-child{border-bottom:none}
  ol.steps li::before{
    content:counter(s); font-family:Georgia,serif; font-size:22px; color:var(--rose);
    background:var(--rose-soft); width:40px; height:40px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
  }
  ol.steps strong{display:block; margin-bottom:2px}
  ol.steps p{margin:0; color:var(--ink-2); font-size:15px}

  /* conversa estilo WhatsApp */
  .chat{display:grid; gap:8px; margin:14px 0 4px}
  .msg{max-width:88%; padding:10px 14px; border-radius:14px; font-size:15px; line-height:1.5; position:relative}
  .sdr{background:var(--wa-bubble); color:var(--wa-ink); justify-self:end; border-bottom-right-radius:4px}
  .lead{background:var(--lead-bubble); color:var(--ink); justify-self:start; border-bottom-left-radius:4px; font-style:italic}
  .msg .who{display:block; font-size:11px; letter-spacing:.08em; text-transform:uppercase; font-weight:700; opacity:.65; margin-bottom:3px; font-style:normal}
  .var{background:var(--rose-soft); color:var(--rose); border-radius:6px; padding:0 5px; font-weight:700; font-style:normal}
  .note{font-size:13px; color:var(--ink-3); margin:6px 0 0}
  .msg.sdr{padding-bottom:30px}
  button.copy{
    position:absolute; right:8px; bottom:6px;
    font:600 11px system-ui; letter-spacing:.04em;
    color:var(--wa); background:transparent; border:1px solid var(--wa);
    border-radius:999px; padding:2px 10px; cursor:pointer;
  }
  button.copy:hover{background:var(--wa); color:#fff}
  button.copy:focus-visible{outline:2px solid var(--wa); outline-offset:2px}

  /* perfis */
  .perfil{border-radius:18px; border:1px solid var(--line); overflow:hidden; margin-bottom:26px; background:var(--card)}
  .perfil-head{padding:20px 24px; display:flex; gap:14px; align-items:center}
  .perfil-head .tag{font-family:Georgia,serif; font-size:26px; width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; flex:0 0 auto; color:#fff}
  .perfil-head h2{font-size:22px; margin:0}
  .perfil-head p{margin:2px 0 0; color:var(--ink-2); font-size:14px}
  .perfil-body{padding:6px 24px 22px}
  .pa .perfil-head{background:var(--pa-bg)} .pa .tag{background:var(--pa)}
  .pb .perfil-head{background:var(--pb-bg)} .pb .tag{background:var(--pb)}
  .pc .perfil-head{background:var(--pc-bg)} .pc .tag{background:var(--pc)}
  .pd .perfil-head{background:var(--pd-bg)} .pd .tag{background:var(--pd)}
  .essencia{display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:14px 0 6px}
  @media(max-width:640px){.essencia{grid-template-columns:1fr}}
  .essencia .box{background:var(--card-soft); border:1px solid var(--line); border-radius:12px; padding:12px 14px; font-size:14px}
  .essencia .box b{display:block; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-3); margin-bottom:4px}

  dl.objecoes{margin:0; display:grid; gap:14px}
  dl.objecoes dt{font-weight:700}
  dl.objecoes dt::before{content:"“"; color:var(--rose); font-family:Georgia,serif; font-size:20px; margin-right:2px}
  dl.objecoes dt::after{content:"”"; color:var(--rose); font-family:Georgia,serif; font-size:20px; margin-left:2px}
  dl.objecoes dd{margin:6px 0 0}

  table{width:100%; border-collapse:collapse; font-size:14px}
  th,td{text-align:left; padding:10px 12px; border-bottom:1px solid var(--line); vertical-align:top}
  th{font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-3)}
  td:first-child{white-space:nowrap; font-weight:700; color:var(--rose); font-variant-numeric:tabular-nums}
  .table-scroll{overflow-x:auto}

  .alert{background:var(--warn-bg); color:var(--warn-ink); border-radius:14px; padding:16px 20px; font-size:14.5px}
  .alert b{display:block; margin-bottom:6px; letter-spacing:.08em; text-transform:uppercase; font-size:12px}
  footer{margin-top:64px; color:var(--ink-3); font-size:13px; text-align:center}
  a{color:var(--rose)}
</style>

<div class="wrap">
<header class="hero">
  <span class="eyebrow">Parto Sem Medo · Equipe de Vendas</span>
  <h1>Playbook de conversas da SDR</h1>
  <p class="lede">Como conversar com cada gestante do quiz — pelo perfil dela e pela etapa em que parou — com acolhimento de verdade e fechamento em venda. Oferta vigente: <strong>de R$497 por R$297</strong> (até 12x), garantia incondicional de 30 dias.</p>
  <nav class="chips">
    <a href="#regras">Regras de ouro</a>
    <a href="#estrutura">Estrutura da conversa</a>
    <a href="#perfilA">A · Ansiosa</a>
    <a href="#perfilB">B · Defensora</a>
    <a href="#perfilC">C · Confusa</a>
    <a href="#perfilD">D · Quase Pronta</a>
    <a href="#etapas">Por etapa do CRM</a>
    <a href="#objecoes">Objeções</a>
    <a href="#cadencia">Follow-up</a>
  </nav>
</header>

<section id="regras">
  <h2>Regras de ouro</h2>
  <p class="sub">O tom é de <em>enfermeira experiente que virou amiga</em>: calma, firme, do lado dela. Nunca de telemarketing.</p>
  <div class="card">
    <ul class="rules">
      <li><span><strong>Mensagens curtas, uma ideia por vez.</strong> No WhatsApp, 3 mensagens de 2 linhas convertem mais que 1 parágrafo gigante.</span></li>
      <li><span><strong>Sempre diga de onde veio o contato</strong> na primeira mensagem: "você deixou seu WhatsApp no teste do Dr. Alberto". Elimina a desconfiança e é o correto.</span></li>
      <li><span><strong>Use o que ela contou no quiz.</strong> O CRM mostra perfil, medo principal e trimestre. Citar isso é o que torna a conversa pessoal — é a nossa vantagem injusta.</span></li>
      <li><span><strong>Valide a emoção antes de vender.</strong> Primeiro "faz todo sentido você sentir isso", depois o caminho. Nunca o contrário.</span></li>
      <li><span><strong>Pergunte antes de despejar.</strong> Uma boa pergunta ("de 0 a 10, quão preparada você se sente?") vale mais que três argumentos.</span></li>
      <li><span><strong>Áudio é permitido e recomendado</strong> a partir da 3ª troca, se ela responder. Voz humana acelera confiança.</span></li>
      <li><span><strong>Feche com pergunta, não com link solto.</strong> Todo bloco termina com um convite claro: "posso te mandar o acesso?".</span></li>
    </ul>
  </div>
  <div class="alert">
    <b>O que a SDR nunca faz</b>
    Não promete desfecho de parto ("você vai ter parto normal") — promete <em>preparo, informação e protagonismo</em>. Não usa medo médico para pressionar. Não insiste após um "não" claro — registra no CRM e agenda follow-up leve. Não dá orientação clínica: dúvida de saúde → "essa é uma ótima pergunta para levar ao seu pré-natal; o curso te ensina exatamente como fazê-la".
  </div>
</section>

<section id="estrutura">
  <h2>A estrutura universal — 5 passos</h2>
  <p class="sub">Toda conversa segue este esqueleto. O que muda por perfil é o <em>tom</em> e as <em>palavras</em> de cada passo.</p>
  <div class="card">
    <ol class="steps">
      <li><div><strong>Abertura com contexto</strong><p>Quem sou, de onde veio o número, e um gancho pessoal do quiz dela. Termina em pergunta fácil de responder.</p></div></li>
      <li><div><strong>Validação emocional</strong><p>Nomear o que ela sente e normalizar ("a maioria das gestantes que faz o teste sente o mesmo"). Aqui nasce a confiança.</p></div></li>
      <li><div><strong>Entrega de valor</strong><p>Dar algo antes de pedir algo: o resultado dela explicado em 3 linhas + 1 dica prática imediata ligada ao medo dela.</p></div></li>
      <li><div><strong>Ponte para o curso</strong><p>Conectar a dor específica ao módulo específico que resolve. Não vender "um curso" — vender a <em>peça que falta</em> para ela.</p></div></li>
      <li><div><strong>Fechamento com oferta</strong><p>R$297 (de R$497), até 12x, garantia de 30 dias, acesso por 2 anos. Terminar com pergunta de decisão: "quer que eu te envie o link?".</p></div></li>
    </ol>
  </div>
</section>

<section id="perfilA">
  <div class="perfil pa">
    <div class="perfil-head">
      <span class="tag">A</span>
      <div><h2>Gestante Ansiosa</h2><p>Medo difuso · falta de mapa · geralmente 1ª gestação</p></div>
    </div>
    <div class="perfil-body">
      <div class="essencia">
        <div class="box"><b>A dor real</b>Ela não tem um medo específico — tem TODOS. A ansiedade vem de não saber nem por onde começar.</div>
        <div class="box"><b>O tom que converte</b>Organizar o caos. Você é a pessoa que transforma a montanha em passos pequenos. Fale devagar, uma coisa por vez.</div>
      </div>
      <h3>Script — sequência de mensagens</h3>
      <div class="chat">
        <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>! Aqui é a <span class="var">{sdr}</span>, da equipe do Dr. Alberto Guimarães 💛 Você fez o teste de preparo para o parto e deixou seu WhatsApp para receber a análise, lembra?</div>
        <div class="msg sdr"><span class="who">SDR</span>Seu resultado saiu: seu perfil é o da <b>Gestante que precisa transformar ansiedade em preparo</b>. Posso te explicar em 1 minuto o que isso significa?</div>
        <div class="msg lead"><span class="who">Ela</span>Pode sim!</div>
        <div class="msg sdr"><span class="who">SDR</span>Olha só: sua ansiedade não é fraqueza. É o sinal de que você entende o tamanho do que vem pela frente. O problema é que ninguém te deu um MAPA — aí a cabeça tenta se preparar para tudo ao mesmo tempo, e isso esgota, né?</div>
        <div class="msg sdr"><span class="who">SDR</span>Me conta uma coisa: de 0 a 10, quanto você sente que está preparada pro dia do parto hoje?</div>
        <div class="msg lead"><span class="who">Ela</span>Umas 4… 😅</div>
        <div class="msg sdr"><span class="who">SDR</span>Obrigada pela sinceridade 💛 E sabe o que o Dr. Alberto diz? Que gestante ansiosa é a que mais rápido se transforma — porque quando recebe o passo a passo certo, a ansiedade vira combustível. Em +3.000 partos ele viu isso acontecer centenas de vezes.</div>
        <div class="msg sdr"><span class="who">SDR</span>O Parto Sem Medo é exatamente esse mapa: aulas de 10-15 min, na ordem certa, do "por onde começo" até o plano de parto pronto. E essa semana está na condição especial: <b>de R$497 por R$297</b>, em até 12x, com 30 dias de garantia — se não fizer sentido, devolvemos tudo.</div>
        <div class="msg sdr"><span class="who">SDR</span>Quer que eu te mande o link de acesso? Em 10 minutos você já está na primeira aula, e hoje ainda dorme mais tranquila 🌷</div>
      </div>
      <h3>Objeção típica do perfil A</h3>
      <dl class="objecoes">
        <dt>Vou deixar pra depois, agora estou muito sobrecarregada</dt>
        <dd>"Te entendo demais — e é exatamente por estar sobrecarregada que o mapa ajuda: ele tira da sua cabeça a tarefa de decidir o que estudar. São 10 minutinhos por dia, no seu ritmo. Começando hoje, a sobrecarga diminui já na primeira semana. Topa experimentar? Se não aliviar, a garantia te devolve 100%."</dd>
      </dl>
    </div>
  </div>
</section>

<section id="perfilB">
  <div class="perfil pb">
    <div class="perfil-head">
      <span class="tag">B</span>
      <div><h2>Gestante Defensora</h2><p>Medo de violência obstétrica · perder o controle · quer ferramentas</p></div>
    </div>
    <div class="perfil-body">
      <div class="essencia">
        <div class="box"><b>A dor real</b>Ela já sabe (ou viveu) o que pode dar errado. O medo dela é legítimo e informado. Ela não quer colo — quer ARMAS.</div>
        <div class="box"><b>O tom que converte</b>Aliada de trincheira. Valide a indignação, fale de direitos e ferramentas concretas. Zero infantilização.</div>
      </div>
      <h3>Script — sequência de mensagens</h3>
      <div class="chat">
        <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>, aqui é a <span class="var">{sdr}</span>, da equipe do Dr. Alberto 💛 Você fez o teste de preparo e deixou seu contato — seu resultado saiu e eu fiz questão de te chamar pessoalmente.</div>
        <div class="msg sdr"><span class="who">SDR</span>Seu perfil é o da <b>Gestante Defensora</b>: você respondeu que seu maior medo é perder o controle e sofrer violência obstétrica. Posso te falar uma coisa séria sobre isso?</div>
        <div class="msg lead"><span class="who">Ela</span>Pode falar</div>
        <div class="msg sdr"><span class="who">SDR</span>Esse medo não é exagero seu. É real, acontece todos os dias no Brasil, e o Dr. Alberto fala disso abertamente há 30 anos. A diferença entre ser vítima e ser protagonista é uma só: saber EXATAMENTE o que dizer e o que exigir, em cada momento.</div>
        <div class="msg sdr"><span class="who">SDR</span>Uma dica já, de presente: você sabia que pode registrar em cartório o seu plano de parto e que a equipe é obrigada a justificar por escrito qualquer intervenção fora dele? A maioria das mulheres nunca ouviu isso.</div>
        <div class="msg lead"><span class="who">Ela</span>Não sabia disso não!</div>
        <div class="msg sdr"><span class="who">SDR</span>Pois é. O curso tem um módulo inteiro de <b>Defesa Contra Violência Obstétrica</b>: frases prontas para cada situação, seus direitos por lei, e o Planner de Parto que impede que decidam por você. É o seu escudo, montado por quem está do SEU lado.</div>
        <div class="msg sdr"><span class="who">SDR</span>Essa semana: <b>de R$497 por R$297</b> (até 12x), garantia de 30 dias. Menos que uma consulta particular — para nunca mais entrar numa sala de parto desarmada. Te mando o link?</div>
      </div>
      <h3>Objeção típica do perfil B</h3>
      <dl class="objecoes">
        <dt>Meu plano é ter doula, isso não resolve?</dt>
        <dd>"Doula é maravilhosa — e o Dr. Alberto incentiva! Mas a doula não pode falar por você em decisão médica: a voz que a equipe é obrigada a ouvir é a SUA. O curso prepara exatamente essa voz. Doula + você preparada é o time completo. Inclusive tem aula sobre como escolher e usar bem a doula 😉"</dd>
      </dl>
    </div>
  </div>
</section>

<section id="perfilC">
  <div class="perfil pc">
    <div class="perfil-head">
      <span class="tag">C</span>
      <div><h2>Gestante Confusa</h2><p>Afogada em informação contraditória · não sabe em quem confiar</p></div>
    </div>
    <div class="perfil-body">
      <div class="essencia">
        <div class="box"><b>A dor real</b>Ela JÁ estudou muito — e piorou. Cada fonte diz uma coisa. A dor não é falta de informação, é falta de um filtro confiável.</div>
        <div class="box"><b>O tom que converte</b>Curadoria e autoridade. Menos é mais: você oferece o fim da pesquisa infinita, não mais conteúdo.</div>
      </div>
      <h3>Script — sequência de mensagens</h3>
      <div class="chat">
        <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>! Sou a <span class="var">{sdr}</span>, da equipe do Dr. Alberto Guimarães 💛 Seu resultado do teste ficou pronto e eu queria te entregar pessoalmente.</div>
        <div class="msg sdr"><span class="who">SDR</span>Seu perfil é o da gestante que precisa de <b>curadoria, não de mais informação</b>. Deixa eu adivinhar: quanto mais você pesquisa, mais confusa e ansiosa fica? 😅</div>
        <div class="msg lead"><span class="who">Ela</span>SIM! Cada lugar fala uma coisa diferente…</div>
        <div class="msg sdr"><span class="who">SDR</span>Então respira, porque isso NÃO é culpa sua. É matematicamente impossível organizar 50 fontes que se contradizem. O que resolve não é mais um vídeo — é UMA fonte confiável que separa o que importa do que é ruído.</div>
        <div class="msg sdr"><span class="who">SDR</span>E aí entra o diferencial: o Dr. Alberto é o único médico brasileiro certificado pelo Instituto Michel Odent (na França), com +3.000 partos no Einstein, Pro Matre e Santa Joana, nota 5,0 no Doctoralia. Tudo no curso é baseado em evidência científica — sem achismo de internet.</div>
        <div class="msg sdr"><span class="who">SDR</span>Na prática: você para de pesquisar. Segue a trilha dele — aulas curtas, na ordem certa — e pronto. A paz de saber que a fonte é confiável não tem preço… mas essa semana tem: <b>de R$497 por R$297</b>, até 12x, 30 dias de garantia.</div>
        <div class="msg sdr"><span class="who">SDR</span>Quer encerrar hoje a era das madrugadas pesquisando no Google? Te mando o acesso agora 🌷</div>
      </div>
      <h3>Objeção típica do perfil C</h3>
      <dl class="objecoes">
        <dt>Tem tanta coisa grátis no YouTube…</dt>
        <dd>"Tem — e foi o grátis que te deixou assim, né? 😅 O problema do grátis é que ele vem sem ordem, sem filtro e sem responsabilidade: qualquer um posta qualquer coisa. O que você paga aqui não é 'conteúdo', é a curadoria de 30 anos de um especialista + a ordem certa + a segurança de poder confiar. E com garantia: se em 30 dias você achar que o YouTube resolvia, devolvemos tudo."</dd>
      </dl>
    </div>
  </div>
</section>

<section id="perfilD">
  <div class="perfil pd">
    <div class="perfil-head">
      <span class="tag">D</span>
      <div><h2>Gestante Quase Pronta</h2><p>Estudou, tem plano · falta o roteiro prático da hora H</p></div>
    </div>
    <div class="perfil-body">
      <div class="essencia">
        <div class="box"><b>A dor real</b>Ela fez o dever de casa e tem orgulho disso. O medo secreto: "e se na hora H eu travar?". Falta a ponte entre saber e fazer.</div>
        <div class="box"><b>O tom que converte</b>Reconhecimento + lapidação. Elogie de verdade o preparo dela e venda a última peça, não o básico.</div>
      </div>
      <h3>Script — sequência de mensagens</h3>
      <div class="chat">
        <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>! Aqui é a <span class="var">{sdr}</span>, da equipe do Dr. Alberto 💛 Vi seu resultado do teste e preciso começar te dando os parabéns.</div>
        <div class="msg sdr"><span class="who">SDR</span>Sério: seu perfil é o da <b>Gestante Quase Pronta</b> — você é minoria. A maioria chega no parto sem ter estudado nada. Você já fez o dever de casa. 👏</div>
        <div class="msg lead"><span class="who">Ela</span>Ah, que bom! Tento me informar bastante…</div>
        <div class="msg sdr"><span class="who">SDR</span>E aparece. Agora deixa eu te fazer a pergunta que o Dr. Alberto faz para as gestantes preparadas: se AGORA a equipe sugerir uma intervenção que não está no seu plano, você sabe exatamente o que dizer, com quais palavras? E o seu plano tem versão B e C se o cenário mudar?</div>
        <div class="msg lead"><span class="who">Ela</span>Boa pergunta… acho que não 😬</div>
        <div class="msg sdr"><span class="who">SDR</span>É a lacuna clássica de quem sabe muito: falta o ROTEIRO da hora H. É exatamente a peça final que o curso entrega — simulações de cenário, frases prontas, plano B e C, e o papel ativo do seu acompanhante (tem módulo só pra ele, vocês assistem juntos).</div>
        <div class="msg sdr"><span class="who">SDR</span>Pra quem já caminhou tanto quanto você, é o investimento com o melhor custo-benefício possível: <b>de R$497 por R$297</b>, até 12x, garantia de 30 dias. Fecha esse ciclo com chave de ouro? Te mando o link 💛</div>
      </div>
      <h3>Objeção típica do perfil D</h3>
      <dl class="objecoes">
        <dt>Acho que já sei o suficiente…</dt>
        <dd>"Pode ser que sim! Faz um teste comigo: me responde em uma frase o que você diria se o plantonista sugerisse ocitocina sem indicação clara. … Se a resposta veio na ponta da língua, você realmente está pronta e eu te parabenizo. Se titubeou — é essa fluência que o roteiro da hora H treina. 30 dias de garantia: se você entrar e confirmar que já sabia tudo, é só pedir o reembolso."</dd>
      </dl>
    </div>
  </div>
</section>

<section id="etapas">
  <h2>Ajuste pela etapa do CRM</h2>
  <p class="sub">O card no Deep OS mostra em que ponto ela parou. A abertura muda; o resto segue o script do perfil.</p>

  <div class="card">
    <h3 style="margin-top:0">📱 Parcial — deixou o WhatsApp e não terminou o quiz</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>! Aqui é a <span class="var">{sdr}</span>, da equipe do Dr. Alberto 💛 Vi que você começou sua análise de preparo para o parto e não deu tempo de terminar — acontece, a vida de gestante é corrida! 😅</div>
      <div class="msg sdr"><span class="who">SDR</span>Quer que eu te envie por aqui mesmo o resultado parcial + o link pra concluir? Faltam só 3 perguntinhas (1 minuto). Suas respostas ficaram salvas 😉</div>
    </div>
    <p class="note">Objetivo: fazê-la CONCLUIR o quiz (o resultado personaliza a venda). Se ela não quiser concluir, siga com o script do perfil já identificado.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">✅ Completo — terminou o quiz e viu a oferta, mas não clicou</h3>
    <p>Use o script completo do perfil dela (acima), começando pela entrega do resultado. Ela já viu o preço na página — não esconda a oferta, reapresente com a garantia na frente.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">🔥 Chegou no checkout — clicou em comprar e não pagou <em>(PRIORIDADE MÁXIMA — falar em até 1h)</em></h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>! <span class="var">{sdr}</span> aqui, da equipe do Dr. Alberto 💛 Vi que você chegou pertinho de garantir seu acesso ao Parto Sem Medo e algo te interrompeu — foi alguma dúvida ou deu algum problema na página?</div>
      <div class="msg lead"><span class="who">Ela</span>Ah, fiquei na dúvida se vale a pena…</div>
      <div class="msg sdr"><span class="who">SDR</span>Justo! Deixa eu simplificar: R$297 em até 12x (dá menos de R$1 por dia da sua gestação), acesso por 2 anos, e 30 dias de garantia incondicional — você entra, assiste tudo, e se não fizer sentido, devolvemos 100%, sem perguntas. O risco é todo nosso.</div>
      <div class="msg sdr"><span class="who">SDR</span>Seu acesso ficou reservado aqui: <b>pay.cakto.com.br/fodx2af</b> — qualquer travada no pagamento eu resolvo contigo em 2 minutos. Vamos? 🌷</div>
    </div>
    <p class="note">Se o problema foi o preço, ofereça o parcelamento ANTES de qualquer outra coisa: "em 12x fica R$30,68 por mês — cabe?"</p>
  </div>
</section>

<section id="objecoes">
  <h2>Objeções universais</h2>
  <p class="sub">Regra: primeiro concorde com o sentimento, depois responda o fato, e termine devolvendo uma pergunta.</p>
  <div class="card">
    <dl class="objecoes">
      <dt>Está caro / não tenho dinheiro agora</dt>
      <dd>"Te entendo — orçamento de gestante é apertado mesmo. Por isso o valor foi pensado assim: R$297 em até 12x dá <b>R$30,68 por mês</b>, menos que um lanche por semana. E com 30 dias de garantia, você testa sem risco nenhum. Se eu conseguir esse parcelamento pra você, faz sentido?"</dd>
      <dt>Preciso falar com meu marido</dt>
      <dd>"Perfeito — e ele PRECISA estar dentro dessa decisão mesmo, porque o curso tem um módulo inteiro só para o acompanhante (é o que transforma o parceiro de espectador em guardião do parto). Quer que eu te mande um resuminho pronto pra encaminhar pra ele? Assim vocês decidem juntos hoje ainda 😉"</dd>
      <dt>Vou pensar / depois eu vejo</dt>
      <dd>"Claro, decisão importante merece calma 💛 Só um lembrete carinhoso: diferente de outras compras, essa tem prazo natural — o bebê vem na data dele, e cada semana de preparo conta. O que exatamente você precisa pensar? Talvez eu consiga te ajudar agora."</dd>
      <dt>Já tenho um médico ótimo</dt>
      <dd>"Que maravilha — metade do caminho feito! A outra metade é o que acontece quando o doutor não está na sala: as horas de trabalho de parto, as decisões rápidas, o que VOCÊ autoriza ou não. O curso prepara exatamente essa metade. Seu médico vai adorar uma paciente preparada 😉"</dd>
      <dt>E se eu ganhar o bebê antes de terminar o curso?</dt>
      <dd>"Ótima pergunta! Existe uma trilha acelerada pro 3º trimestre com o essencial na frente — muitas alunas concluem em 1 semana. E o acesso é de 2 anos: o pós-parto também está lá te esperando."</dd>
      <dt>Quero parto normal, mas posso acabar em cesárea…</dt>
      <dd>"E o curso te prepara para os DOIS cenários — inclusive cesárea humanizada e respeitosa, com contato pele a pele e você participando das decisões. Preparo não é sobre a via de parto, é sobre você ser protagonista em qualquer cenário."</dd>
    </dl>
  </div>
</section>

<section id="cadencia">
  <h2>Cadência de follow-up</h2>
  <p class="sub">Sem resposta ≠ não. Gestante vive ocupada. Persistência gentil, com valor novo a cada toque — nunca "oi, sumida".</p>
  <div class="card table-scroll">
    <table>
      <thead><tr><th>Quando</th><th>Mensagem</th></tr></thead>
      <tbody>
        <tr><td>+5 min</td><td>Primeira mensagem (script do perfil). Lead 🔥 checkout: em até 1 hora, sempre.</td></tr>
        <tr><td>+2 h</td><td>"Oi <span class="var">{nome}</span>! Ficou alguma dúvida sobre seu resultado? Estou por aqui 💛"</td></tr>
        <tr><td>Dia 1</td><td>Valor novo: envie o depoimento em texto da Patrícia (29 anos, mesma fase que ela se possível) + "me lembrou você".</td></tr>
        <tr><td>Dia 3</td><td>Áudio curto e humano: retomar o medo principal dela + 1 dica prática + oferta com garantia.</td></tr>
        <tr><td>Dia 7</td><td>Último toque: "Vou deixar seu resultado guardado aqui, tá? Se quiser retomar seu preparo, é só me chamar. Torcendo por você e pelo bebê 💛" — e registra no CRM como frio.</td></tr>
      </tbody>
    </table>
  </div>
  <div class="alert" style="margin-top:14px">
    <b>Higiene de CRM</b>
    Toda conversa termina com o card atualizado no Deep OS: estágio novo, anotação de 1 linha ("objeção: preço; follow D3 agendado") e próxima tarefa criada. Card sem anotação = venda que a próxima colega não consegue continuar.
  </div>
</section>

<footer>Parto Sem Medo · Dr. Alberto Guimarães — material interno da equipe de vendas · Oferta vigente: R$297 (de R$497) · Checkout: pay.cakto.com.br/fodx2af</footer>
</div>

<script>
document.querySelectorAll(".msg.sdr").forEach(function(m){
  var b=document.createElement("button");
  b.className="copy"; b.type="button"; b.textContent="copiar";
  b.addEventListener("click", async function(){
    var t=[].slice.call(m.childNodes)
      .filter(function(n){return !(n.nodeType===1&&(n.classList.contains("who")||n.classList.contains("copy")))})
      .map(function(n){return n.textContent}).join("").trim();
    try{
      await navigator.clipboard.writeText(t);
      b.textContent="copiado ✓";
      setTimeout(function(){b.textContent="copiar"},1500);
    }catch(e){
      var ta=document.createElement("textarea"); ta.value=t; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy"); ta.remove();
      b.textContent="copiado ✓"; setTimeout(function(){b.textContent="copiar"},1500);
    }
  });
  m.appendChild(b);
});
</script>
</body>
</html>`;

export async function GET(request) {
  const key = new URL(request.url).searchParams.get("key");
  if (!EXPORT_KEY || key !== EXPORT_KEY) {
    return new Response("unauthorized", { status: 401 });
  }
  return new Response(HTML, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
