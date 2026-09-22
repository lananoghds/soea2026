import type { BiAnswer, ConversationPoint, GeoRanking, Highlight, Kpi, Mention, MonitoringAlert, OfficialContent, PeakSummary, PublisherInsight, Topic } from "@/types/dashboard";

export const kpis: Kpi[] = [
  { label: "Total de menções", value: "8.642", change: "+24%", detail: "ocorrências no período", tone: "blue", info: "Quantidade de ocorrências identificadas no período monitorado." },
  { label: "Última hora", value: "327", change: "+18%", detail: "ocorrências vs. hora anterior", tone: "blue", info: "Volume de ocorrências identificadas na última hora do período selecionado." },
  { label: "Alcance potencial", value: "2,4 mi", detail: "alcance estimado disponível", tone: "amber", info: "Índice ou alcance estimado informado pela fonte de social listening." },
  { label: "Interações totais", value: "18,7 mil", detail: "engagement agregado da fonte", tone: "amber", info: "Interações ou engagement conforme disponível na fonte, sem conversão para impressões." },
  { label: "Sentimento positivo", value: "72%", change: "+4 p.p.", detail: "classificação positiva", tone: "green", info: "Percentual de ocorrências classificadas como positivas pela fonte." },
  { label: "Sentimento negativo", value: "8%", change: "-2 p.p.", detail: "classificação negativa", tone: "red", info: "Percentual de ocorrências classificadas como negativas pela fonte." },
];

export const vTrackerIndicators = [
  { label: "Publicadores únicos", value: "3.184", info: "Quantidade de publicadores distintos identificados no período." },
  { label: "Taxa de engajamento", value: "6,8%", info: "Taxa de engajamento conforme definição fornecida pela fonte." },
  { label: "Horário de pico", value: "14h32", info: "Horário em que foi identificada a maior concentração de ocorrências." },
  { label: "Saúde das ocorrências", value: "82%", info: "Índice de saúde das ocorrências disponibilizado pela fonte." },
  { label: "Alcance do dia de pico", value: "620 mil", info: "Alcance estimado associado ao dia com maior volume de ocorrências." },
];

export const conversation: ConversationPoint[] = [
  { time: "08h", mentions: 182, variation: 8, topic: "Abertura da SOEA" }, { time: "09h", mentions: 246, variation: 35, topic: "Engenharia" },
  { time: "10h", mentions: 218, variation: -11, topic: "Agronomia" }, { time: "11h", mentions: 312, variation: 43, topic: "Abertura da SOEA" },
  { time: "12h", mentions: 268, variation: -14, topic: "Sustentabilidade" }, { time: "13h", mentions: 354, variation: 32, topic: "Inovação" },
  { time: "14h", mentions: 468, variation: 32, topic: "Inteligência Artificial" }, { time: "15h", mentions: 391, variation: -16, topic: "Infraestrutura" },
  { time: "16h", mentions: 427, variation: 9, topic: "Mobilidade urbana" }, { time: "17h", mentions: 327, variation: -23, topic: "Mercado profissional" },
];

export const monthlyOccurrences = [
  { label: "Jun", value: 1240 }, { label: "Jul", value: 1840 }, { label: "Ago", value: 2860 }, { label: "Set", value: 8642 },
];
export const dailyOccurrences = [
  { label: "16/09", value: 980 }, { label: "17/09", value: 1228 }, { label: "18/09", value: 1484 }, { label: "19/09", value: 2310 }, { label: "20/09", value: 2640 },
];
export const serviceOccurrences = [
  { label: "Redes sociais", value: 76 }, { label: "Notícias", value: 14 }, { label: "Blogs e fóruns", value: 10 },
];
export const peakSummary: PeakSummary = { time: "14h32", day: "20/09", mentions: 468, estimatedReach: "620 mil", topic: "Inteligência Artificial" };

export const topics: Topic[] = [
  { name: "Inteligência Artificial", volume: 1824, trend: "Em alta", change: 38 }, { name: "Sustentabilidade", volume: 1462, trend: "Em alta", change: 27 },
  { name: "Engenharia", volume: 1288, trend: "Estável", change: 3 }, { name: "Inovação", volume: 974, trend: "Em alta", change: 19 },
  { name: "Infraestrutura", volume: 816, trend: "Em queda", change: -6 },
];
export const emerging = [{ name: "Mobilidade urbana", change: 184 }, { name: "Novas tecnologias", change: 126 }, { name: "Mercado profissional", change: 74 }];
export const hashtags = [{ name: "#SOEA81", value: 1184 }, { name: "#Engenharia", value: 846 }, { name: "#Sergipe", value: 624 }];
export const monitoredTags = [{ name: "evento", sentiment: "Positivo", value: 612 }, { name: "fila", sentiment: "Negativo", value: 88 }, { name: "palestras", sentiment: "Positivo", value: 540 }];
export const platforms = [{ name: "Instagram", value: 42 }, { name: "X", value: 25 }, { name: "Facebook", value: 14 }, { name: "YouTube", value: 8 }, { name: "LinkedIn", value: 7 }, { name: "Notícias", value: 4 }];
export const sentiment = [{ name: "Positivo", value: 72, change: "+4 p.p." }, { name: "Neutro", value: 20, change: "-2 p.p." }, { name: "Negativo", value: 8, change: "-2 p.p." }];
export const sentimentByPlatform = [{ platform: "Instagram", positive: 76, neutral: 18, negative: 6 }, { platform: "X", positive: 61, neutral: 27, negative: 12 }, { platform: "Facebook", positive: 68, neutral: 20, negative: 12 }, { platform: "LinkedIn", positive: 84, neutral: 13, negative: 3 }];

export const mentions: Mention[] = [
  { id: 1, author: "Marina Alves", handle: "@marina.eng", initials: "MA", platform: "Instagram", time: "há 4 min", publishedAt: "20/09 17h41", text: "A discussão sobre IA aplicada à engenharia pública na 81ª SOEA trouxe exemplos muito concretos para Sergipe. Excelente programação!", sentiment: "Positivo", engagement: 284, comments: 42, topic: "Inteligência Artificial" },
  { id: 2, author: "CREA Sergipe", handle: "@creasergipe", initials: "CS", platform: "X", time: "há 9 min", publishedAt: "20/09 17h36", text: "Sustentabilidade e infraestrutura resiliente no centro do debate. A engenharia brasileira reunida em Aracaju para construir caminhos.", sentiment: "Positivo", engagement: 516, comments: 68, rts: 112, topic: "Sustentabilidade" },
  { id: 3, author: "Rafael Mendonça", handle: "@rafael_agro", initials: "RM", platform: "LinkedIn", time: "há 18 min", publishedAt: "20/09 17h27", text: "O painel sobre inovação no campo mostrou como dados e agronomia já transformam a produção com responsabilidade ambiental.", sentiment: "Positivo", engagement: 198, comments: 31, topic: "Inovação" },
  { id: 4, author: "Notícias SE", handle: "@noticiasse", initials: "NS", platform: "Notícias", time: "há 31 min", publishedAt: "20/09 17h14", text: "Movimento intenso no entorno do centro de convenções durante a programação da 81ª SOEA nesta tarde.", sentiment: "Neutro", engagement: 91, comments: 12, topic: "Infraestrutura" },
  { id: 5, author: "Paulo Vieira", handle: "@paulovcivil", initials: "PV", platform: "Facebook", time: "há 44 min", publishedAt: "20/09 17h01", text: "A fila para uma das palestras poderia ter melhor sinalização, apesar da qualidade do conteúdo apresentado.", sentiment: "Negativo", engagement: 74, comments: 26, topic: "Engenharia" },
];

export const officialContents: OfficialContent[] = [
  { title: "Reel · Abertura da 81ª SOEA", type: "Instagram", occurrences: 684, comments: 842, engagement: "6,9%", sentiment: "Positivo" },
  { title: "Carrossel · Inovação que transforma", type: "Instagram", occurrences: 512, comments: 638, engagement: "7,3%", sentiment: "Positivo" },
  { title: "Reel · Bastidores em Sergipe", type: "Instagram", occurrences: 426, comments: 404, engagement: "6,9%", sentiment: "Positivo" },
  { title: "Post · Engenharia sustentável", type: "LinkedIn", occurrences: 318, comments: 286, engagement: "6,4%", sentiment: "Positivo" },
  { title: "Vídeo · Especialista em IA", type: "YouTube", occurrences: 274, comments: 244, engagement: "5,8%", sentiment: "Positivo" },
];

export const highlights: Highlight[] = [
  { author: "Confea", platform: "Instagram", excerpt: "A engenharia que transforma o Brasil está reunida em Sergipe.", estimatedReach: "428 mil", engagement: "32,8 mil", comments: "1.240", sentiment: "Positivo" },
  { author: "Portal Engenharia", platform: "X", excerpt: "IA, cidades e clima dominam a agenda da 81ª SOEA.", estimatedReach: "286 mil", engagement: "18,2 mil", comments: "730", rts: "2.870", sentiment: "Positivo" },
  { author: "Agro em Foco", platform: "YouTube", excerpt: "O futuro da agronomia passa por dados e sustentabilidade.", estimatedReach: "174 mil", engagement: "9,6 mil", comments: "410", sentiment: "Positivo" },
];

export const publishers: PublisherInsight[] = [
  { name: "CREA Sergipe", handle: "@creasergipe", platform: "X", value: "516 eng.", sentiment: "Positivo", profile: "Influente" },
  { name: "Marina Alves", handle: "@marina.eng", platform: "Instagram", value: "284 eng.", sentiment: "Positivo", profile: "Evangelizador" },
  { name: "Paulo Vieira", handle: "@paulovcivil", platform: "Facebook", value: "26 comentários", sentiment: "Negativo", profile: "Agressor" },
];
export const stateRanking: GeoRanking[] = [
  { label: "Sergipe", value: 3864 }, { label: "São Paulo", value: 1128 }, { label: "Bahia", value: 842 },
  { label: "Distrito Federal", value: 596 }, { label: "Minas Gerais", value: 438 }, { label: "Pernambuco", value: 324 },
];
export const cityRanking: GeoRanking[] = [
  { label: "Aracaju (SE)", value: 3186 }, { label: "Nossa Senhora do Socorro (SE)", value: 412 }, { label: "São Paulo (SP)", value: 386 },
  { label: "Brasília (DF)", value: 348 }, { label: "Salvador (BA)", value: 312 }, { label: "Recife (PE)", value: 196 },
];

export const monitoringAlerts: MonitoringAlert[] = [
  { id: 1, severity: "Alta", type: "Pico de ocorrências", message: "Inteligência Artificial cresce 280% desde 14h32", detail: "468 ocorrências concentradas em 40 minutos, puxadas pelo painel de IA aplicada à engenharia.", time: "20/09 14h32", topic: "Inteligência Artificial", platform: "Instagram" },
  { id: 2, severity: "Média", type: "Mudança de sentimento", message: "Alta pontual de sentimento negativo sobre acesso ao evento", detail: "Sentimento negativo sobe 3 p.p. em comentários sobre filas e sinalização de acesso.", time: "20/09 17h01", topic: "Engenharia", platform: "Facebook" },
  { id: 3, severity: "Média", type: "Novo tema em crescimento", message: "Mobilidade urbana avança 184% nas conversas", detail: "Tema emergente identificado após o painel de cidades inteligentes.", time: "20/09 16h10", topic: "Mobilidade urbana", platform: "X" },
  { id: 4, severity: "Baixa", type: "Concentração por plataforma", message: "Instagram concentra 42% das ocorrências do período", detail: "Distribuição acima da média histórica do monitoramento, com forte peso de Reels.", time: "20/09 15h20", topic: "Inovação", platform: "Instagram" },
  { id: 5, severity: "Baixa", type: "Concentração geográfica", message: "Aracaju responde por 3.186 ocorrências", detail: "Cidade-sede lidera o volume, seguida por capitais do Sudeste e Nordeste.", time: "20/09 13h05", topic: "Abertura da SOEA", platform: "Notícias" },
];


export const biAnswers: BiAnswer[] = [
  { question: "Quantas ocorrências tivemos?", answer: "Foram identificadas 8.642 ocorrências no período selecionado." },
  { question: "Qual foi o sentimento predominante?", answer: "O sentimento predominante foi positivo, com 72% das ocorrências classificadas nessa categoria." },
  { question: "Qual plataforma teve mais ocorrências?", answer: "Instagram concentra a maior parte das ocorrências no período, com 42% do volume." },
  { question: "Qual foi o horário de pico?", answer: "O horário de pico foi 14h32, associado ao tema Inteligência Artificial." },
  { question: "Qual foi o dia de maior volume?", answer: "O dia de maior volume demonstrado foi 20/09, com alcance estimado de 620 mil no pico." },
  { question: "Quais foram os assuntos mais citados?", answer: "Inteligência Artificial, Sustentabilidade e Engenharia aparecem como os assuntos mais citados." },
  { question: "Quantos publicadores tivemos?", answer: "Foram identificados 3.184 publicadores únicos no período." },
  { question: "O que mais chamou atenção nas conversas?", answer: "O pico sobre Inteligência Artificial e a concentração das ocorrências no Instagram foram os principais destaques." },
];
