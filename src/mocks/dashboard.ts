import type { ConversationPoint, Highlight, Kpi, Mention, OfficialContent, Topic } from "@/types/dashboard";

export const kpis: Kpi[] = [
  { label: "Total de menções", value: "8.642", change: "+24%", detail: "vs. período anterior", tone: "blue" },
  { label: "Última hora", value: "327", change: "+18%", detail: "vs. hora anterior", tone: "blue" },
  { label: "Alcance potencial", value: "2,4 mi", detail: "pessoas impactadas", tone: "amber" },
  { label: "Interações totais", value: "18,7 mil", detail: "curtidas, comentários e compartilhamentos", tone: "amber" },
  { label: "Sentimento positivo", value: "72%", change: "+4 p.p.", detail: "melhora no período", tone: "green" },
  { label: "Sentimento negativo", value: "8%", change: "-2 p.p.", detail: "queda no período", tone: "red" },
];

export const conversation: ConversationPoint[] = [
  { time: "08h", mentions: 182, variation: 8, topic: "Abertura da SOEA" }, { time: "09h", mentions: 246, variation: 35, topic: "Engenharia" },
  { time: "10h", mentions: 218, variation: -11, topic: "Agronomia" }, { time: "11h", mentions: 312, variation: 43, topic: "Abertura da SOEA" },
  { time: "12h", mentions: 268, variation: -14, topic: "Sustentabilidade" }, { time: "13h", mentions: 354, variation: 32, topic: "Inovação" },
  { time: "14h", mentions: 468, variation: 32, topic: "Inteligência Artificial" }, { time: "15h", mentions: 391, variation: -16, topic: "Infraestrutura" },
  { time: "16h", mentions: 427, variation: 9, topic: "Mobilidade urbana" }, { time: "17h", mentions: 327, variation: -23, topic: "Mercado profissional" },
];

export const topics: Topic[] = [
  { name: "Inteligência Artificial", volume: 1824, trend: "Em alta", change: 38 }, { name: "Sustentabilidade", volume: 1462, trend: "Em alta", change: 27 },
  { name: "Engenharia", volume: 1288, trend: "Estável", change: 3 }, { name: "Inovação", volume: 974, trend: "Em alta", change: 19 },
  { name: "Infraestrutura", volume: 816, trend: "Em queda", change: -6 },
];
export const emerging = [{ name: "Mobilidade urbana", change: 184 }, { name: "Novas tecnologias", change: 126 }, { name: "Mercado profissional", change: 74 }];
export const platforms = [{ name: "Instagram", value: 42 }, { name: "X", value: 25 }, { name: "Facebook", value: 14 }, { name: "YouTube", value: 8 }, { name: "LinkedIn", value: 7 }, { name: "Notícias", value: 4 }];
export const sentiment = [{ name: "Positivo", value: 72, change: "+4 p.p." }, { name: "Neutro", value: 20, change: "-2 p.p." }, { name: "Negativo", value: 8, change: "-2 p.p." }];

export const mentions: Mention[] = [
  { id: 1, author: "Marina Alves", handle: "@marina.eng", initials: "MA", platform: "Instagram", time: "há 4 min", text: "A discussão sobre IA aplicada à engenharia pública na 81ª SOEA trouxe exemplos muito concretos para Sergipe. Excelente programação!", sentiment: "Positivo", interactions: 284, topic: "Inteligência Artificial" },
  { id: 2, author: "CREA Sergipe", handle: "@creasergipe", initials: "CS", platform: "X", time: "há 9 min", text: "Sustentabilidade e infraestrutura resiliente no centro do debate. A engenharia brasileira reunida em Aracaju para construir caminhos.", sentiment: "Positivo", interactions: 516, topic: "Sustentabilidade" },
  { id: 3, author: "Rafael Mendonça", handle: "@rafael_agro", initials: "RM", platform: "LinkedIn", time: "há 18 min", text: "O painel sobre inovação no campo mostrou como dados e agronomia já transformam a produção com responsabilidade ambiental.", sentiment: "Positivo", interactions: 198, topic: "Inovação" },
  { id: 4, author: "Notícias SE", handle: "@noticiasse", initials: "NS", platform: "Notícias", time: "há 31 min", text: "Movimento intenso no entorno do centro de convenções durante a programação da 81ª SOEA nesta tarde.", sentiment: "Neutro", interactions: 91, topic: "Infraestrutura" },
  { id: 5, author: "Paulo Vieira", handle: "@paulovcivil", initials: "PV", platform: "Facebook", time: "há 44 min", text: "A fila para uma das palestras poderia ter melhor sinalização, apesar da qualidade do conteúdo apresentado.", sentiment: "Negativo", interactions: 74, topic: "Engenharia" },
];

export const officialContents: OfficialContent[] = [
  { title: "Reel · Abertura da 81ª SOEA", type: "Instagram", views: 186400, interactions: 12840, engagement: "6,9%" },
  { title: "Carrossel · Inovação que transforma", type: "Instagram", views: 124800, interactions: 9140, engagement: "7,3%" },
  { title: "Reel · Bastidores em Sergipe", type: "Instagram", views: 98200, interactions: 6810, engagement: "6,9%" },
  { title: "Post · Engenharia sustentável", type: "LinkedIn", views: 76800, interactions: 4920, engagement: "6,4%" },
  { title: "Vídeo · Especialista em IA", type: "YouTube", views: 54300, interactions: 3140, engagement: "5,8%" },
];

export const highlights: Highlight[] = [
  { author: "Confea", platform: "Instagram", excerpt: "A engenharia que transforma o Brasil está reunida em Sergipe.", reach: "428 mil", interactions: "32,8 mil", shares: "4.120", sentiment: "Positivo" },
  { author: "Portal Engenharia", platform: "X", excerpt: "IA, cidades e clima dominam a agenda da 81ª SOEA.", reach: "286 mil", interactions: "18,2 mil", shares: "2.870", sentiment: "Positivo" },
  { author: "Agro em Foco", platform: "YouTube", excerpt: "O futuro da agronomia passa por dados e sustentabilidade.", reach: "174 mil", interactions: "9,6 mil", shares: "1.340", sentiment: "Positivo" },
];