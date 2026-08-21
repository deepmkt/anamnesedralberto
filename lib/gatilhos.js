// Gatilhos de resposta — mensagens geradas a partir das respostas reais do quiz.
// Cada gatilho aplica um mecanismo psicológico diferente e pede UMA resposta barata.
// Regras da casa: nunca prometer desfecho de parto, nunca dar conduta clínica,
// nunca inventar depoimento, sempre permitir que ela diga não.

const MEDO = {
  dor: {
    nome: "medo da dor",
    // entrega: valor real, sem venda
    entrega:
      "A dor do parto não é uma linha reta que só sobe. Ela vem em ondas, com pausas entre elas — e é nas pausas que o corpo descansa. Quem não sabe disso passa o trabalho de parto inteiro esperando a dor piorar; quem sabe, aprende a usar a pausa. Só essa mudança de leitura já muda a experiência de muita mulher.",
    menu: [
      "de noite, quando eu deito",
      "quando alguém me conta uma história de parto",
      "o tempo todo, meio de fundo",
    ],
    lacuna:
      "Tem uma coisa no seu resultado que quase ninguém marca junto com medo da dor — e quando aparece, costuma significar algo bem específico sobre o que realmente te assusta. Quer que eu te conte o que é?",
    correcao:
      "Deixa eu chutar uma coisa: não é exatamente a dor que te assusta. É a ideia de estar com dor e ninguém te explicar o que está acontecendo. Errei?",
    normalizacao:
      "Só pra você saber: entre as gestantes que responderam essa mesma análise, o medo da dor é o mais marcado de todos. Não é frescura e não é fraqueza — é o cérebro fazendo o trabalho dele.",
    binaria:
      "Uma pergunta de sim ou não: alguém já te explicou, com calma, o que acontece no seu corpo em cada fase do trabalho de parto?",
  },
  violencia: {
    nome: "medo de violência obstétrica",
    entrega:
      "O que protege uma mulher na sala de parto não é sorte nem simpatia da equipe: é ela saber o nome dos procedimentos e conseguir dizer uma frase inteira sobre eles. Quem chega sabendo perguntar \"qual é a indicação disso agora?\" muda o tom da conversa na hora.",
    menu: [
      "vi/ouvi uma história que me marcou",
      "aconteceu comigo ou com alguém muito próxima",
      "não aconteceu nada, mas eu li muito sobre",
    ],
    lacuna:
      "Tem uma frase — uma só — que muda o comportamento da equipe quando a mulher diz na hora certa. Não é briga, não é enfrentamento. Quer que eu te mande?",
    correcao:
      "Deixa eu chutar: você não tem medo de sentir dor. Você tem medo de estar deitada ali e alguém decidir por você sem te perguntar. Errei?",
    normalizacao:
      "Esse medo não é exagero. Ele é o segundo mais marcado na análise, e no Brasil ele tem razão de existir. Reconhecer isso é o primeiro passo — o segundo é saber o que fazer.",
    binaria:
      "Pergunta rápida, sim ou não: você já conversou com o seu obstetra sobre o que você aceita e o que você não aceita no parto?",
  },
  incapacidade: {
    nome: "medo de não dar conta",
    entrega:
      "Esse medo quase nunca é sobre o corpo — o corpo já sabe o que fazer, isso é biologia antiga. Ele quase sempre é sobre não ter um roteiro. Ninguém se sente pronta para algo que não consegue imaginar acontecendo. Quando a cena fica clara na cabeça, a sensação de \"não vou dar conta\" perde força sozinha.",
    menu: [
      "não me sinto pronta pro parto",
      "não me sinto pronta pra ser mãe",
      "as duas coisas, sendo bem sincera",
    ],
    lacuna:
      "Tem uma pergunta que eu faço pras gestantes que marcam isso, e a resposta quase sempre surpreende elas mesmas. Posso te fazer?",
    correcao:
      "Deixa eu chutar: por fora você está tocando tudo normalmente, e por dentro tem uma voz dizendo que todo mundo parece saber o que está fazendo, menos você. Errei?",
    normalizacao:
      "Quero te dizer uma coisa: mulher que não se sente pronta costuma ser exatamente a que mais leva a sério. Quem não se prepara é quem acha que já sabe.",
    binaria:
      "Sim ou não: tem alguém hoje com quem você consegue falar desse medo sem ouvir \"imagina, vai dar tudo certo\"?",
  },
  saude_bebe: {
    nome: "preocupação com a saúde do bebê",
    entrega:
      "Uma coisa que acalma muita mãe: o jeito como o parto acontece tem efeito direto nas primeiras horas do bebê — contato pele a pele, o momento de clampear o cordão, a primeira mamada. Não é detalhe de conforto, é cuidado com ele. E são justamente as partes que mais se perdem quando ninguém combinou nada antes.",
    menu: [
      "penso nisso todo dia",
      "só quando chega perto de exame/consulta",
      "depois que eu li ou ouvi alguma coisa",
    ],
    lacuna:
      "Tem um item da hora do nascimento que quase toda mãe descobre tarde demais, e que é justamente sobre o bebê — não sobre ela. Quer que eu te conte qual é?",
    correcao:
      "Deixa eu chutar: você aguentaria bem qualquer coisa que acontecesse com você. O que aperta o peito é a parte que envolve ele. Errei?",
    normalizacao:
      "Isso que você sente já é maternidade funcionando. Preocupação com o bebê é o motivo número um pelo qual as mulheres procuram preparo — você não está sozinha nem exagerando.",
    binaria:
      "Sim ou não: você já sabe o que pedir para que o seu bebê fique com você logo depois de nascer?",
  },
};

const TRIMESTRE = {
  "1": { rotulo: "1º trimestre", janela: "Você tem o luxo do tempo — dá pra fazer tudo com calma." },
  "2": { rotulo: "2º trimestre", janela: "Você está na janela boa: energia razoável e tempo suficiente." },
  "3": { rotulo: "3º trimestre", janela: "Você está na reta final, então o que a gente fizer agora precisa ser direto ao ponto." },
  "0": { rotulo: "fase de planejamento", janela: "Você está se preparando antes até de engravidar — isso é raríssimo." },
};

const PERFIL_NOME = {
  A: "Ansiedade por falta de mapa",
  B: "Protagonista em construção",
  C: "Sobrecarregada de informação",
  D: "Quase pronta — falta a última peça",
};

function primeiroNome(nome) {
  return String(nome || "").trim().split(/\s+/)[0] || "";
}

function dados(lead) {
  const r = lead.respostas || {};
  return {
    nome: primeiroNome(lead.nome),
    medo: MEDO[r.medo] || MEDO.dor,
    tri: TRIMESTRE[r.trimestre] || TRIMESTRE["2"],
    perfil: PERFIL_NOME[lead.perfil] || "",
    etapa: r.etapa,
  };
}

// ---------------------------------------------------------------------------
// Escada de gatilhos. Cada degrau = um mecanismo. Ordem = ordem de envio.
// ---------------------------------------------------------------------------
export function escadaDeGatilhos(lead, sdr = "Bebeto") {
  const d = dados(lead);
  const n = d.nome;
  const opcoes = d.medo.menu.map((m, i) => `${i + 1}️⃣ ${m}`).join("\n");

  const abertura =
    d.etapa === "chegou_checkout"
      ? `Oi ${n}! Aqui é o ${sdr}, da equipe do Dr. Alberto Guimarães 💛 Você chegou até a página de acesso do Parto Sem Medo hoje e alguma coisa te interrompeu no meio. Antes de qualquer coisa: a página abriu certinho pra você?`
      : d.etapa === "parcial_whatsapp"
      ? `Oi ${n}! Aqui é o ${sdr}, da equipe do Dr. Alberto Guimarães 💛 Você começou sua análise de preparo pro parto e deixou esse número pra receber o resultado. Você parou no meio — a vida interrompe mesmo — mas o que você já respondeu ficou salvo, então já dá pra eu te adiantar uma parte.`
      : `Oi ${n}! Aqui é o ${sdr}, da equipe do Dr. Alberto Guimarães 💛 Você fez a análise de preparo pro parto e deixou esse número pra receber o resultado. Tá aqui, como combinado:`;

  return [
    {
      id: "entrega",
      quando: "Nos primeiros 5 minutos",
      mecanismo: "Reciprocidade — entregar antes de pedir",
      porque:
        "Ela deu o número em troca de RECEBER algo. Se a primeira mensagem pede conversa em vez de entregar, vira isca e ela fecha. Entrega primeiro, sem cobrar nada.",
      texto: `${abertura}

📌 Seu perfil: ${d.perfil}
📌 O que mais pesa: ${d.medo.nome}
📌 Momento: ${d.tri.rotulo}

${d.medo.entrega}

${d.tri.janela}`,
    },
    {
      id: "menu",
      quando: "Logo em seguida, mensagem separada",
      mecanismo: "Menu numerado — resposta de 1 toque",
      porque:
        "Pergunta aberta exige que ela componha um texto. Menu numerado custa um dígito. O objetivo do 1º contato não é qualificar, é fazer o polegar se mexer.",
      texto: `Agora me responde só uma coisa, com um número — leva 5 segundos:

Esse ${d.medo.nome} aparece mais em qual hora?

${opcoes}

Pergunto porque a resposta muda o que eu te mando depois. 💛`,
    },
    {
      id: "lacuna",
      quando: "Mesmo dia, 3 a 4 horas depois",
      mecanismo: "Lacuna de informação (Loewenstein)",
      porque:
        "Curiosidade só dispara quando a lacuna é específica, delimitada e importante pra ela. 'Quer saber mais?' não é lacuna. 'Tem UMA frase que muda X' é.",
      texto: `${n}, ${d.medo.lacuna}`,
    },
    {
      id: "correcao",
      quando: "Dia 1 — 24h depois",
      mecanismo: "Chute + 'errei?' — o impulso de corrigir",
      porque:
        "Quase ninguém resiste a corrigir uma leitura errada sobre si mesma. E se você acertar, ela sente que foi lida de verdade. Os dois caminhos geram resposta.",
      texto: `${n}, ${d.medo.correcao}`,
    },
    {
      id: "normalizacao",
      quando: "Dia 2",
      mecanismo: "Normalizar o medo antes de perguntar",
      porque:
        "Gestante ansiosa se cala quando sente julgamento. A literatura de pré-natal é consistente: comunicação que normaliza o medo reduz ansiedade e abre conversa.",
      texto: `${d.medo.normalizacao}

${d.medo.binaria}`,
    },
    {
      id: "audio",
      quando: "Dia 3 — mandar em ÁUDIO de 20 a 30 segundos",
      mecanismo: "Mudança de canal + voz humana",
      porque:
        "Texto ignorado 3 vezes vira ruído. Áudio curto quebra o padrão, prova que tem gente do outro lado e é mais difícil de ignorar do que mais um balão de texto.",
      texto: `[ROTEIRO DO ÁUDIO — fale, não leia]

"Oi ${n}, é o ${sdr} de novo, da equipe do Dr. Alberto. Não vou te encher, é rapidinho. Eu fiquei pensando na sua análise, porque ${d.medo.nome} foi o que mais pesou pra você. Eu não quero te empurrar nada — só queria entender uma coisa e você me responde por áudio mesmo se for mais fácil: o que você já tentou fazer pra lidar com isso até agora? Só isso. Um beijo, boa semana."`,
    },
    {
      id: "retomada",
      quando: "Dia 4",
      mecanismo: "Retomada + prova social específica",
      porque:
        "As pessoas têm tendência robusta a retomar o que ficou pela metade (efeito Ovsiankina) — desde que você mostre exatamente onde retomar. Número específico convence mais que 'várias mulheres'.",
      texto: `${n}, essa semana eu conversei com outras gestantes que marcaram exatamente o mesmo que você: ${d.medo.nome}, ${d.tri.rotulo}.

Quase todas me disseram a mesma frase: "eu sei que preciso me preparar, só não sei por onde começar".

Se for esse o seu caso também, me manda um "por onde" que eu te mostro o primeiro passo — sem compromisso nenhum.`,
    },
    {
      id: "nao",
      quando: "Dia 5 — última mensagem",
      mecanismo: "Pergunta orientada ao NÃO (Chris Voss)",
      porque:
        "Dizer 'não' devolve controle pra ela e não custa nada — por isso responde. Só funciona depois de você ter dado algo antes; como abertura, é manipulação e ela sente.",
      texto: `${n}, vou parar de te escrever pra não virar chateação. Só me responde uma coisa, pode ser com uma palavra:

Você desistiu de se preparar pro parto, ou só não é agora?

Se for "não é agora", eu te procuro mais pra frente e tá tudo certo. Se for "desisti", eu respeito e some daqui — sem ressentimento nenhum. 💛`,
    },
  ];
}

// Mensagem inicial usada no link do WhatsApp (entrega + menu numa tacada só).
export function primeiraMensagem(lead, sdr = "Bebeto") {
  const e = escadaDeGatilhos(lead, sdr);
  return `${e[0].texto}\n\n—\n\n${e[1].texto}`;
}
