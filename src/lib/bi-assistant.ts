import {
  cityRanking,
  conversation,
  emerging,
  hashtags,
  highlights,
  mentions,
  monitoringAlerts,
  officialContents,
  peakSummary,
  platforms,
  publishers,
  sentiment,
  stateRanking,
  topics,
  vTrackerIndicators,
  kpis,
} from "@/mocks/dashboard";

const number = new Intl.NumberFormat("pt-BR");

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const list = (
  items: Array<{ label?: string; name?: string; value?: number | string }>,
  suffix = "",
) =>
  items
    .map(
      (item) =>
        `${item.label ?? item.name} (${typeof item.value === "number" ? number.format(item.value) : item.value}${suffix})`,
    )
    .join(", ");

interface Rule {
  keywords: string[];
  answer: () => string;
}

const rules: Rule[] = [
  {
    keywords: [
      "quantas mencoes",
      "total de mencoes",
      "quantas ocorrencias",
      "volume total",
      "quantos registros",
    ],
    answer: () =>
      `No período monitorado foram identificadas ${kpis[0]?.value} ocorrências, com variação de ${kpis[0]?.change} em relação ao período anterior. Na última hora foram ${kpis[1]?.value} ocorrências.`,
  },
  {
    keywords: ["sentimento", "positivo", "negativo", "neutro", "polaridade"],
    answer: () =>
      `A distribuição de sentimento está em ${sentiment.map((s) => `${s.name.toLowerCase()} ${s.value}% (${s.change})`).join(", ")}. O sentimento predominante é ${sentiment[0]?.name.toLowerCase()}.`,
  },
  {
    keywords: ["plataforma", "canal", "rede social", "share of voice", "onde estao falando"],
    answer: () =>
      `A distribuição por plataforma é: ${platforms.map((p) => `${p.name} ${p.value}%`).join(", ")}. ${platforms[0]?.name} concentra a maior parte das ocorrências.`,
  },
  {
    keywords: ["pico", "horario", "hora de maior", "maior volume", "dia de maior"],
    answer: () =>
      `O horário de pico foi ${peakSummary.time}, com ${number.format(peakSummary.mentions)} ocorrências associadas ao tema ${peakSummary.topic}. O dia de maior volume foi ${peakSummary.day}, com alcance estimado de ${peakSummary.estimatedReach}.`,
  },
  {
    keywords: ["assunto", "tema", "topico", "trending", "mais citado"],
    answer: () =>
      `Os assuntos com maior volume são: ${topics.map((t) => `${t.name} (${number.format(t.volume)} ocorrências, ${t.change > 0 ? "+" : ""}${t.change}%)`).join(", ")}.`,
  },
  {
    keywords: ["emergente", "crescendo", "crescimento rapido", "em ascensao"],
    answer: () =>
      `Os temas emergentes são: ${emerging.map((item) => `${item.name} (+${item.change}%)`).join(", ")}.`,
  },
  {
    keywords: ["hashtag", "tag"],
    answer: () => `As hashtags com maior volume são: ${list(hashtags)}.`,
  },
  {
    keywords: ["publicador", "autor", "perfil", "influente", "evangelizador", "agressor"],
    answer: () =>
      `Foram identificados ${vTrackerIndicators[0]?.value} publicadores únicos. Entre os destaques: ${publishers.map((p) => `${p.name} (${p.profile}, ${p.value}, sentimento ${p.sentiment.toLowerCase()})`).join("; ")}.`,
  },
  {
    keywords: ["cidade", "municipio", "aracaju"],
    answer: () =>
      `O ranking de cidades é: ${list(cityRanking)} ocorrências. Aracaju, cidade-sede, lidera o volume.`,
  },
  {
    keywords: ["estado", "regiao", "geografia", "origem", "localizacao", "sergipe"],
    answer: () =>
      `O ranking de estados é: ${list(stateRanking)} ocorrências. Sergipe concentra a maior parte das conversas por ser o estado-sede.`,
  },
  {
    keywords: ["engajamento", "interacoes", "engagement"],
    answer: () =>
      `As interações totais somam ${kpis[3]?.value} e a taxa de engajamento está em ${vTrackerIndicators[1]?.value}. O alcance potencial estimado é de ${kpis[2]?.value}.`,
  },
  {
    keywords: ["alerta", "anomalia", "atencao", "risco"],
    answer: () =>
      `Existem ${monitoringAlerts.length} alertas ativos. Prioritário: ${monitoringAlerts[0]?.message} (${monitoringAlerts[0]?.time}). Também há: ${monitoringAlerts
        .slice(1, 3)
        .map((a) => a.message)
        .join("; ")}.`,
  },
  {
    keywords: ["conteudo", "publicacao oficial", "reel", "post"],
    answer: () =>
      `As publicações monitoradas com maior repercussão são: ${officialContents
        .slice(0, 3)
        .map(
          (c) =>
            `${c.title} (${number.format(c.occurrences)} ocorrências, engagement ${c.engagement})`,
        )
        .join("; ")}.`,
  },
  {
    keywords: ["destaque", "viral", "maior repercussao"],
    answer: () =>
      `As menções de maior repercussão são: ${highlights.map((h) => `${h.author} no ${h.platform} (alcance estimado ${h.estimatedReach}, ${h.engagement} de engagement)`).join("; ")}.`,
  },
  {
    keywords: ["evolucao", "ao longo do tempo", "linha do tempo", "grafico"],
    answer: () =>
      `A curva de conversas vai de ${conversation[0]?.mentions} ocorrências às ${conversation[0]?.time} até ${conversation[conversation.length - 1]?.mentions} às ${conversation[conversation.length - 1]?.time}, com máxima de ${number.format(peakSummary.mentions)} às ${peakSummary.time}.`,
  },
  {
    keywords: ["mencao recente", "ultimas mencoes", "feed", "o que estao dizendo"],
    answer: () =>
      `As menções mais recentes incluem ${mentions
        .slice(0, 3)
        .map((m) => `${m.author} (${m.platform}, ${m.sentiment.toLowerCase()})`)
        .join("; ")}. Exemplo: “${mentions[0]?.text}”`,
  },
  {
    keywords: ["resumo", "visao geral", "panorama", "destaques do periodo"],
    answer: () =>
      `Resumo do período: ${kpis[0]?.value} ocorrências (${kpis[0]?.change}), sentimento ${sentiment[0]?.name.toLowerCase()} em ${sentiment[0]?.value}%, ${platforms[0]?.name} como principal plataforma (${platforms[0]?.value}%), ${topics[0]?.name} como assunto mais citado e pico às ${peakSummary.time}.`,
  },
];

export const suggestedQuestions = [
  "Qual é o resumo do período?",
  "Quantas ocorrências tivemos?",
  "Como está o sentimento das conversas?",
  "Qual plataforma concentra mais menções?",
  "Qual foi o horário de pico?",
  "Quais são os assuntos mais citados?",
  "De quais cidades vêm as conversas?",
  "Quais alertas estão ativos?",
];

export function answerQuestion(question: string): string {
  const q = normalize(question);
  const match = rules.find((rule) => rule.keywords.some((keyword) => q.includes(keyword)));
  if (match) return match.answer();
  const loose = rules.find((rule) =>
    rule.keywords.some((keyword) => keyword.split(" ").every((word) => q.includes(word))),
  );
  if (loose) return loose.answer();
  return "Ainda não tenho uma leitura para essa pergunta. Posso responder sobre volume de ocorrências, sentimento, plataformas, assuntos, temas emergentes, publicadores, origem geográfica, conteúdos monitorados, picos e alertas do painel.";
}
