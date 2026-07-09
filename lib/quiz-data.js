export const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_URL || "https://pay.cakto.com.br/35objdm_667163";

export const questions = [
  {
    id: 1,
    key: "gestacao",
    title: "Esta é sua primeira gestação?",
    subtitle: "Queremos entender melhor o seu momento.",
    options: [
      {
        text: "Sim, sou mãe de primeira viagem",
        emoji: "🌸",
        value: "primipara",
        feedback:
          "Entendemos você. A primeira gestação é uma montanha-russa de emoções. É completamente normal sentir medo do desconhecido.",
      },
      {
        text: "Não, já tive outros filhos",
        emoji: "🤱",
        value: "multipara",
        feedback:
          "Cada gestação é única. Mesmo com experiência, novos medos podem surgir. Vamos descobrir como você está se sentindo desta vez.",
      },
    ],
  },
  {
    id: 2,
    key: "trimestre",
    title: "Em qual fase da gestação você está?",
    subtitle: "Isso nos ajuda a saber quanto tempo temos para te preparar.",
    options: [
      {
        text: "1º Trimestre (até 12 semanas)",
        emoji: "🌱",
        value: "1",
        feedback:
          "O início é cheio de transformações invisíveis. É o momento ideal para construir sua base de conhecimento.",
      },
      {
        text: "2º Trimestre (13 a 27 semanas)",
        emoji: "🌿",
        value: "2",
        feedback:
          "A fase de ouro! Você provavelmente está com mais energia. É a hora perfeita para planejar seu parto.",
      },
      {
        text: "3º Trimestre (28 semanas em diante)",
        emoji: "🌺",
        value: "3",
        feedback:
          "A reta final! A ansiedade aumenta, mas ainda dá tempo de se preparar e assumir o controle.",
      },
      {
        text: "Ainda estou planejando / Tentante",
        emoji: "💭",
        value: "0",
        feedback:
          "Começar antes é a melhor estratégia. Você entrará na gestação muito mais segura.",
      },
    ],
  },
  {
    id: 3,
    key: "medo",
    title: "Quando você pensa no momento do parto, o que mais te tira o sono?",
    subtitle: "Seja sincera, aqui é um espaço seguro.",
    options: [
      {
        text: "A dor... tenho medo de não aguentar",
        value: "dor",
        feedback:
          "A dor existe, mas não precisa ser sofrimento. O medo aumenta a tensão e a dor. O conhecimento é o melhor analgésico.",
      },
      {
        text: "Perder o controle e sofrer violência obstétrica",
        value: "violencia",
        feedback:
          "Esse é um medo legítimo e infelizmente real. A melhor defesa é saber seus direitos e ter um plano sólido.",
      },
      {
        text: "Não saber se estou pronta ou 'dar conta'",
        value: "incapacidade",
        feedback:
          "Seu corpo sabe parir. O que trava é a mente. Vamos destravar essa confiança instintiva em você.",
      },
      {
        text: "A saúde do meu bebê durante e após o parto",
        value: "saude_bebe",
        feedback:
          "Proteger quem amamos é instintivo. Um parto respeitoso e bem assistido é o primeiro ato de amor e proteção.",
      },
    ],
  },
  {
    id: 4,
    key: "informacao",
    title: "Como você se sente em relação às informações sobre parto que encontra?",
    options: [
      {
        text: "Perdida... cada fonte diz uma coisa diferente",
        value: "perdida",
        feedback:
          "A internet é cheia de ruído. Você precisa de um guia único e confiável para silenciar essa confusão.",
      },
      {
        text: "Ansiosa... quanto mais leio, mais medo tenho",
        value: "ansiosa",
        feedback:
          "Informação errada gera pânico. Informação certa gera paz. Vamos mudar a fonte do que você consome.",
      },
      {
        text: "Confusa... não sei em quem confiar",
        value: "confusa",
        feedback:
          "É normal. O Dr. Alberto tem mais de 30 anos de experiência e baseia tudo em evidências científicas e humanização.",
      },
      {
        text: "Preparada... mas ainda tenho dúvidas",
        value: "duvidas",
        feedback:
          "Ótimo que já busca saber! Vamos lapidar esse conhecimento para eliminar qualquer dúvida restante.",
      },
    ],
  },
  {
    id: 5,
    key: "acompanhante",
    title: "Você sente que seu parceiro ou acompanhante entende o que você está passando?",
    options: [
      {
        text: "Sim, ele é meu maior apoio",
        value: "sim",
        feedback:
          "Que maravilha! Com o conhecimento certo, ele deixará de ser apenas apoio para ser um guardião ativo do seu parto.",
      },
      {
        text: "Mais ou menos... ele tenta, mas não entende tudo",
        value: "parcial",
        feedback:
          "Muitos parceiros querem ajudar mas não sabem como. Eles precisam de ferramentas práticas, não apenas teoria.",
      },
      {
        text: "Não muito... me sinto sozinha às vezes",
        value: "nao",
        feedback:
          "Você não deveria se sentir assim. Vamos te dar ferramentas para trazer ele para o seu time ou fortalecer sua própria autonomia.",
      },
      {
        text: "Não tenho parceiro/acompanhante definido",
        value: "indefinido",
        feedback:
          "Tudo bem. O mais importante é que VOCÊ seja a protagonista. Sua força interior será seu maior guia.",
      },
    ],
  },
  {
    id: 6,
    key: "plano",
    title: "Você já tem um Plano de Parto escrito, baseado em evidências científicas?",
    subtitle: "Essa é a pergunta mais importante de todas.",
    options: [
      {
        text: "Sim, já tenho tudo pronto",
        value: "sim",
        feedback:
          "Excelente! Mas será que ele cobre os planos B e C? Um bom plano deve prever mudanças de cenário.",
      },
      {
        text: "Já ouvi falar, mas não sei como fazer",
        value: "nao_sei_fazer",
        feedback:
          "O Plano de Parto não é uma lista de desejos. É sua ferramenta de proteção. Sem ele, você fica à mercê das rotinas.",
      },
      {
        text: "Não sabia que isso existia",
        value: "desconhece",
        feedback:
          "O Plano de Parto é a diferença entre ser protagonista ou espectadora. É vital que você tenha um.",
      },
      {
        text: "Acho que não preciso disso",
        value: "desnecessario",
        feedback:
          "Cuidado. Deixar tudo nas mãos da equipe médica é um risco. O Plano garante que sua voz seja ouvida mesmo se você não puder falar.",
      },
    ],
  },
  {
    id: 7,
    key: "investir",
    title:
      "Se existisse um método comprovado para transformar seu medo em confiança, você estaria disposta a investir em você?",
    options: [
      {
        text: "Com certeza! Quero me sentir preparada",
        value: "sim",
        feedback: "Essa é a atitude de uma mãe leoa! Estamos quase lá.",
      },
      {
        text: "Provavelmente sim, se fizer sentido",
        value: "talvez",
        feedback:
          "Faz todo sentido. O investimento em conhecimento é o único que ninguém tira de você e do seu bebê.",
      },
      {
        text: "Talvez... preciso pensar",
        value: "pensar",
        feedback:
          "Entendo. Mas lembre-se: o parto tem data marcada. A preparação não pode esperar muito.",
      },
      {
        text: "Prefiro seguir sozinha",
        value: "nao",
        feedback:
          "Respeitamos sua escolha. Mas saiba que não precisa ser difícil e solitário. Existe um caminho mais leve.",
      },
    ],
  },
];

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

export const bonus = [
  { title: "Planner de Parto Exclusivo", desc: "A ferramenta que impede que você seja enganada ou coagida.", value: "R$ 197" },
  { title: "Comunidade Secreta", desc: "Nunca mais se sinta sozinha. Apoio diário de outras mães.", value: "R$ 297" },
  { title: "Checklist Jornada Segura", desc: "Semana a semana para não esquecer nada.", value: "R$ 97" },
  { title: "Guia da Mala Perfeita", desc: "Listas práticas para reduzir a ansiedade da reta final.", value: "R$ 67" },
];

export const depoimentos = [
  { texto: "Eu estava apavorada com a dor. O curso mudou minha mente. Tive um parto natural de 4 horas, sem anestesia e sem medo!", autor: "Mariana S." },
  { texto: "Meu marido assistiu comigo e foi outra pessoa no parto. Ele sabia exatamente o que fazer. Foi nossa melhor decisão.", autor: "Carla M." },
  { texto: "Informação que salva! Escapei de uma cesárea desnecessária porque sabia argumentar com o plantonista.", autor: "Juliana P." },
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
