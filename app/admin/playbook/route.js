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
    --gold:#B08D57; --gold-bg:#F7F0E4;
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
      --gold:#D8B87E; --gold-bg:#33291C;
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
    --gold:#D8B87E; --gold-bg:#33291C;
  }
  *{box-sizing:border-box}
  body{background:var(--ground); color:var(--ink); font-family:system-ui,-apple-system,"Segoe UI",sans-serif; line-height:1.6; margin:0; padding:0 20px 90px}
  .wrap{max-width:840px; margin:0 auto}
  header.hero{padding:56px 0 8px}
  .eyebrow{font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--rose); font-weight:700}
  h1{font-family:Georgia,"Times New Roman",serif; font-size:clamp(30px,5vw,44px); line-height:1.1; margin:10px 0 10px; text-wrap:balance}
  .lede{color:var(--ink-2); max-width:62ch; font-size:17px}
  nav.chips{display:flex; flex-wrap:wrap; gap:8px; margin:26px 0 8px}
  nav.chips a{text-decoration:none; color:var(--ink-2); background:var(--card); border:1px solid var(--line); border-radius:999px; padding:7px 14px; font-size:13px; font-weight:600}
  nav.chips a:hover,nav.chips a:focus-visible{color:var(--rose); border-color:var(--rose); outline:none}
  section{margin-top:56px}
  h2{font-family:Georgia,serif; font-size:27px; margin:0 0 8px; text-wrap:balance}
  .sub{color:var(--ink-2); margin:0 0 22px; max-width:64ch}
  h3{font-size:14px; letter-spacing:.09em; text-transform:uppercase; color:var(--ink-3); margin:30px 0 12px}
  .card{background:var(--card); border:1px solid var(--line); border-radius:16px; padding:22px 24px; margin-bottom:14px}

  /* mantra / princípio */
  .mantra{background:var(--gold-bg); border-left:4px solid var(--gold); border-radius:0 14px 14px 0; padding:18px 22px; margin:18px 0; font-family:Georgia,serif; font-size:18px; line-height:1.5; color:var(--ink)}
  .mantra small{display:block; font-family:system-ui,sans-serif; font-size:12.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--gold); margin-bottom:8px; font-weight:700}

  ul.rules{margin:0; padding:0; list-style:none; display:grid; gap:12px}
  ul.rules li{display:flex; gap:12px; align-items:flex-start}
  ul.rules li::before{content:"—"; color:var(--rose); font-weight:700; flex:0 0 auto}

  ol.steps{margin:0; padding:0; list-style:none; counter-reset:s; display:grid}
  ol.steps li{counter-increment:s; display:grid; grid-template-columns:46px 1fr; gap:16px; padding:18px 0; border-bottom:1px dashed var(--line)}
  ol.steps li:last-child{border-bottom:none}
  ol.steps li::before{content:counter(s); font-family:Georgia,serif; font-size:22px; color:var(--rose); background:var(--rose-soft); width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center}
  ol.steps strong{display:block; margin-bottom:3px; font-size:16px}
  ol.steps p{margin:0 0 6px; color:var(--ink-2); font-size:15px}
  ol.steps .exemplo{font-style:italic; color:var(--rose); font-size:14.5px}

  .chat{display:grid; gap:8px; margin:14px 0 4px}
  .msg{max-width:88%; padding:11px 15px; border-radius:15px; font-size:15px; line-height:1.55; position:relative}
  .sdr{background:var(--wa-bubble); color:var(--wa-ink); justify-self:end; border-bottom-right-radius:4px; padding-bottom:30px}
  .lead{background:var(--lead-bubble); color:var(--ink); justify-self:start; border-bottom-left-radius:4px; font-style:italic}
  .msg .who{display:block; font-size:11px; letter-spacing:.08em; text-transform:uppercase; font-weight:700; opacity:.65; margin-bottom:4px; font-style:normal}
  .var{background:var(--rose-soft); color:var(--rose); border-radius:6px; padding:0 5px; font-weight:700; font-style:normal}
  .pausa{text-align:center; font-size:12.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-3); margin:4px 0}
  .note{font-size:13.5px; color:var(--ink-3); margin:8px 0 0; border-left:2px solid var(--line); padding-left:12px}
  .porque{font-size:13.5px; color:var(--rose); margin:8px 0 0; font-weight:600}
  button.copy{position:absolute; right:8px; bottom:6px; font:600 11px system-ui; letter-spacing:.04em; color:var(--wa); background:transparent; border:1px solid var(--wa); border-radius:999px; padding:2px 10px; cursor:pointer}
  button.copy:hover{background:var(--wa); color:#fff}
  button.copy:focus-visible{outline:2px solid var(--wa); outline-offset:2px}

  .perfil{border-radius:18px; border:1px solid var(--line); overflow:hidden; margin-bottom:28px; background:var(--card)}
  .perfil-head{padding:22px 24px; display:flex; gap:14px; align-items:center}
  .perfil-head .tag{font-family:Georgia,serif; font-size:26px; width:54px; height:54px; border-radius:14px; display:flex; align-items:center; justify-content:center; flex:0 0 auto; color:#fff}
  .perfil-head h2{font-size:22px; margin:0}
  .perfil-head p{margin:3px 0 0; color:var(--ink-2); font-size:14px}
  .perfil-body{padding:8px 24px 24px}
  .pa .perfil-head{background:var(--pa-bg)} .pa .tag{background:var(--pa)}
  .pb .perfil-head{background:var(--pb-bg)} .pb .tag{background:var(--pb)}
  .pc .perfil-head{background:var(--pc-bg)} .pc .tag{background:var(--pc)}
  .pd .perfil-head{background:var(--pd-bg)} .pd .tag{background:var(--pd)}
  .essencia{display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:16px 0 6px}
  @media(max-width:640px){.essencia{grid-template-columns:1fr}}
  .essencia .box{background:var(--card-soft); border:1px solid var(--line); border-radius:12px; padding:13px 15px; font-size:14px}
  .essencia .box b{display:block; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-3); margin-bottom:5px}

  dl.objecoes{margin:0; display:grid; gap:18px}
  dl.objecoes dt{font-weight:700; font-size:15.5px}
  dl.objecoes dt::before{content:"\\201C"; color:var(--rose); font-family:Georgia,serif; font-size:22px; margin-right:2px}
  dl.objecoes dt::after{content:"\\201D"; color:var(--rose); font-family:Georgia,serif; font-size:22px; margin-left:2px}
  dl.objecoes dd{margin:8px 0 0}
  table{width:100%; border-collapse:collapse; font-size:14px}
  th,td{text-align:left; padding:11px 12px; border-bottom:1px solid var(--line); vertical-align:top}
  th{font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-3)}
  td:first-child{white-space:nowrap; font-weight:700; color:var(--rose); font-variant-numeric:tabular-nums}
  .table-scroll{overflow-x:auto}
  .alert{background:var(--warn-bg); color:var(--warn-ink); border-radius:14px; padding:17px 21px; font-size:14.5px}
  .alert b{display:block; margin-bottom:7px; letter-spacing:.08em; text-transform:uppercase; font-size:12px}
  footer{margin-top:70px; color:var(--ink-3); font-size:13px; text-align:center}
  a{color:var(--rose)}
</style>

<div class="wrap">
<header class="hero">
  <span class="eyebrow">Parto Sem Medo &middot; Equipe de Vendas</span>
  <h1>O Método da Conversa que Acolhe</h1>
  <p class="lede">Este playbook n&atilde;o ensina a vender um curso. Ensina a conduzir uma gestante at&eacute; a decis&atilde;o que ela j&aacute; queria tomar &mdash; com perguntas que a fazem se enxergar, hist&oacute;rias que a fazem se reconhecer, e um sil&ecirc;ncio bem colocado que vale mais que dez argumentos. Oferta vigente: <strong>de R$497 por R$297</strong> (at&eacute; 12x), garantia incondicional de 30 dias.</p>
  <nav class="chips">
    <a href="#filosofia">A filosofia</a>
    <a href="#arco">O arco da conversa</a>
    <a href="#perguntas">Perguntas que viram venda</a>
    <a href="#perfilA">A &middot; Ansiosa</a>
    <a href="#perfilB">B &middot; Defensora</a>
    <a href="#perfilC">C &middot; Confusa</a>
    <a href="#perfilD">D &middot; Quase Pronta</a>
    <a href="#etapas">Por etapa do CRM</a>
    <a href="#objecoes">Obje&ccedil;&otilde;es</a>
    <a href="#silencio">Quebra-sil&ecirc;ncio</a>
    <a href="#cadencia">Follow-up</a>
  </nav>
</header>

<section id="filosofia">
  <h2>A filosofia: ela &eacute; a protagonista, voc&ecirc; &eacute; a parteira da decis&atilde;o</h2>
  <p class="sub">O Dr. Alberto n&atilde;o "faz o parto" &mdash; ele acompanha a mulher que pare. Nossa venda funciona igual: n&oacute;s n&atilde;o convencemos ninguém. N&oacute;s acompanhamos uma mulher enquanto ela chega, sozinha, na conclus&atilde;o de que merece estar preparada.</p>

  <div class="mantra">
    <small>O princ&iacute;pio que muda tudo</small>
    Quando <em>eu</em> digo, ela pode duvidar. Quando <em>ela</em> diz, virou verdade.<br>
    Por isso 70&#37; da conversa s&atilde;o perguntas &mdash; e os 30&#37; restantes s&atilde;o o eco do que ela mesma respondeu.
  </div>

  <div class="card">
    <h3 style="margin-top:0">As 6 leis do acolhimento que vende</h3>
    <ul class="rules">
      <li><span><strong>Pergunte duas vezes antes de afirmar uma.</strong> Cada afirma&ccedil;&atilde;o sua &eacute; um argumento; cada resposta dela &eacute; um compromisso. Compromissos vendem, argumentos cansam.</span></li>
      <li><span><strong>Devolva as palavras dela.</strong> Se ela escreveu "me sinto perdida", voc&ecirc; escreve "perdida" &mdash; nunca "confusa". A palavra exata dela &eacute; a prova de que voc&ecirc; escutou.</span></li>
      <li><span><strong>Nomeie o sentimento antes de resolver o problema.</strong> "Isso &eacute; solid&atilde;o, e faz sentido voc&ecirc; sentir" abre mais portas que qualquer benef&iacute;cio do curso.</span></li>
      <li><span><strong>Deixe o sil&ecirc;ncio trabalhar.</strong> Depois de uma pergunta profunda, n&atilde;o mande outra mensagem. O incômodo do espa&ccedil;o vazio &eacute; onde ela pensa &mdash; e pensar &eacute; o que converte.</span></li>
      <li><span><strong>Ela decide, voc&ecirc; ilumina.</strong> Nunca "voc&ecirc; precisa". Sempre "o que voc&ecirc; acha que te ajudaria mais agora?". Autonomia &eacute; o produto, comece entregando na conversa.</span></li>
      <li><span><strong>Tenha coragem de perder a venda.</strong> "Se n&atilde;o for a sua hora, tudo bem, eu vou torcer por voc&ecirc; do mesmo jeito" &eacute; a frase que mais fecha vendas neste playbook. Porque ela &eacute; verdadeira.</span></li>
    </ul>
  </div>

  <div class="alert">
    <b>A linha que nunca cruzamos</b>
    N&oacute;s vendemos <em>preparo, informa&ccedil;&atilde;o e protagonismo</em> &mdash; nunca um desfecho de parto. Nada de "voc&ecirc; vai ter parto normal", nada de medo m&eacute;dico como alavanca, nada de orienta&ccedil;&atilde;o cl&iacute;nica. Se ela trouxer d&uacute;vida de sa&uacute;de: "essa &eacute; uma &oacute;tima pergunta pro seu pr&eacute;-natal &mdash; e o curso te ensina exatamente como fazer ela". Acolher tamb&eacute;m &eacute; saber a hora de n&atilde;o vender.
  </div>
</section>

<section id="arco">
  <h2>O arco da conversa &mdash; 7 movimentos</h2>
  <p class="sub">N&atilde;o &eacute; um script linear, &eacute; uma jornada. Ela sai de "quem &eacute; voc&ecirc;?" e chega em "como fa&ccedil;o pra come&ccedil;ar?" &mdash; e a virada acontece no movimento 4, quando ela escuta a pr&oacute;pria voz dizendo o que quer.</p>
  <div class="card">
    <ol class="steps">
      <li><div><strong>O reconhecimento</strong>
        <p>Ela precisa saber, em 5 segundos, que voc&ecirc; sabe quem ela &eacute;. Cite o que ela respondeu no quiz. N&atilde;o &eacute; um contato frio &mdash; &eacute; a continua&ccedil;&atilde;o de uma conversa que ela come&ccedil;ou.</p>
        <p class="exemplo">"Oi {nome}! Aqui &eacute; a {sdr}, da equipe do Dr. Alberto. Voc&ecirc; fez sua an&aacute;lise de preparo e contou que seu maior medo &eacute; {medo} &mdash; e foi isso que me fez querer te chamar pessoalmente."</p></div></li>

      <li><div><strong>A permiss&atilde;o</strong>
        <p>Nunca despeje. Pe&ccedil;a licen&ccedil;a para entrar. Um "posso?" transforma interrup&ccedil;&atilde;o em convite &mdash; e o "pode" dela &eacute; o primeiro sim de muitos.</p>
        <p class="exemplo">"Posso te contar o que seu resultado revelou? &Eacute; r&aacute;pido, mas acho que vai te fazer pensar."</p></div></li>

      <li><div><strong>O espelho</strong>
        <p>Descreva a vida interior dela melhor do que ela conseguiria. Quando ela pensa "&eacute; exatamente assim que eu me sinto", voc&ecirc; deixou de ser vendedora e virou algu&eacute;m que entende.</p>
        <p class="exemplo">"Deixa eu adivinhar: voc&ecirc; deita &agrave; noite, o beb&ecirc; mexe, e vem aquela mistura de amor imenso com um frio na barriga que voc&ecirc; nem sabe explicar direito. E a&iacute; voc&ecirc; pega o celular pra pesquisar &mdash; e dorme pior ainda."</p></div></li>

      <li><div><strong>A pergunta que vira a chave</strong>
        <p>O cora&ccedil;&atilde;o do m&eacute;todo. Uma pergunta que ela nunca se fez, e cuja resposta a coloca frente a frente com a pr&oacute;pria decis&atilde;o. Fa&ccedil;a e <b>espere</b>. N&atilde;o preencha o sil&ecirc;ncio.</p>
        <p class="exemplo">"Se o beb&ecirc; nascesse na pr&oacute;xima semana &mdash; voc&ecirc; se sentiria pronta pra tomar as decis&otilde;es que v&atilde;o aparecer na sala de parto?"</p></div></li>

      <li><div><strong>O eco</strong>
        <p>Ela respondeu. Agora devolva a resposta dela como se fosse uma descoberta &mdash; porque &eacute;. Aqui ela para de ser convencida e passa a se convencer.</p>
        <p class="exemplo">"Ent&atilde;o o que voc&ecirc; me disse foi: 'eu amo esse beb&ecirc;, mas eu ainda n&atilde;o me sinto pronta'. {nome}, essa frase n&atilde;o &eacute; uma falha sua. &Eacute; o mapa exato do que a gente vai resolver."</p></div></li>

      <li><div><strong>A ponte (n&atilde;o o pitch)</strong>
        <p>Nunca apresente "o curso". Apresente <em>a pe&ccedil;a exata</em> que responde a frase que ela acabou de dizer. O produto entra como consequ&ecirc;ncia l&oacute;gica, quase &oacute;bvia.</p>
        <p class="exemplo">"O que transforma esse 'ainda n&atilde;o me sinto pronta' em 'eu sei o que fazer' tem nome: &eacute; o roteiro da hora H, com as frases prontas pra cada momento. &Eacute; a parte que ningu&eacute;m ensina &mdash; e a que o Dr. Alberto ensina primeiro."</p></div></li>

      <li><div><strong>O convite (com sa&iacute;da)</strong>
        <p>Ofere&ccedil;a com a porta aberta dos dois lados. Escassez aqui &eacute; a real: o parto tem data. E a garantia tira o risco dela e coloca em n&oacute;s.</p>
        <p class="exemplo">"S&atilde;o R$297, at&eacute; 12x &mdash; e voc&ecirc; tem 30 dias pra entrar, ver tudo e desistir se n&atilde;o fizer sentido. O risco &eacute; todo nosso. Quer que eu te mande o acesso pra voc&ecirc; come&ccedil;ar hoje?"</p></div></li>
    </ol>
  </div>
</section>

<section id="perguntas">
  <h2>O arsenal: perguntas que fazem ela se vender</h2>
  <p class="sub">Guarde estas na ponta da l&iacute;ngua. Cada uma foi desenhada para produzir uma resposta que ela n&atilde;o consegue desdizer depois. Use uma por vez &mdash; e sempre espere a resposta.</p>

  <div class="card">
    <h3 style="margin-top:0">Perguntas de consci&ecirc;ncia &mdash; ela percebe onde est&aacute;</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">Escala</span>De 0 a 10, o quanto voc&ecirc; se sente preparada pro dia do parto hoje?</div>
      <div class="msg sdr"><span class="who">O salto</span>E o que precisaria acontecer pra esse {nota} virar um 9?</div>
      <div class="msg sdr"><span class="who">Proje&ccedil;&atilde;o</span>Se o beb&ecirc; resolvesse nascer semana que vem, voc&ecirc; se sentiria pronta?</div>
      <div class="msg sdr"><span class="who">O incômodo real</span>O que mais tira seu sono quando voc&ecirc; pensa no parto: a dor, perder o controle, ou n&atilde;o saber o que fazer na hora?</div>
    </div>
    <p class="porque">Por que funciona: uma nota baixa dita por ela &eacute; um problema que ela mesma admitiu. Voc&ecirc; nunca precisou dizer que ela est&aacute; despreparada.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Perguntas de desejo &mdash; ela verbaliza o que quer</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">A cena dos sonhos</span>Fecha os olhos um segundo: como voc&ecirc; imagina o momento em que vai ver o rosto do seu beb&ecirc; pela primeira vez? Me conta com suas palavras 💛</div>
      <div class="msg sdr"><span class="who">O sentimento-alvo</span>Se voc&ecirc; pudesse escolher UMA palavra pra descrever como quer se sentir no dia do parto, qual seria?</div>
      <div class="msg sdr"><span class="who">A hist&oacute;ria futura</span>Daqui a alguns anos, quando seu filho perguntar como foi o dia em que ele nasceu &mdash; que hist&oacute;ria voc&ecirc; quer poder contar?</div>
    </div>
    <p class="porque">Por que funciona: ela escreve o desejo com as pr&oacute;prias m&atilde;os. A partir da&iacute;, o curso deixa de ser um gasto e vira o caminho at&eacute; a cena que ela acabou de descrever.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Perguntas de lacuna &mdash; ela sente o que falta</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">O teste pr&aacute;tico</span>Uma pergunta sincera: se agora a equipe sugerisse uma interven&ccedil;&atilde;o que n&atilde;o estava no combinado, voc&ecirc; saberia exatamente o que dizer?</div>
      <div class="msg sdr"><span class="who">A depend&ecirc;ncia</span>E se, na hora, seu m&eacute;dico de confian&ccedil;a n&atilde;o estiver de plant&atilde;o &mdash; quem defende as suas escolhas?</div>
      <div class="msg sdr"><span class="who">O plano B</span>Seu plano de parto prev&ecirc; o que fazer se o cen&aacute;rio mudar no meio do caminho?</div>
    </div>
    <p class="porque">Por que funciona: n&atilde;o cria medo &mdash; revela uma lacuna concreta que ela j&aacute; intu&iacute;a. E lacuna revelada pede preenchimento.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Perguntas de decis&atilde;o &mdash; ela conclui sozinha</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">Autopermiss&atilde;o</span>Voc&ecirc; cuida de todo mundo. Deixa eu te perguntar: o que voc&ecirc; acha que VOC&Ecirc; merece viver nesse dia?</div>
      <div class="msg sdr"><span class="who">O custo de n&atilde;o agir</span>Se daqui a um m&ecirc;s tudo continuar exatamente como est&aacute; hoje &mdash; como voc&ecirc; imagina que vai se sentir?</div>
      <div class="msg sdr"><span class="who">Fechamento suave</span>Pelo que voc&ecirc; mesma me contou, parece que o que te falta &eacute; {lacuna}. Faz sentido pra voc&ecirc; come&ccedil;ar por a&iacute;?</div>
      <div class="msg sdr"><span class="who">Convite final</span>Quer que eu te mande o acesso pra voc&ecirc; come&ccedil;ar ainda hoje?</div>
    </div>
    <p class="porque">Por que funciona: "faz sentido pra voc&ecirc;?" devolve o poder. Ela n&atilde;o est&aacute; aceitando uma oferta &mdash; est&aacute; confirmando a pr&oacute;pria conclus&atilde;o.</p>
  </div>
</section>

<section id="perfilA">
  <div class="perfil pa">
    <div class="perfil-head">
      <span class="tag">A</span>
      <div><h2>Gestante Ansiosa</h2><p>O medo dela n&atilde;o tem nome &mdash; tem tamanho</p></div>
    </div>
    <div class="perfil-body">
      <div class="essencia">
        <div class="box"><b>O que ela sente por dentro</b>N&atilde;o &eacute; um medo, s&atilde;o todos ao mesmo tempo. Ela l&ecirc; tudo, anota tudo, e quanto mais organiza a lista do enxoval, mais sente que a parte importante segue sem controle.</div>
        <div class="box"><b>O que ela precisa ouvir</b>Que a ansiedade dela &eacute; sinal de amor, n&atilde;o de fraqueza. E que existe uma ordem &mdash; um passo primeiro, depois o outro.</div>
      </div>

      <div class="mantra"><small>A virada emocional</small>De "eu preciso dar conta de tudo" para "eu s&oacute; preciso do pr&oacute;ximo passo".</div>

      <h3>A conversa completa</h3>
      <div class="chat">
        <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>! Aqui &eacute; a <span class="var">{sdr}</span>, da equipe do Dr. Alberto Guimar&atilde;es 💛 Voc&ecirc; fez sua an&aacute;lise de preparo pro parto ontem &mdash; e teve uma coisa no seu resultado que me fez querer te chamar pessoalmente.</div>
        <div class="msg sdr"><span class="who">SDR</span>Posso te contar o que foi?</div>
        <div class="msg lead"><span class="who">Ela</span>Pode sim!</div>
        <div class="msg sdr"><span class="who">SDR</span>Voc&ecirc; caiu no perfil da gestante que precisa transformar ansiedade em preparo. E deixa eu adivinhar como &eacute; a sua noite: voc&ecirc; deita, o beb&ecirc; mexe, vem aquele amor gigante &mdash; e junto um frio na barriga que voc&ecirc; nem sabe explicar direito. A&iacute; voc&ecirc; pega o celular pra pesquisar e dorme pior ainda. &Eacute; mais ou menos assim?</div>
        <div class="msg lead"><span class="who">Ela</span>Exatamente isso 😭 como voc&ecirc; sabia</div>
        <div class="msg sdr"><span class="who">SDR</span>Porque eu escuto isso todos os dias, <span class="var">{nome}</span>. E vou te falar uma coisa que talvez ningu&eacute;m tenha te dito: essa ansiedade n&atilde;o &eacute; fraqueza sua. &Eacute; o sinal de que voc&ecirc; entendeu o tamanho do que vem a&iacute;. Mulher que n&atilde;o se importa n&atilde;o perde sono.</div>
        <div class="msg sdr"><span class="who">SDR</span>O problema n&atilde;o &eacute; voc&ecirc;. &Eacute; que ningu&eacute;m te deu um MAPA &mdash; e sem mapa a cabe&ccedil;a tenta se preparar pra tudo ao mesmo tempo. &Eacute; exaustivo.</div>
        <div class="msg sdr"><span class="who">SDR &middot; PERGUNTA-CHAVE</span>Me responde uma coisa, sem pensar muito: de 0 a 10, o quanto voc&ecirc; se sente preparada pro dia do parto hoje?</div>
        <div class="pausa">&#8595; espere. n&atilde;o mande mais nada. &#8595;</div>
        <div class="msg lead"><span class="who">Ela</span>uns 4… no m&aacute;ximo 5</div>
        <div class="msg sdr"><span class="who">SDR</span>Obrigada pela sinceridade 💛 Agora a segunda parte: o que precisaria acontecer pra esse 4 virar um 9?</div>
        <div class="msg lead"><span class="who">Ela</span>acho que saber o que fazer… ter alguma coisa organizada, sabe? sinto que t&aacute; tudo solto na minha cabe&ccedil;a</div>
        <div class="msg sdr"><span class="who">SDR &middot; ECO</span>Olha o que voc&ecirc; acabou de me dizer: "sinto que t&aacute; tudo solto na minha cabe&ccedil;a". <span class="var">{nome}</span>, isso n&atilde;o &eacute; um defeito seu &mdash; &eacute; a descri&ccedil;&atilde;o exata do que o m&eacute;todo resolve. Voc&ecirc; n&atilde;o precisa de mais informa&ccedil;&atilde;o. Precisa de ORDEM.</div>
        <div class="msg sdr"><span class="who">SDR</span>O Dr. Alberto costuma dizer que a gestante ansiosa &eacute; a que mais r&aacute;pido se transforma &mdash; porque quando ela finalmente recebe o passo a passo, aquela energia toda vira prepara&ccedil;&atilde;o. Em +3.000 partos ele viu isso acontecer centenas de vezes.</div>
        <div class="msg sdr"><span class="who">SDR</span>&Eacute; isso que o Parto Sem Medo faz: aulas de 10-15 minutos, na ordem certa, come&ccedil;ando pelo "por onde eu come&ccedil;o" e terminando no seu plano de parto pronto. Voc&ecirc; para de decidir o que estudar &mdash; s&oacute; segue.</div>
        <div class="msg sdr"><span class="who">SDR &middot; CONVITE</span>Est&aacute; em condi&ccedil;&atilde;o especial: de R$497 por R$297, at&eacute; 12x, com 30 dias de garantia incondicional &mdash; entra, v&ecirc; tudo, e se n&atilde;o aliviar essa sensa&ccedil;&atilde;o de "solto na cabe&ccedil;a", devolvemos 100&#37;. O risco &eacute; nosso, n&atilde;o seu.</div>
        <div class="msg sdr"><span class="who">SDR</span>Quer que eu te mande o acesso? Em 10 minutinhos voc&ecirc; j&aacute; assiste a primeira aula &mdash; e hoje &agrave; noite j&aacute; deita com uma coisa a menos na cabe&ccedil;a 🌷</div>
      </div>
      <h3>Se ela hesitar</h3>
      <dl class="objecoes">
        <dt>Vou deixar pra depois, estou muito sobrecarregada</dt>
        <dd>"Te entendo demais &mdash; e olha o paradoxo: &eacute; justamente por estar sobrecarregada que o mapa alivia. Ele tira da sua cabe&ccedil;a a tarefa de decidir o que estudar. S&atilde;o 10 minutinhos, no seu ritmo, na fila do pr&eacute;-natal. <b>Me responde uma coisa: se daqui a um m&ecirc;s tudo continuar exatamente igual, como voc&ecirc; acha que vai estar se sentindo?</b>"</dd>
      </dl>
    </div>
  </div>
</section>

<section id="perfilB">
  <div class="perfil pb">
    <div class="perfil-head">
      <span class="tag">B</span>
      <div><h2>Gestante Defensora</h2><p>Ela j&aacute; sabe o que pode dar errado &mdash; e n&atilde;o quer colo, quer ferramenta</p></div>
    </div>
    <div class="perfil-body">
      <div class="essencia">
        <div class="box"><b>O que ela sente por dentro</b>Indigna&ccedil;&atilde;o misturada com medo. Ela leu relatos, talvez tenha vivido um, e a ideia de ser mais uma na estat&iacute;stica a deixa em alerta permanente.</div>
        <div class="box"><b>O que ela precisa ouvir</b>Que o medo dela &eacute; leg&iacute;timo (n&atilde;o exagero!) e que existe uma diferen&ccedil;a pr&aacute;tica entre saber do risco e saber se defender dele.</div>
      </div>

      <div class="mantra"><small>A virada emocional</small>De "eu tenho medo de ser passada pra tr&aacute;s" para "eu sei exatamente o que dizer".</div>

      <h3>A conversa completa</h3>
      <div class="chat">
        <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>, aqui &eacute; a <span class="var">{sdr}</span>, da equipe do Dr. Alberto 💛 Vi seu resultado da an&aacute;lise e fiz quest&atilde;o de te chamar &mdash; sua resposta sobre o que mais te tira o sono me marcou.</div>
        <div class="msg sdr"><span class="who">SDR</span>Voc&ecirc; disse que teme perder o controle e sofrer viol&ecirc;ncia obst&eacute;trica. Posso te falar uma coisa s&eacute;ria sobre isso?</div>
        <div class="msg lead"><span class="who">Ela</span>pode</div>
        <div class="msg sdr"><span class="who">SDR</span>Esse medo n&atilde;o &eacute; exagero seu. &Eacute; real, acontece todos os dias no Brasil, e o Dr. Alberto fala disso abertamente h&aacute; 30 anos &mdash; inclusive dentro dos hospitais onde atende. Voc&ecirc; n&atilde;o est&aacute; sendo dram&aacute;tica. Voc&ecirc; est&aacute; sendo informada.</div>
        <div class="msg sdr"><span class="who">SDR &middot; PERGUNTA-CHAVE</span>Agora deixa eu te fazer a pergunta que separa quem tem medo de quem tem defesa: se AGORA, no meio do trabalho de parto, algu&eacute;m sugerisse uma interven&ccedil;&atilde;o que n&atilde;o est&aacute; no seu plano &mdash; voc&ecirc; saberia exatamente o que dizer? Com quais palavras?</div>
        <div class="pausa">&#8595; espere. essa pergunta precisa doer um pouquinho. &#8595;</div>
        <div class="msg lead"><span class="who">Ela</span>sinceramente? n&atilde;o. eu ia ficar sem rea&ccedil;&atilde;o na hora 😞</div>
        <div class="msg sdr"><span class="who">SDR &middot; ECO</span>&Eacute; a resposta mais honesta que existe &mdash; e a mesma de 9 em cada 10 mulheres. Repara: voc&ecirc; SABE do risco, mas ainda n&atilde;o tem a FERRAMENTA. E &eacute; nessa dist&acirc;ncia entre saber e agir que a viol&ecirc;ncia obst&eacute;trica acontece.</div>
        <div class="msg sdr"><span class="who">SDR</span>Um presente pra voc&ecirc; agora, independente do que decidir: seu plano de parto pode ser registrado em cart&oacute;rio, e a equipe precisa justificar por escrito qualquer interven&ccedil;&atilde;o fora dele. A maioria das mulheres nunca ouviu isso.</div>
        <div class="msg lead"><span class="who">Ela</span>eu n&atilde;o sabia disso!! 😳</div>
        <div class="msg sdr"><span class="who">SDR</span>Pois &eacute;. E tem um m&oacute;dulo inteiro s&oacute; disso: Defesa Contra Viol&ecirc;ncia Obst&eacute;trica &mdash; frases prontas pra cada situa&ccedil;&atilde;o, seus direitos por lei, e o Planner que impede que decidam por voc&ecirc;. N&atilde;o &eacute; teoria: &eacute; roteiro.</div>
        <div class="msg sdr"><span class="who">SDR &middot; PERGUNTA DE DESEJO</span>Antes de eu te falar de valor, me responde: se voc&ecirc; pudesse escolher UMA palavra pra descrever como quer se sentir na sala de parto, qual seria?</div>
        <div class="msg lead"><span class="who">Ela</span>respeitada</div>
        <div class="msg sdr"><span class="who">SDR &middot; CONVITE</span>Respeitada. Guarda essa palavra 💛 &Eacute; exatamente isso que a gente treina &mdash; e custa R$297 (de R$497), at&eacute; 12x, com 30 dias de garantia. Menos que uma consulta particular pra nunca mais entrar numa sala de parto desarmada. Te mando o acesso?</div>
      </div>
      <h3>Se ela hesitar</h3>
      <dl class="objecoes">
        <dt>Vou ter doula, isso n&atilde;o resolve?</dt>
        <dd>"Doula &eacute; maravilhosa e o Dr. Alberto incentiva muito! S&oacute; que existe um detalhe legal importante: a doula n&atilde;o pode decidir por voc&ecirc;. A &uacute;nica voz que a equipe &eacute; obrigada a ouvir na decis&atilde;o m&eacute;dica &eacute; a SUA. <b>Ent&atilde;o te pergunto: essa voz, hoje, est&aacute; preparada?</b> Doula + voc&ecirc; preparada &eacute; o time completo &mdash; tem at&eacute; aula sobre como escolher e usar bem a doula 😉"</dd>
      </dl>
    </div>
  </div>
</section>

<section id="perfilC">
  <div class="perfil pc">
    <div class="perfil-head">
      <span class="tag">C</span>
      <div><h2>Gestante Confusa</h2><p>Ela j&aacute; estudou demais &mdash; e ficou pior</p></div>
    </div>
    <div class="perfil-body">
      <div class="essencia">
        <div class="box"><b>O que ela sente por dentro</b>Exaust&atilde;o mental. Ela pesquisou tanto que hoje tem 50 vozes contradit&oacute;rias na cabe&ccedil;a e nenhuma certeza. Come&ccedil;a a duvidar do pr&oacute;prio julgamento.</div>
        <div class="box"><b>O que ela precisa ouvir</b>Que o problema nunca foi ela &mdash; foi a fonte. E que existe permiss&atilde;o pra PARAR de pesquisar.</div>
      </div>

      <div class="mantra"><small>A virada emocional</small>De "n&atilde;o sei em quem confiar" para "eu escolhi em quem confiar".</div>

      <h3>A conversa completa</h3>
      <div class="chat">
        <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>! Sou a <span class="var">{sdr}</span>, da equipe do Dr. Alberto Guimar&atilde;es 💛 Sua an&aacute;lise ficou pronta e eu queria te entregar pessoalmente, porque seu perfil tem uma particularidade.</div>
        <div class="msg sdr"><span class="who">SDR</span>Voc&ecirc; &eacute; a gestante que precisa de CURADORIA, n&atilde;o de mais informa&ccedil;&atilde;o. Deixa eu chutar uma coisa: quanto mais voc&ecirc; pesquisa, mais confusa e ansiosa fica, n&eacute;? 😅</div>
        <div class="msg lead"><span class="who">Ela</span>SIM! cada lugar fala uma coisa, eu j&aacute; nem sei mais no que acreditar</div>
        <div class="msg sdr"><span class="who">SDR</span>Ent&atilde;o respira, porque eu vou te dar uma not&iacute;cia boa: isso N&Atilde;O &eacute; culpa sua. &Eacute; matematicamente imposs&iacute;vel organizar 50 fontes que se contradizem. Voc&ecirc; n&atilde;o falhou &mdash; voc&ecirc; foi soterrada.</div>
        <div class="msg sdr"><span class="who">SDR &middot; PERGUNTA-CHAVE</span>Me conta uma coisa: quantas horas voc&ecirc; acha que j&aacute; gastou pesquisando sobre parto? E, dessas horas, quanto voc&ecirc; sente que virou seguran&ccedil;a de verdade?</div>
        <div class="pausa">&#8595; espere. a conta que ela faz na cabe&ccedil;a vale mais que qualquer argumento. &#8595;</div>
        <div class="msg lead"><span class="who">Ela</span>nossa… muitas horas. e seguran&ccedil;a mesmo? quase nenhuma 😔</div>
        <div class="msg sdr"><span class="who">SDR &middot; ECO</span>Muitas horas, quase nenhuma seguran&ccedil;a. <span class="var">{nome}</span>, essa frase &eacute; o diagn&oacute;stico perfeito. O que te falta n&atilde;o &eacute; conte&uacute;do &mdash; &eacute; algu&eacute;m confi&aacute;vel que separe o que importa do que &eacute; ru&iacute;do. Uma fonte s&oacute;, pra voc&ecirc; poder parar.</div>
        <div class="msg sdr"><span class="who">SDR</span>E &eacute; por isso que o Dr. Alberto faz diferen&ccedil;a nesse perfil: &eacute; o &uacute;nico m&eacute;dico brasileiro certificado pelo Instituto Michel Odent (Fran&ccedil;a), +3.000 partos, atende no Einstein, Pro Matre e Santa Joana, nota 5,0 com 82 avalia&ccedil;&otilde;es no Doctoralia. Tudo baseado em evid&ecirc;ncia &mdash; zero achismo de internet.</div>
        <div class="msg sdr"><span class="who">SDR</span>Na pr&aacute;tica, o que muda no seu dia: voc&ecirc; para de pesquisar. Segue a trilha dele, na ordem, aulinhas curtas. E aquela aba do navegador com 15 artigos abertos… pode fechar.</div>
        <div class="msg sdr"><span class="who">SDR &middot; CONVITE</span>S&atilde;o R$297 (de R$497), at&eacute; 12x, 30 dias de garantia. Voc&ecirc; est&aacute; a um clique de encerrar a era das madrugadas no Google. Quero te mandar o acesso &mdash; posso?</div>
      </div>
      <h3>Se ela hesitar</h3>
      <dl class="objecoes">
        <dt>Tem tanta coisa gr&aacute;tis no YouTube&hellip;</dt>
        <dd>"Tem &mdash; e foi o gr&aacute;tis que te deixou nesse cansa&ccedil;o, n&eacute;? 😅 O gr&aacute;tis vem sem ordem, sem filtro e sem ningu&eacute;m respondendo por ele. O que voc&ecirc; paga aqui n&atilde;o &eacute; 'conte&uacute;do': &eacute; a curadoria de 30 anos + a sequ&ecirc;ncia certa + o direito de confiar e parar de procurar. <b>Quanto vale pra voc&ecirc; dormir sem aquela sensa&ccedil;&atilde;o de que ficou faltando ler alguma coisa?</b> E se em 30 dias voc&ecirc; achar que o YouTube resolvia, devolvemos tudo."</dd>
      </dl>
    </div>
  </div>
</section>

<section id="perfilD">
  <div class="perfil pd">
    <div class="perfil-head">
      <span class="tag">D</span>
      <div><h2>Gestante Quase Pronta</h2><p>Ela fez tudo certo &mdash; e tem um medo secreto</p></div>
    </div>
    <div class="perfil-body">
      <div class="essencia">
        <div class="box"><b>O que ela sente por dentro</b>Orgulho leg&iacute;timo do quanto se preparou &mdash; e um receio que ela quase n&atilde;o admite: "e se, na hora, eu travar?".</div>
        <div class="box"><b>O que ela precisa ouvir</b>Reconhecimento sincero primeiro. Depois, a lacuna espec&iacute;fica &mdash; nunca o b&aacute;sico, que ela j&aacute; domina.</div>
      </div>

      <div class="mantra"><small>A virada emocional</small>De "eu sei bastante" para "eu sei &mdash; mas ainda n&atilde;o treinei".</div>

      <h3>A conversa completa</h3>
      <div class="chat">
        <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>! Aqui &eacute; a <span class="var">{sdr}</span>, da equipe do Dr. Alberto 💛 Vi o resultado da sua an&aacute;lise e preciso come&ccedil;ar te dando os parab&eacute;ns, sinceramente.</div>
        <div class="msg sdr"><span class="who">SDR</span>Voc&ecirc; caiu no perfil "Quase Pronta" &mdash; e isso &eacute; minoria aqui. A maior parte das gestantes chega no parto sem ter estudado nada. Voc&ecirc; j&aacute; fez o dever de casa 👏</div>
        <div class="msg lead"><span class="who">Ela</span>ai que bom ouvir isso! eu me esforcei bastante mesmo 🥹</div>
        <div class="msg sdr"><span class="who">SDR</span>E aparece. Por isso mesmo eu n&atilde;o vou te falar do b&aacute;sico &mdash; voc&ecirc; j&aacute; sabe. Vou te fazer a pergunta que o Dr. Alberto faz justamente pras gestantes preparadas. Posso?</div>
        <div class="msg lead"><span class="who">Ela</span>pode!</div>
        <div class="msg sdr"><span class="who">SDR &middot; PERGUNTA-CHAVE</span>Imagina a cena: voc&ecirc; est&aacute; em trabalho de parto, cansada, o plantonista entra e sugere uma interven&ccedil;&atilde;o que n&atilde;o estava combinada. Que palavras exatas voc&ecirc; usa? E se o cen&aacute;rio mudar de novo, seu plano tem um B e um C?</div>
        <div class="pausa">&#8595; espere. ela &eacute; inteligente, vai perceber sozinha. &#8595;</div>
        <div class="msg lead"><span class="who">Ela</span>caramba… eu sei o que EU quero, mas n&atilde;o sei bem como falar na hora. e plano B, confesso que n&atilde;o pensei 😬</div>
        <div class="msg sdr"><span class="who">SDR &middot; ECO</span>Olha que interessante o que voc&ecirc; percebeu sozinha: voc&ecirc; sabe o que quer, mas ainda n&atilde;o treinou COMO defender. Essa &eacute; a lacuna cl&aacute;ssica de quem estudou muito &mdash; a dist&acirc;ncia entre saber e fazer na hora H, com dor, cansa&ccedil;o e press&atilde;o.</div>
        <div class="msg sdr"><span class="who">SDR</span>&Eacute; exatamente essa a &uacute;ltima pe&ccedil;a do m&eacute;todo: simula&ccedil;&otilde;es de cen&aacute;rio, frases prontas pra cada situa&ccedil;&atilde;o, plano B e C mapeados, e o m&oacute;dulo do acompanhante &mdash; que transforma seu parceiro em guardi&atilde;o ativo em vez de espectador nervoso.</div>
        <div class="msg sdr"><span class="who">SDR &middot; PERGUNTA DE DESEJO</span>Uma &uacute;ltima pergunta antes do valor: daqui a alguns anos, quando seu filho perguntar como foi o dia em que ele nasceu &mdash; que hist&oacute;ria voc&ecirc; quer poder contar?</div>
        <div class="msg lead"><span class="who">Ela</span>que eu estava no comando. que foi do meu jeito 💛</div>
        <div class="msg sdr"><span class="who">SDR &middot; CONVITE</span>Ent&atilde;o &eacute; s&oacute; isso que falta: transformar tudo que voc&ecirc; j&aacute; sabe em comando na hora H. R$297 (de R$497), at&eacute; 12x, 30 dias de garantia &mdash; pra quem j&aacute; caminhou tanto, &eacute; o &uacute;ltimo passo com o melhor custo-benef&iacute;cio. Fechamos esse ciclo com chave de ouro?</div>
      </div>
      <h3>Se ela hesitar</h3>
      <dl class="objecoes">
        <dt>Acho que j&aacute; sei o suficiente&hellip;</dt>
        <dd>"Pode ser que sim! E se for, eu vou ser a primeira a te aplaudir. Faz um teste comigo: <b>me responde em uma frase o que voc&ecirc; diria se sugerissem ocitocina sem indica&ccedil;&atilde;o clara.</b> … Se veio na ponta da l&iacute;ngua, voc&ecirc; est&aacute; pronta mesmo. Se titubeou, &eacute; s&oacute; flu&ecirc;ncia que falta &mdash; e flu&ecirc;ncia se treina. Com 30 dias de garantia, o teste &eacute; gr&aacute;tis na pr&aacute;tica."</dd>
      </dl>
    </div>
  </div>
</section>

<section id="etapas">
  <h2>O ponto onde ela parou muda a primeira frase</h2>
  <p class="sub">O card no CRM mostra a etapa. Ela n&atilde;o &eacute; um "lead" &mdash; &eacute; uma mulher que chegou at&eacute; um degrau espec&iacute;fico e parou por um motivo espec&iacute;fico. Abra pelo degrau; depois siga o arco do perfil dela.</p>

  <div class="card">
    <h3 style="margin-top:0">📱 Parcial &mdash; deixou o WhatsApp e n&atilde;o terminou</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>! Aqui &eacute; a <span class="var">{sdr}</span>, da equipe do Dr. Alberto 💛 Vi que voc&ecirc; come&ccedil;ou sua an&aacute;lise de preparo e a vida interrompeu no meio &mdash; acontece direto por aqui, principalmente com gestante 😅</div>
      <div class="msg sdr"><span class="who">SDR</span>Suas respostas ficaram salvinhas. Quer que eu te mande o link pra concluir? Faltam 3 perguntinhas, literalmente 1 minuto &mdash; e a&iacute; eu te entrego o resultado completo por aqui.</div>
    </div>
    <p class="note">Objetivo desta etapa: fazer ela CONCLUIR. O resultado &eacute; o que personaliza toda a venda depois. Se ela n&atilde;o quiser terminar, siga direto pelo perfil que o quiz j&aacute; identificou.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">✅ Completo &mdash; terminou, viu a oferta, n&atilde;o clicou</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>! <span class="var">{sdr}</span> aqui, da equipe do Dr. Alberto 💛 Voc&ecirc; concluiu sua an&aacute;lise e caiu no perfil <span class="var">{perfil}</span>. Posso te explicar em 1 minuto o que isso diz sobre voc&ecirc;? Tem uma parte que costuma surpreender.</div>
    </div>
    <p class="note">Ela j&aacute; viu o pre&ccedil;o &mdash; ent&atilde;o n&atilde;o esconda. Reapresente com a garantia NA FRENTE do valor: "30 dias pra testar, R$297 se voc&ecirc; ficar". Depois, siga o arco completo do perfil.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">🔥 Chegou no checkout &mdash; clicou em comprar e n&atilde;o finalizou <em>(prioridade m&aacute;xima: falar em at&eacute; 1h)</em></h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">SDR</span>Oi <span class="var">{nome}</span>! <span class="var">{sdr}</span> aqui, da equipe do Dr. Alberto 💛 Vi que voc&ecirc; chegou at&eacute; a &uacute;ltima tela pra garantir seu acesso e algo interrompeu. Antes de qualquer coisa: a p&aacute;gina abriu certinho pra voc&ecirc;? &Agrave;s vezes o banco trava o cart&atilde;o na primeira tentativa e a gente resolve isso em 2 minutinhos.</div>
      <div class="msg lead"><span class="who">Ela</span>n&atilde;o, abriu sim… eu que fiquei na d&uacute;vida se vale a pena</div>
      <div class="msg sdr"><span class="who">SDR</span>Justo &mdash; e obrigada pela sinceridade 💛 Deixa eu te devolver a pergunta de um jeito diferente: voc&ecirc; chegou at&eacute; a &uacute;ltima tela. Isso me diz que uma parte de voc&ecirc; QUER muito estar preparada. O que essa parte est&aacute; esperando ouvir pra ter certeza?</div>
      <div class="pausa">&#8595; espere. a resposta dela &eacute; a obje&ccedil;&atilde;o real. &#8595;</div>
      <div class="msg sdr"><span class="who">SDR &middot; se for pre&ccedil;o</span>Ent&atilde;o vamos simplificar: s&atilde;o 12x de R$30,68. Menos de R$1 por dia da sua gesta&ccedil;&atilde;o. E os 30 dias de garantia significam que voc&ecirc; pode entrar hoje, ver TUDO, e pedir o dinheiro de volta se n&atilde;o fizer sentido. Nesse arranjo, o risco &eacute; nosso &mdash; o seu &eacute; zero.</div>
      <div class="msg sdr"><span class="who">SDR</span>Seu acesso ficou reservado aqui: <b>pay.cakto.com.br/fodx2af</b> &mdash; se travar em qualquer etapa, me chama que eu resolvo contigo na hora 🌷</div>
    </div>
    <p class="porque">Regra de ouro deste degrau: comece por SUPORTE, nunca por press&atilde;o. Quem chegou no checkout j&aacute; se convenceu &mdash; algo pr&aacute;tico ou uma d&uacute;vida pontual atrapalhou. Sua fun&ccedil;&atilde;o &eacute; remover o obst&aacute;culo, n&atilde;o reconvencer.</p>
  </div>
</section>

<section id="objecoes">
  <h2>Obje&ccedil;&otilde;es: concorde, reenquadre, devolva a pergunta</h2>
  <p class="sub">Nunca rebata. A f&oacute;rmula &eacute; sempre a mesma: <strong>1)</strong> valide o sentimento de verdade, <strong>2)</strong> reenquadre com um fato ou uma imagem, <strong>3)</strong> devolva uma pergunta que a fa&ccedil;a decidir. Quem pergunta por &uacute;ltimo, conduz.</p>
  <div class="card">
    <dl class="objecoes">
      <dt>Est&aacute; caro / n&atilde;o tenho dinheiro agora</dt>
      <dd>"Te entendo &mdash; or&ccedil;amento de gestante &eacute; apertado mesmo, tem mil coisas pra comprar ao mesmo tempo. Por isso ficou em 12x de R$30,68: menos de R$1 por dia. Deixa eu te fazer uma pergunta sincera, sem julgamento nenhum: <b>de tudo que voc&ecirc; j&aacute; comprou pro beb&ecirc; &mdash; e voc&ecirc; comprou com amor &mdash; quanto foi investido em VOC&Ecirc; chegar preparada nesse dia?</b>"</dd>

      <dt>Preciso falar com meu marido</dt>
      <dd>"Perfeito, e ele PRECISA participar dessa decis&atilde;o mesmo &mdash; tem um m&oacute;dulo inteiro s&oacute; pro acompanhante, &eacute; o que os pais mais elogiam. Quer que eu monte um resuminho de 5 linhas pra voc&ecirc; s&oacute; encaminhar pra ele? <b>E me conta: se ele falar 'amor, vai fundo', voc&ecirc; come&ccedil;a hoje?</b>"</dd>

      <dt>Vou pensar / depois eu vejo</dt>
      <dd>"Claro, decis&atilde;o importante merece calma 💛 S&oacute; um lembrete carinhoso: diferente de quase tudo que a gente compra, essa tem prazo natural &mdash; quem marca a data &eacute; o beb&ecirc;. <b>Me ajuda a te ajudar: o que exatamente voc&ecirc; precisa pensar? Se for algo que eu consiga esclarecer agora, resolvemos juntas.</b>"</dd>

      <dt>J&aacute; tenho um m&eacute;dico &oacute;timo</dt>
      <dd>"Que maravilha, metade do caminho feito! A outra metade &eacute; o que acontece quando ele n&atilde;o est&aacute; na sala: as horas de trabalho de parto, o plantonista que voc&ecirc; nunca viu, as decis&otilde;es r&aacute;pidas. <b>Voc&ecirc; j&aacute; perguntou pro seu m&eacute;dico o que fazer se ele n&atilde;o estiver de plant&atilde;o no seu dia?</b> O curso prepara VOC&Ecirc; &mdash; e m&eacute;dico bom ama paciente preparada 😉"</dd>

      <dt>E se eu ganhar o beb&ecirc; antes de terminar?</dt>
      <dd>"&Oacute;tima pergunta &mdash; e a resposta te acalma: existe uma trilha acelerada pro 3&ordm; trimestre, com o essencial na frente. Muitas alunas concluem em 1 semana. E o acesso &eacute; de 2 anos: o p&oacute;s-parto tamb&eacute;m est&aacute; l&aacute;, esperando voc&ecirc;. <b>Voc&ecirc; est&aacute; com quantas semanas?</b> Me fala que eu te digo por onde come&ccedil;ar."</dd>

      <dt>Quero parto normal, mas posso acabar em ces&aacute;rea&hellip;</dt>
      <dd>"E o curso prepara voc&ecirc; pros DOIS cen&aacute;rios &mdash; inclusive ces&aacute;rea humanizada, com pele a pele, acompanhante presente e voc&ecirc; participando das decis&otilde;es. Preparo n&atilde;o &eacute; sobre a via de parto: &eacute; sobre voc&ecirc; ser protagonista em qualquer cen&aacute;rio. <b>Faz sentido pra voc&ecirc; estar pronta pros dois caminhos?</b>"</dd>

      <dt>Vou fazer sozinha, com o que leio na internet</dt>
      <dd>"Respeito demais &mdash; e olha, a informa&ccedil;&atilde;o est&aacute; a&iacute; mesmo. S&oacute; que ela vem solta, contradit&oacute;ria e sem ordem, e o que a gente entrega &eacute; justamente a sequ&ecirc;ncia e a curadoria de quem fez +3.000 partos. <b>Uma pergunta s&oacute;: quanto tempo voc&ecirc; teria que gastar pra montar sozinha o que j&aacute; est&aacute; pronto aqui?</b> Seu tempo agora tamb&eacute;m &eacute; do beb&ecirc; 💛"</dd>
    </dl>
  </div>
</section>

<section id="silencio">
  <h2>Quebra-sil&ecirc;ncio &mdash; quando ela para de responder</h2>
  <p class="sub">Sil&ecirc;ncio n&atilde;o &eacute; "n&atilde;o". &Eacute; vida acontecendo. A regra: <strong>uma pergunta s&oacute;</strong>, f&aacute;cil de responder (n&uacute;mero, letra ou sim/n&atilde;o), sem cobran&ccedil;a nenhuma &mdash; "sumida" &eacute; palavra proibida &mdash; e sempre com sa&iacute;da digna.</p>

  <div class="card">
    <h3 style="margin-top:0">1 &middot; Ignorou a primeira mensagem</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o A &middot; n&uacute;mero f&aacute;cil</span><span class="var">{nome}</span>, me responde s&oacute; com um n&uacute;mero: de 0 a 10, quanto o medo do parto te incomoda hoje?</div>
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o B &middot; escolha simples</span>Seu resultado est&aacute; aqui comigo 💛 Prefere que eu mande em <b>&aacute;udio de 1 minuto</b> ou em <b>3 linhas de texto</b>?</div>
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o C &middot; curiosidade</span>Posso te contar a &uacute;nica coisa do seu resultado que me chamou aten&ccedil;&atilde;o? &Eacute; rapidinho 🌷</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">2 &middot; Respondeu e sumiu no meio da conversa</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o A &middot; check honesto</span><span class="var">{nome}</span>, te perdi? 😅 Se eu falei algo que n&atilde;o fez sentido, me diz com sinceridade &mdash; prometo que ajusto.</div>
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o B &middot; gancho da fase</span>Me lembra: voc&ecirc; est&aacute; com quantas semanas? Quero te mandar uma dica espec&iacute;fica pra sua fase 🌷</div>
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o C &middot; loop aberto</span>Ia te contar o erro que 9 em cada 10 gestantes com o seu perfil cometem no 3&ordm; trimestre&hellip; ainda quer saber?</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">3 &middot; Sumiu depois de receber o resultado</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o A &middot; valida&ccedil;&atilde;o</span>O que voc&ecirc; achou do seu resultado, <span class="var">{nome}</span>? Bateu com o que voc&ecirc; sente ou te surpreendeu?</div>
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o B &middot; valor primeiro</span>Quer que eu te mostre <b>o primeiro passo</b> que o Dr. Alberto recomenda pro seu perfil? &Eacute; de gra&ccedil;a e d&aacute; pra fazer hoje mesmo.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">4 &middot; Sumiu depois de ver o pre&ccedil;o 💰</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o A &middot; a letra m&aacute;gica</span><span class="var">{nome}</span>, vou perguntar sem rodeio e prometo n&atilde;o insistir: foi o <b>V</b>alor, o <b>M</b>omento, ou ficou <b>D</b>&uacute;vida se funciona pra voc&ecirc;? Me diz s&oacute; a letra 😊</div>
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o B &middot; risco zero</span>Talvez eu n&atilde;o tenha deixado claro: s&atilde;o 30 dias de garantia incondicional. Voc&ecirc; entra, assiste tudo, e se n&atilde;o fizer sentido devolvemos 100&#37;. <b>Com o risco todo do nosso lado, o que ainda te segura?</b></div>
    </div>
    <p class="porque">A op&ccedil;&atilde;o A tem a maior taxa de resposta do playbook: ela s&oacute; precisa digitar UMA letra &mdash; e te entrega a obje&ccedil;&atilde;o real de bandeja.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">5 &middot; Disse "vou falar com meu marido" e sumiu</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o A</span>E a&iacute;, conseguiram conversar? Se ele tiver qualquer d&uacute;vida, me manda que eu explico direto pra ele 😉</div>
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o B</span><span class="var">{nome}</span>, fiz um resuminho de 5 linhas pra facilitar a conversa de voc&ecirc;s. Quer que eu mande pra voc&ecirc; s&oacute; encaminhar?</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">6 &middot; Recebeu o link e n&atilde;o finalizou 🔥</h3>
    <div class="chat">
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o A &middot; suporte</span><span class="var">{nome}</span>, o link abriu direitinho? &Agrave;s vezes o banco trava na primeira tentativa &mdash; se foi isso, resolvo contigo em 2 minutos.</div>
      <div class="msg sdr"><span class="who">Op&ccedil;&atilde;o B &middot; a cena futura</span>Fecha os olhos um segundo: daqui a algumas semanas, voc&ecirc; na sala de parto <b>sabendo exatamente o que fazer</b>. &Eacute; essa mulher que est&aacute; a um clique. Vamos? pay.cakto.com.br/fodx2af</div>
    </div>
  </div>

  <div class="alert">
    <b>As 4 leis do quebra-sil&ecirc;ncio</b>
    1) Nunca dois toques no mesmo dia pro mesmo sil&ecirc;ncio. 2) Alterne o TIPO de pergunta &mdash; se n&uacute;mero n&atilde;o funcionou, tente escolha A/B. 3) M&aacute;ximo 3 tentativas por etapa; depois, cadência normal. 4) Qualquer resposta &mdash; at&eacute; um emoji &mdash; zera o contador e volta pro arco do perfil.
  </div>
</section>

<section id="cadencia">
  <h2>Cad&ecirc;ncia: persist&ecirc;ncia gentil, com valor novo</h2>
  <p class="sub">Cada toque precisa entregar algo &mdash; nunca cobrar. Se a mensagem n&atilde;o tem valor pr&oacute;prio, n&atilde;o mande.</p>
  <div class="card table-scroll">
    <table>
      <thead><tr><th>Quando</th><th>O que enviar</th></tr></thead>
      <tbody>
        <tr><td>+5 min</td><td>Primeira mensagem, pelo arco do perfil. Lead 🔥 checkout: em at&eacute; 1 hora, sempre.</td></tr>
        <tr><td>+2 h</td><td>"Oi <span class="var">{nome}</span>! Ficou alguma d&uacute;vida sobre seu resultado? Estou por aqui 💛"</td></tr>
        <tr><td>Dia 1</td><td>Valor novo: hist&oacute;ria da Patr&iacute;cia (mesma fase que ela, se poss&iacute;vel) + "me lembrou muito voc&ecirc;".</td></tr>
        <tr><td>Dia 3</td><td>&Aacute;udio curto e humano: retome o medo principal dela + 1 dica pr&aacute;tica + oferta com garantia na frente.</td></tr>
        <tr><td>Dia 7</td><td>Despedida com carinho: "Vou deixar seu resultado guardado aqui, t&aacute;? Se quiser retomar, &eacute; s&oacute; me chamar. Torcendo por voc&ecirc; e pelo beb&ecirc; 💛" &mdash; e marque como frio no CRM.</td></tr>
      </tbody>
    </table>
  </div>
  <div class="alert" style="margin-top:16px">
    <b>Higiene de CRM</b>
    Toda conversa termina com o card atualizado no Deep OS: est&aacute;gio novo, uma linha de anota&ccedil;&atilde;o ("obje&ccedil;&atilde;o: pre&ccedil;o; quer falar com marido; follow D3") e a pr&oacute;xima tarefa criada. Card sem anota&ccedil;&atilde;o &eacute; venda que a pr&oacute;xima colega n&atilde;o consegue continuar.
  </div>

  <div class="mantra" style="margin-top:26px">
    <small>Para lembrar antes de cada conversa</small>
    Do outro lado n&atilde;o tem um lead. Tem uma mulher com medo, carregando uma vida dentro dela.<br>
    Se voc&ecirc; a fizer se sentir capaz, ela compra. Se voc&ecirc; a fizer se sentir pressionada, ela some.<br>
    <strong>Acolher &eacute; a estrat&eacute;gia &mdash; e tamb&eacute;m &eacute; a coisa certa a fazer.</strong>
  </div>
</section>

<footer>Parto Sem Medo &middot; Dr. Alberto Guimar&atilde;es &mdash; material interno da equipe de vendas &middot; Oferta vigente: R$297 (de R$497) &middot; Checkout: pay.cakto.com.br/fodx2af</footer>
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
