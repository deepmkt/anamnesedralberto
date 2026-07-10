export const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_URL || "https://pay.cakto.com.br/35objdm_667163";

export const INSTAGRAM_URL = "https://instagram.com/dralbertoguimaraes";
export const DR_FOTO = "/img/dr-alberto.jpg";

/*
  Cada opção tem:
    text, emoji, value
    feedback: { label, text }
      label -> frase curta de ROTULAÇÃO DE IDENTIDADE (negrito)
      text  -> parágrafo de acolhimento + micro-insight (reciprocidade)
  A rotulação faz a mãe agir de acordo com o "tipo de mãe" que dissemos que ela é
  (princípio de compromisso & consistência).
*/

export const questions = [
  {
    id: 1,
    key: "gestacao",
    title: "Esta é sua primeira gestação?",
    subtitle: "Vamos começar pelo seu momento. É rapidinho. 💛",
    options: [
      {
        text: "Sim, sou mãe de primeira viagem",
        emoji: "🌸",
        value: "primipara",
        feedback: {
          label: "Você é corajosa por buscar preparo já na primeira.",
          text: "A primeira gestação é uma montanha-russa de emoções — e o medo do desconhecido é o mais comum de todos. Só de estar aqui, você já está à frente da maioria.",
        },
      },
      {
        text: "Não, já tive outros filhos",
        emoji: "🤱",
        value: "multipara",
        feedback: {
          label: "Você já sabe que cada parto é uma história diferente.",
          text: "Mesmo com experiência, novos medos aparecem — às vezes justamente por causa do que você já viveu. Vamos entender como você chega desta vez.",
        },
      },
    ],
  },
  {
    id: 2,
    key: "trimestre",
    title: "Em qual fase da gestação você está?",
    subtitle: "Isso define quanto tempo temos para te preparar.",
    options: [
      {
        text: "1º Trimestre (até 12 semanas)",
        emoji: "🌱",
        value: "1",
        feedback: {
          label: "Você está no melhor momento possível para começar.",
          text: "O início é feito de transformações invisíveis. Quem se prepara agora chega no parto com uma vantagem enorme sobre o medo.",
        },
      },
      {
        text: "2º Trimestre (13 a 27 semanas)",
        emoji: "🌿",
        value: "2",
        feedback: {
          label: "Você está na fase de ouro para planejar.",
          text: "Mais energia, menos enjoo, cabeça mais tranquila. É a janela perfeita para assumir o controle do seu parto antes da reta final.",
        },
      },
      {
        text: "3º Trimestre (28 semanas em diante)",
        emoji: "🌺",
        value: "3",
        feedback: {
          label: "Você está na reta final — e ainda dá tempo.",
          text: "A ansiedade aumenta agora, é natural. Mas cada semana ainda conta muito. Existe um caminho acelerado feito exatamente para o seu momento.",
        },
      },
      {
        text: "Ainda estou planejando / Tentante",
        emoji: "💭",
        value: "0",
        feedback: {
          label: "Você é do tipo que planeja antes — isso muda tudo.",
          text: "Entrar na gestação já preparada é o maior presente que uma mãe pode dar a si mesma. Você vai viver cada fase sem o peso do medo.",
        },
      },
    ],
  },
  {
    id: 3,
    key: "medo",
    title: "Quando você pensa no momento do parto, o que mais tira seu sono?",
    subtitle: "Seja sincera. Aqui é um espaço seguro, sem julgamento.",
    options: [
      {
        text: "A dor... tenho medo de não aguentar",
        value: "dor",
        feedback: {
          label: "Seu medo tem nome — e nome que tem cura.",
          text: "A dor existe, mas sofrimento é outra coisa. O medo tensiona o corpo e amplifica tudo. Conhecimento é o analgésico que ninguém te contou.",
        },
      },
      {
        text: "Perder o controle e sofrer violência obstétrica",
        value: "violencia",
        feedback: {
          label: "Você é uma mãe que já entendeu o jogo.",
          text: "Esse medo é legítimo e, infelizmente, real no Brasil. A diferença entre vítima e protagonista é uma só: saber exatamente o que dizer e como agir.",
        },
      },
      {
        text: "Não saber se estou pronta ou 'dar conta'",
        value: "incapacidade",
        feedback: {
          label: "Seu corpo já sabe parir. É a mente que trava.",
          text: "Essa insegurança não é fraqueza — é falta de mapa. Quando a confiança instintiva é destravada, o parto muda de figura.",
        },
      },
      {
        text: "A saúde do meu bebê durante e após o parto",
        value: "saude_bebe",
        feedback: {
          label: "Você já é mãe antes mesmo do nascimento.",
          text: "Proteger quem amamos é instinto puro. Um parto respeitoso e bem assistido é o primeiro ato de amor — e ele começa na sua preparação.",
        },
      },
    ],
  },
  {
    id: 4,
    key: "informacao",
    title: "Como você se sente com as informações sobre parto que encontra por aí?",
    options: [
      {
        text: "Perdida... cada fonte diz uma coisa",
        value: "perdida",
        feedback: {
          label: "Você não está confusa. Você está mal informada por excesso.",
          text: "A internet é ruído. Você não precisa de mais conteúdo — precisa de um guia único e confiável que silencie o barulho.",
        },
      },
      {
        text: "Ansiosa... quanto mais leio, mais medo tenho",
        value: "ansiosa",
        feedback: {
          label: "Sua ansiedade tem uma fonte — e dá para desligá-la.",
          text: "Informação errada gera pânico. Informação certa gera paz. O problema nunca foi você: foi a fonte do que você consome.",
        },
      },
      {
        text: "Confusa... não sei em quem confiar",
        value: "confusa",
        feedback: {
          label: "Você é criteriosa — e isso vai te proteger.",
          text: "Desconfiar é sinal de inteligência. O Dr. Alberto baseia tudo em evidência científica e humanização, com +30 anos e +3.000 partos.",
        },
      },
      {
        text: "Preparada... mas ainda tenho dúvidas",
        value: "duvidas",
        feedback: {
          label: "Você já fez o dever de casa. Falta a última peça.",
          text: "Você está mais perto do que imagina. O que separa você do protagonismo total são detalhes que quase ninguém ensina.",
        },
      },
    ],
  },
  {
    id: 5,
    key: "acompanhante",
    title: "Seu parceiro ou acompanhante entende o que você está passando?",
    options: [
      {
        text: "Sim, ele é meu maior apoio",
        value: "sim",
        feedback: {
          label: "Vocês formam um time — vamos torná-lo imbatível.",
          text: "Com o conhecimento certo, ele deixa de ser 'apoio' e vira guardião ativo do seu parto. Casais preparados juntos têm os melhores desfechos.",
        },
      },
      {
        text: "Mais ou menos... ele tenta, mas não entende tudo",
        value: "parcial",
        feedback: {
          label: "Ele quer ajudar — só falta saber como.",
          text: "A maioria dos parceiros trava por não ter ferramentas práticas. Não é falta de amor, é falta de instrução. Isso a gente resolve.",
        },
      },
      {
        text: "Não muito... me sinto sozinha às vezes",
        value: "nao",
        feedback: {
          label: "Você não deveria carregar isso sozinha.",
          text: "E não vai. Vamos te dar autonomia para ser a protagonista — e ferramentas para trazer quem você quiser para o seu time.",
        },
      },
      {
        text: "Não tenho acompanhante definido",
        value: "indefinido",
        feedback: {
          label: "Sua força interior será seu maior guia.",
          text: "O que importa é que VOCÊ seja a protagonista. E protagonista que se prepara não depende de mais ninguém para ter um parto respeitoso.",
        },
      },
    ],
  },
  {
    id: 6,
    key: "plano",
    title: "Você já tem um Plano de Parto escrito, baseado em evidências?",
    subtitle: "Talvez a pergunta mais importante de todas.",
    options: [
      {
        text: "Sim, já tenho tudo pronto",
        value: "sim",
        feedback: {
          label: "Impressionante. Mas será que ele cobre o plano B e C?",
          text: "Ter o plano é raro. Ter um plano que prevê mudanças de cenário é o que realmente protege você na hora H.",
        },
      },
      {
        text: "Já ouvi falar, mas não sei como fazer",
        value: "nao_sei_fazer",
        feedback: {
          label: "Aqui mora a diferença entre decidir e obedecer.",
          text: "O Plano de Parto não é lista de desejos — é sua ferramenta de proteção. Sem ele, você fica à mercê das rotinas do hospital.",
        },
      },
      {
        text: "Não sabia que isso existia",
        value: "desconhece",
        feedback: {
          label: "Você acabou de descobrir sua peça que faltava.",
          text: "O Plano de Parto é o que separa a protagonista da espectadora. Guarde esse nome — ele vai mudar seu parto.",
        },
      },
      {
        text: "Acho que não preciso disso",
        value: "desnecessario",
        feedback: {
          label: "Cuidado: silêncio, na sala de parto, é decidido por outros.",
          text: "Deixar tudo nas mãos da equipe é um risco. O Plano garante que a sua voz seja ouvida mesmo quando você não puder falar.",
        },
      },
    ],
  },
  {
    id: 7,
    key: "investir",
    title:
      "Se existisse um método comprovado para transformar seu medo em confiança, você investiria em você?",
    options: [
      {
        text: "Com certeza! Quero me sentir preparada",
        value: "sim",
        feedback: {
          label: "Essa é a atitude de uma mãe leoa. 🦁",
          text: "Estamos quase lá. Seu perfil já está praticamente montado.",
        },
      },
      {
        text: "Provavelmente sim, se fizer sentido",
        value: "talvez",
        feedback: {
          label: "Investir em conhecimento é o único que ninguém te tira.",
          text: "Faz todo o sentido. E o que você vai ver a seguir foi feito exatamente para o seu caso.",
        },
      },
      {
        text: "Talvez... preciso pensar",
        value: "pensar",
        feedback: {
          label: "Entendo. Só lembre: o parto tem data marcada.",
          text: "A preparação é a única coisa que não pode esperar. Veja seu diagnóstico e decida com informação na mão.",
        },
      },
      {
        text: "Prefiro seguir sozinha",
        value: "nao",
        feedback: {
          label: "Respeitamos sua escolha — e ela também tem apoio.",
          text: "Só saiba que não precisa ser difícil e solitário. Existe um caminho mais leve, e ele está a uma tela de distância.",
        },
      },
    ],
  },
];

/*
  INTERSTÍCIOS — telas de PROVA SOCIAL / ANTECIPAÇÃO exibidas DEPOIS de uma pergunta
  (chave = id da pergunta). Servem para:
    - quebrar o ritmo com uma micro-recompensa (dopamina) e um clique de compromisso
    - injetar prova social ANTES do fim, construindo valor
    - abrir loops de curiosidade ("seu diagnóstico está mudando")
  type: "stat" | "testimonial" | "authority"
*/
export const interstitials = {
  2: {
    type: "stat",
    icon: "👭",
    headline: "Você não está sozinha.",
    // números agregados/plausíveis — troque por dados reais quando tiver
    big: "9 em cada 10",
    sub: "gestantes que fizeram esta análise relataram o MESMO medo que você está prestes a revelar na próxima pergunta.",
    cta: "Continuar minha análise →",
  },
  4: {
    type: "testimonial",
    icon: "💬",
    foto: "/img/patricia-d.jpg",
    headline: "Uma paciente real do Dr. Alberto:",
    quote:
      "Minha primeira gestação terminou em cesárea. Agora, com o Dr. Alberto, o tratamento é outro: atenção, carinho e respeito. Estou com 36 semanas e, pela primeira vez, me sinto totalmente segura!",
    author: "Patrícia Dudas",
    meta: "★★★★★ · 29 anos · paciente Parto Sem Medo",
    cta: "Também quero me sentir segura →",
  },
  6: {
    type: "authority",
    icon: "🩺",
    headline: "Sua resposta anterior foi decisiva.",
    body: "Com base nela, o Dr. Alberto Guimarães — único médico brasileiro certificado pelo Instituto Michel Odent (Lyon) — vai montar um direcionamento específico para o seu caso.",
    highlight: "Faltam só 2 respostas para revelar seu diagnóstico completo.",
    cta: "Revelar as últimas perguntas →",
  },
};

/* Indicador de atividade "ao vivo" (SIMULADO — plugar em analytics real depois). */
export const liveActivity = {
  baseOnline: 38, // pessoas "analisando agora" — flutua levemente no client
  totalHoje: 214, // total "hoje"
  nomes: ["Ana", "Camila", "Juliana", "Beatriz", "Larissa", "Patrícia", "Fernanda", "Renata"],
  cidades: ["SP", "RJ", "MG", "BA", "RS", "PR", "PE", "CE"],
};

export const profiles = {
  A: {
    name: "Gestante Ansiosa",
    title: "você é a Gestante que Precisa Transformar Ansiedade em Preparo",
    boxTitle: "Ansiedade por Falta de Mapa",
    text: "Seu medo não é fraqueza — é o sinal de que você entende a importância do que vem pela frente. O problema é que ninguém te deu um MAPA. Sem um passo a passo claro, a ansiedade cresce e ocupa o espaço que deveria ser da preparação. A boa notícia: com o método certo, gestantes como você são as que mais rapidamente se transformam.",
  },
  B: {
    name: "Gestante Defensora",
    title: "você é a Gestante que Precisa de Ferramentas de Defesa",
    boxTitle: "Vulnerabilidade por Falta de Defesa",
    text: "Seu medo de perder o controle é um sinal de alerta correto — a violência obstétrica é real e acontece todos os dias no Brasil. Mas existe uma diferença enorme entre saber que o risco existe e saber exatamente O QUE DIZER e COMO AGIR em cada momento. Sem as ferramentas certas, você corre o risco de se tornar espectadora do próprio parto.",
  },
  C: {
    name: "Gestante Confusa",
    title: "você é a Gestante que Precisa de Curadoria, Não de Mais Informação",
    boxTitle: "Paralisia por Excesso de Informação",
    text: "Você já pesquisou muito. E percebeu o paradoxo: quanto mais lê, mais confusa e ansiosa fica. Isso não é culpa sua — é o resultado de consumir 50 fontes diferentes que se contradizem. Você não precisa de MAIS informação. Precisa de CURADORIA de alguém que separe o que importa do que é ruído.",
  },
  D: {
    name: "Gestante Quase Pronta",
    title: "você está Quase Pronta — Falta a Última Peça",
    boxTitle: "Lacuna entre Saber e Fazer",
    text: "Você fez o dever de casa. Estudou, conversou, se informou. Mas existe uma lacuna que separa quem SABE de quem FAZ: o roteiro prático da hora H. O que dizer quando sugerirem uma intervenção? Como agir em cada fase do trabalho de parto? É essa última peça que transforma conhecimento em protagonismo.",
  },
};

export function getProfile(answers) {
  if (answers.medo === "violencia") return "B";
  if (["perdida", "ansiosa", "confusa"].includes(answers.informacao)) return "C";
  if (answers.informacao === "duvidas" || answers.plano === "sim") return "D";
  return "A";
}

/* Rótulos legíveis das respostas — usados no "processamento" para citar a mãe. */
export const answerLabels = {
  medo: {
    dor: "medo da dor",
    violencia: "medo de violência obstétrica",
    incapacidade: "medo de não dar conta",
    saude_bebe: "preocupação com o bebê",
  },
  trimestre: {
    "1": "1º trimestre",
    "2": "2º trimestre",
    "3": "3º trimestre",
    "0": "fase de planejamento",
  },
  informacao: {
    perdida: "excesso de fontes contraditórias",
    ansiosa: "informação que gera ansiedade",
    confusa: "dúvida sobre em quem confiar",
    duvidas: "dúvidas pontuais",
  },
};

export const bonus = [
  { title: "Planner de Parto Exclusivo", desc: "A ferramenta que impede que você seja enganada ou coagida.", value: "R$ 197" },
  { title: "Comunidade Secreta", desc: "Nunca mais se sinta sozinha. Apoio diário de outras mães.", value: "R$ 297" },
  { title: "Checklist Jornada Segura", desc: "Semana a semana para não esquecer nada.", value: "R$ 97" },
  { title: "Guia da Mala Perfeita", desc: "Listas práticas para reduzir a ansiedade da reta final.", value: "R$ 67" },
];

/*
  Depoimentos REAIS — avaliações verificadas do Dr. Alberto no Doctoralia
  (perfil com nota 5,0 · 82 opiniões). Fonte pública, selo "Consulta verificada".
  https://www.doctoralia.com.br/alberto-guimaraes/ginecologista/sao-paulo
*/
export const depoimentos = [
  {
    texto:
      "Eu sou suspeita para falar do Dr. Alberto! Tive meus dois filhos em dois lindos partos humanizados! Ele é um ser humano ímpar. Se eu tivesse 10 filhos, todos os partos seriam com ele!",
    autor: "Bianca Vigiano",
    fonte: "mãe de 2 filhos",
    foto: "/img/bianca.jpg",
  },
  {
    texto:
      "Depois de passar por alguns obstetras, encontrar o Dr. Alberto foi um presente! Muito atencioso e acolhedor, tira todas as dúvidas — até mesmo fora da consulta — e passa muita tranquilidade. Recomendo de olhos fechados.",
    autor: "Patrícia Gomes",
    fonte: "50 anos",
    foto: "/img/patricia-g.jpg",
  },
  {
    texto:
      "Extremamente atencioso, empático e humanizado. Sempre disposto a esclarecer todas as dúvidas e, principalmente, me deixar segura no decorrer de toda a gestação. Um médico que respeita e apoia seu protagonismo como mãe e mulher.",
    autor: "Francine Araujo",
    fonte: "Doctoralia · consulta verificada",
  },
];

export const faq = [
  { q: "Serve para quem quer cesárea?", a: "Sim. O método ensina como ter uma cesárea humanizada e respeitosa, com contato pele a pele, acompanhante presente e decisões compartilhadas. Preparo não é sobre a via de parto — é sobre protagonismo." },
  { q: "E se eu não tiver tempo de assistir?", a: "As aulas são divididas em módulos de 10 a 15 minutos. Você assiste no ônibus, na fila do pré-natal, antes de dormir. E o acesso vale por 2 anos." },
  { q: "Estou no final da gestação, ainda dá tempo?", a: "Sim. Existe uma trilha acelerada para o 3º trimestre com o essencial organizado por prioridade. Muitas alunas concluíram em 1 semana." },
  { q: "Serve para segunda ou terceira gestação?", a: "Sim, especialmente se a experiência anterior não foi como você desejava. Há um módulo dedicado a ressignificar partos anteriores." },
  { q: "Meu médico já é ótimo, preciso disso?", a: "Ter um bom médico é metade do caminho. A outra metade é você saber o que está acontecendo com o seu corpo e o que pedir em cada momento. O método prepara você — não substitui o seu obstetra." },
  { q: "Posso assistir com meu acompanhante?", a: "Deve! Há um módulo inteiro sobre o papel do acompanhante. Casais que assistem juntos relatam os melhores resultados." },
  { q: "Como recebo o acesso?", a: "Imediatamente após a confirmação do pagamento, você recebe login e senha por e-mail. Acesso liberado por 2 anos." },
  { q: "Tenho garantia?", a: "Sim. 30 dias de garantia incondicional. Você entra, assiste tudo, e se por qualquer motivo não fizer sentido, devolvemos 100% do valor. Sem perguntas." },
];
