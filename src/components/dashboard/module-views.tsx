import { useEffect, useMemo, useRef, useState } from "react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { AlertTriangle, ArrowUpRight, Bot, Flame, Hash, Heart, MapPin, MessageCircle, Minimize2, Search, Send, Sparkles, User, Users, X } from "lucide-react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MiniRanking, Reading, SectionTitle, number, panel, sentimentClasses } from "./overview-dashboard";
import { answerQuestion, suggestedQuestions } from "@/lib/bi-assistant";
import { cityRanking, conversation, dailyOccurrences, emerging, hashtags, hashtags as topHashtags, kpis, mentions, monitoredTags, monitoringAlerts, peakSummary, platforms, publishers, sentiment, sentimentByPlatform, serviceOccurrences, stateRanking, topics, vTrackerIndicators } from "@/mocks/dashboard";
import type { AlertSeverity, BiChatMessage, Platform, Sentiment } from "@/types/dashboard";

function Stat({ label, value, hint }: { label: string; value: string; hint?: string | undefined }) {
  return <article className={`${panel} p-4`}><p className="truncate text-xs font-semibold text-muted-foreground">{label}</p><strong className="mt-2 block text-2xl font-extrabold tabular-nums">{value}</strong>{hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}</article>;
}

function PageHeader({ title, description }: { title: string; description: string }) {
  return <div><h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>;
}

/* ---------------------------------- Conversas --------------------------------- */
export function ConversationsModule({ platform }: { platform: Platform }) {
  const [query, setQuery] = useState("");
  const [mentionSentiment, setMentionSentiment] = useState<Sentiment | "Todos">("Todos");
  const [topic, setTopic] = useState("Todos");
  const [sort, setSort] = useState("recent");

  const filtered = useMemo(() => mentions
    .filter((m) => (platform === "Todas" || m.platform === platform)
      && (mentionSentiment === "Todos" || m.sentiment === mentionSentiment)
      && (topic === "Todos" || m.topic === topic)
      && (query.trim() === "" || `${m.text} ${m.author} ${m.handle} ${m.topic}`.toLowerCase().includes(query.trim().toLowerCase())))
    .sort((a, b) => (sort === "impact" ? b.engagement - a.engagement : a.id - b.id)), [platform, mentionSentiment, topic, sort, query]);

  return <div className="mx-auto max-w-[1600px] space-y-5">
    <PageHeader title="Conversas" description="Feed detalhado das ocorrências identificadas no social listening, com busca avançada." />
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Stat label="Ocorrências no período" value={kpis[0]?.value ?? "-"} hint={kpis[0]?.change} />
      <Stat label="Última hora" value={kpis[1]?.value ?? "-"} hint={kpis[1]?.change} />
      <Stat label="Publicadores únicos" value={vTrackerIndicators[0]?.value ?? "-"} />
      <Stat label="Horário de pico" value={peakSummary.time} hint={peakSummary.topic} />
    </section>

    <article className={panel}>
      <SectionTitle title="Evolução das conversas" subtitle="Volume de ocorrências ao longo do dia" />
      <div className="h-64 p-4"><ResponsiveContainer width="100%" height="100%"><AreaChart data={conversation} margin={{ top: 12, right: 8, left: -22, bottom: 0 }}><defs><linearGradient id="convFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.28} /><stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 3" /><XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} /><Area type="monotone" dataKey="mentions" stroke="var(--primary)" strokeWidth={2.5} fill="url(#convFill)" /></AreaChart></ResponsiveContainer></div>
    </article>

    <article className={panel}>
      <SectionTitle title="Busca avançada" subtitle="Filtre por termo, sentimento, assunto e ordenação" />
      <div className="grid gap-2 border-b p-3 md:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
        <div className="relative min-w-0"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por termo, autor ou assunto" className="pl-9" aria-label="Buscar nas conversas" /></div>
        <Select value={mentionSentiment} onValueChange={(v) => setMentionSentiment(v as Sentiment | "Todos")}><SelectTrigger className="w-full md:w-36"><SelectValue /></SelectTrigger><SelectContent>{["Todos", "Positivo", "Neutro", "Negativo"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
        <Select value={topic} onValueChange={setTopic}><SelectTrigger className="w-full md:w-44"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Todos">Todos os assuntos</SelectItem>{topics.map((t) => <SelectItem key={t.name} value={t.name}>{t.name}</SelectItem>)}</SelectContent></Select>
        <Select value={sort} onValueChange={setSort}><SelectTrigger className="w-full md:w-44"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="recent">Mais recentes</SelectItem><SelectItem value="impact">Maior repercussão</SelectItem></SelectContent></Select>
      </div>
      <div className="divide-y">{filtered.length ? filtered.map((m) => <div key={m.id} className="p-5"><div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-primary">{m.initials}</div><div className="min-w-0"><div className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="text-sm font-bold">{m.author}</span><span className="text-xs text-muted-foreground">{m.handle}</span><span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold">{m.platform}</span><span className="text-[10px] text-muted-foreground">{m.publishedAt}</span></div><p className="mt-2 text-sm leading-6 text-foreground/85">{m.text}</p><div className="mt-3 flex flex-wrap items-center gap-3"><span className={`rounded px-2 py-1 text-[10px] font-semibold ${sentimentClasses[m.sentiment]}`}>{m.sentiment}</span><span className="flex items-center gap-1 text-xs text-muted-foreground"><Heart className="h-3.5 w-3.5" />{m.engagement} engagement</span>{typeof m.comments === "number" && <span className="flex items-center gap-1 text-xs text-muted-foreground"><MessageCircle className="h-3.5 w-3.5" />{m.comments} comentários</span>}<span className="text-xs text-muted-foreground">{m.topic}</span></div></div>{m.url ? <Button variant="ghost" size="icon" asChild aria-label={`Ver publicação de ${m.author}`}><a href={m.url} target="_blank" rel="noreferrer"><ArrowUpRight /></a></Button> : <Button variant="ghost" size="sm" disabled className="shrink-0">Sem link</Button>}</div></div>) : <p className="p-8 text-center text-sm text-muted-foreground">Nenhuma conversa corresponde aos filtros aplicados.</p>}</div>
      <Reading>{filtered.length} de {mentions.length} ocorrências demonstrativas exibidas com os filtros atuais.</Reading>
    </article>
  </div>;
}

/* --------------------------------- Sentimento -------------------------------- */
export function SentimentModule() {
  const colors = ["oklch(0.66 0.15 155)", "oklch(0.72 0.03 240)", "oklch(0.63 0.22 25)"];
  const bySentiment = (["Positivo", "Neutro", "Negativo"] as Sentiment[]).map((name) => ({ name, count: mentions.filter((m) => m.sentiment === name).length }));
  return <div className="mx-auto max-w-[1600px] space-y-5">
    <PageHeader title="Sentimento" description="Análise aprofundada de polaridade das conversas, por plataforma, assunto e tags monitoradas." />
    <section className="grid grid-cols-3 gap-3">{sentiment.map((s, i) => <Stat key={s.name} label={`Sentimento ${s.name.toLowerCase()}`} value={`${s.value}%`} hint={`${s.change} vs. período anterior`} />).concat()}</section>
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <article className={panel}><SectionTitle title="Distribuição de sentimento" subtitle="Participação de cada polaridade" />
        <div className="grid grid-cols-[160px_1fr] items-center gap-3 p-5"><div className="relative h-40"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={sentiment} dataKey="value" innerRadius={50} outerRadius={70} paddingAngle={3} stroke="none">{colors.map((c) => <Cell key={c} fill={c} />)}</Pie></PieChart></ResponsiveContainer><div className="absolute inset-0 flex flex-col items-center justify-center"><strong className="text-2xl">{sentiment[0]?.value}%</strong><span className="text-[10px] text-muted-foreground">positivo</span></div></div>
          <div className="space-y-3">{sentiment.map((s, i) => <div key={s.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-2 text-xs"><span className="h-2 w-2 rounded-full" style={{ background: colors[i] }} /><span>{s.name} <strong>{s.value}%</strong></span><span className="text-muted-foreground">{s.change}</span></div>)}</div>
        </div>
        <Reading>O sentimento {sentiment[0]?.name.toLowerCase()} lidera com {sentiment[0]?.value}% das ocorrências classificadas.</Reading>
      </article>
      <article className={panel}><SectionTitle title="Sentimento por plataforma" subtitle="Comparativo de polaridade em cada canal" />
        <div className="space-y-4 p-5">{sentimentByPlatform.map((row) => <div key={row.platform}><div className="mb-1.5 flex justify-between text-xs"><span className="font-medium">{row.platform}</span><span className="text-muted-foreground">{row.positive}% positivo · {row.neutral}% neutro · {row.negative}% negativo</span></div><div className="flex h-2.5 overflow-hidden rounded-full bg-muted"><span className="bg-emerald-500" style={{ width: `${row.positive}%` }} /><span className="bg-slate-400" style={{ width: `${row.neutral}%` }} /><span className="bg-rose-500" style={{ width: `${row.negative}%` }} /></div></div>)}</div>
        <Reading>LinkedIn apresenta a maior proporção positiva, enquanto X concentra o maior volume relativo de negativos.</Reading>
      </article>
    </section>
    <section className="grid gap-5 lg:grid-cols-3">
      <article className={panel}><SectionTitle title="Tags monitoradas" subtitle="Termos acompanhados e sua polaridade" /><div className="divide-y">{monitoredTags.map((tag) => <div key={tag.name} className="flex items-center justify-between gap-3 px-5 py-3"><span className="text-sm font-semibold">{tag.name}</span><div className="flex items-center gap-2"><span className="text-xs text-muted-foreground">{number.format(tag.value)} ocorrências</span><span className={`rounded px-2 py-1 text-[10px] font-semibold ${sentimentClasses[tag.sentiment as Sentiment]}`}>{tag.sentiment}</span></div></div>)}</div></article>
      <article className={panel}><SectionTitle title="Sentimento no feed" subtitle="Classificação das menções demonstrativas" /><div className="space-y-3 p-5">{bySentiment.map((item) => <div key={item.name} className="flex items-center justify-between rounded-md border bg-background p-4 text-sm"><span className={`rounded px-2 py-1 text-[10px] font-semibold ${sentimentClasses[item.name]}`}>{item.name}</span><strong>{item.count} menções</strong></div>)}</div></article>
      <article className={panel}><SectionTitle title="Publicadores por polaridade" subtitle="Perfis influentes, evangelizadores e agressores" /><div className="divide-y">{publishers.map((p) => <div key={p.handle} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-4"><div className="grid h-9 w-9 place-items-center rounded-md bg-accent text-primary"><Users className="h-4 w-4" /></div><div className="min-w-0"><p className="truncate text-sm font-bold">{p.name}</p><p className="text-xs text-muted-foreground">{p.platform} · {p.profile}</p></div><span className={`rounded px-2 py-1 text-[10px] font-semibold ${sentimentClasses[p.sentiment]}`}>{p.sentiment}</span></div>)}</div></article>
    </section>
  </div>;
}

/* ---------------------------------- Assuntos --------------------------------- */
export function TopicsModule() {
  return <div className="mx-auto max-w-[1600px] space-y-5">
    <PageHeader title="Assuntos" description="Trending topics, ranking de termos, hashtags e temas emergentes das conversas." />
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Stat label="Assunto líder" value={topics[0]?.name ?? "-"} hint={`${number.format(topics[0]?.volume ?? 0)} ocorrências`} />
      <Stat label="Maior crescimento" value={`+${emerging[0]?.change ?? 0}%`} hint={emerging[0]?.name} />
      <Stat label="Hashtag principal" value={topHashtags[0]?.name ?? "-"} hint={`${number.format(topHashtags[0]?.value ?? 0)} ocorrências`} />
      <Stat label="Assunto do pico" value={peakSummary.topic} hint={`Pico às ${peakSummary.time}`} />
    </section>
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <article className={panel}><SectionTitle title="Ranking de assuntos" subtitle="Volume e tendência por tema" /><div className="divide-y">{topics.map((t, i) => <div key={t.name} className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3 px-5 py-3"><span className="text-xs font-bold text-muted-foreground">{i + 1}</span><div className="min-w-0"><p className="truncate text-sm font-semibold">{t.name}</p><div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${(t.volume / (topics[0]?.volume ?? 1)) * 100}%` }} /></div><p className="mt-1 text-xs text-muted-foreground">{number.format(t.volume)} ocorrências · {t.trend}</p></div><span className={`text-xs font-bold ${t.change > 5 ? "text-emerald-600" : t.change < 0 ? "text-destructive" : "text-muted-foreground"}`}>{t.change > 0 ? "+" : ""}{t.change}%</span></div>)}</div><Reading>{topics[0]?.name} lidera as conversas do período com {number.format(topics[0]?.volume ?? 0)} ocorrências.</Reading></article>
      <div className="space-y-5">
        <article className={panel}><SectionTitle title="Temas emergentes" subtitle="Crescimento acelerado nas últimas horas" /><div className="space-y-3 p-5">{emerging.map((item, i) => <div key={item.name} className="flex items-center gap-4 rounded-md border bg-background p-4"><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${i === 0 ? "bg-amber-100 text-amber-700" : "bg-accent text-primary"}`}><Sparkles className="h-5 w-5" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{item.name}</p><p className="text-xs text-muted-foreground">crescimento nas conversas</p></div><span className="text-sm font-extrabold text-emerald-600">+{item.change}%</span></div>)}</div></article>
        <article className={panel}><SectionTitle title="Hashtags monitoradas" subtitle="Termos com maior volume" /><div className="p-5"><MiniRanking items={hashtags.map((h) => ({ label: h.name, value: h.value }))} /></div><div className="px-5 pb-5 text-xs text-muted-foreground"><Hash className="mr-1 inline h-3.5 w-3.5 text-primary" />Tags por sentimento: {monitoredTags.map((t) => `${t.name} (${t.sentiment})`).join(", ")}</div></article>
      </div>
    </section>
    <section className="grid gap-5 md:grid-cols-2">
      <article className={panel}><SectionTitle title="Ocorrências por dia" subtitle="Recorte demonstrativo" /><div className="p-5"><MiniRanking items={dailyOccurrences} /></div></article>
      <article className={panel}><SectionTitle title="Assuntos no pico" subtitle="Tema principal de cada hora" /><div className="divide-y">{conversation.slice(-6).map((point) => <div key={point.time} className="flex items-center justify-between px-5 py-3 text-sm"><span className="font-semibold">{point.time}</span><span className="text-muted-foreground">{point.topic}</span><strong className="tabular-nums">{number.format(point.mentions)}</strong></div>)}</div></article>
    </section>
  </div>;
}

/* -------------------------------- Plataformas -------------------------------- */
export function PlatformsModule() {
  return <div className="mx-auto max-w-[1600px] space-y-5">
    <PageHeader title="Plataformas" description="Detalhamento por canal, share of voice e origem das conversas." />
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Stat label="Canal líder" value={platforms[0]?.name ?? "-"} hint={`${platforms[0]?.value}% das ocorrências`} />
      <Stat label="Canais monitorados" value={String(platforms.length)} hint="Redes sociais, vídeo e notícias" />
      <Stat label="Taxa de engajamento" value={vTrackerIndicators[1]?.value ?? "-"} />
      <Stat label="Alcance potencial" value={kpis[2]?.value ?? "-"} />
    </section>
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <article className={panel}><SectionTitle title="Share of voice" subtitle="Participação percentual por plataforma" /><div className="space-y-3 p-5">{platforms.map((p) => <div key={p.name}><div className="mb-1.5 flex justify-between text-xs"><span className="font-medium">{p.name}</span><strong>{p.value}%</strong></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${p.value}%` }} /></div></div>)}</div><Reading>{platforms[0]?.name} concentra {platforms[0]?.value}% das ocorrências do período.</Reading></article>
      <article className={panel}><SectionTitle title="Sentimento por canal" subtitle="Polaridade em cada plataforma" /><div className="space-y-4 p-5">{sentimentByPlatform.map((row) => <div key={row.platform}><div className="mb-1.5 flex justify-between text-xs"><span className="font-medium">{row.platform}</span><span className="text-muted-foreground">{row.positive}% positivo</span></div><div className="flex h-2.5 overflow-hidden rounded-full bg-muted"><span className="bg-emerald-500" style={{ width: `${row.positive}%` }} /><span className="bg-slate-400" style={{ width: `${row.neutral}%` }} /><span className="bg-rose-500" style={{ width: `${row.negative}%` }} /></div></div>)}</div></article>
    </section>
    <section className="grid gap-5 lg:grid-cols-3">
      <article className={panel}><SectionTitle title="Ocorrências por serviço" subtitle="Agrupamento da fonte" /><div className="p-5"><MiniRanking items={serviceOccurrences} suffix="%" /></div></article>
      <article className={panel}><SectionTitle title="Ranking dos estados" subtitle="Origem geográfica das conversas" /><div className="p-5"><div className="mb-2 flex items-center gap-1 text-xs font-bold"><MapPin className="h-3.5 w-3.5 text-primary" />Estados</div><MiniRanking items={stateRanking} /></div></article>
      <article className={panel}><SectionTitle title="Ranking das cidades" subtitle="Cidades com maior volume" /><div className="p-5"><MiniRanking items={cityRanking} /></div></article>
    </section>
  </div>;
}

/* ---------------------------------- Alertas ---------------------------------- */
const severityClasses: Record<AlertSeverity, string> = { Alta: "bg-rose-50 text-rose-700", Média: "bg-amber-50 text-amber-700", Baixa: "bg-slate-100 text-slate-600" };

export function AlertsModule() {
  const [severity, setSeverity] = useState<AlertSeverity | "Todas">("Todas");
  const filtered = monitoringAlerts.filter((a) => severity === "Todas" || a.severity === severity);
  return <div className="mx-auto max-w-[1600px] space-y-5">
    <PageHeader title="Alertas" description="Central de anomalias, picos de conversa e variações relevantes de sentimento." />
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Stat label="Alertas ativos" value={String(monitoringAlerts.length)} />
      <Stat label="Prioridade alta" value={String(monitoringAlerts.filter((a) => a.severity === "Alta").length)} />
      <Stat label="Último alerta" value={monitoringAlerts[0]?.time.split(" ")[1] ?? "-"} hint={monitoringAlerts[0]?.type} />
      <Stat label="Saúde das ocorrências" value={vTrackerIndicators[3]?.value ?? "-"} />
    </section>
    <article className={panel}>
      <SectionTitle title="Central de alertas" subtitle="Ocorrências que exigem atenção da equipe" action={<Select value={severity} onValueChange={(v) => setSeverity(v as AlertSeverity | "Todas")}><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent>{["Todas", "Alta", "Média", "Baixa"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>} />
      <div className="divide-y">{filtered.map((alert) => <div key={alert.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 p-5">
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${alert.severity === "Alta" ? "bg-rose-50 text-rose-600" : alert.severity === "Média" ? "bg-amber-50 text-amber-600" : "bg-accent text-primary"}`}>{alert.severity === "Alta" ? <Flame className="h-5 w-5" /> : alert.severity === "Média" ? <AlertTriangle className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}</div>
        <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold">{alert.type}</p><span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${severityClasses[alert.severity]}`}>{alert.severity}</span><span className="text-[10px] text-muted-foreground">{alert.time}</span></div><p className="mt-1 text-sm">{alert.message}</p><p className="mt-1 text-xs text-muted-foreground">{alert.detail}</p><p className="mt-2 text-xs text-muted-foreground">{alert.topic} · {alert.platform}</p></div>
        <span className="text-xs text-muted-foreground">#{alert.id}</span>
      </div>)}</div>
      <Reading>Alertas demonstrativos gerados a partir de variações de volume, sentimento, assunto, plataforma e localização.</Reading>
    </article>
  </div>;
}

/* ------------------------------- Assistente BI ------------------------------- */
export function BiAssistantModule() {
  const [messages, setMessages] = useState<BiChatMessage[]>([{ id: 1, role: "assistant", text: "Olá! Sou o assistente de BI da 81ª SOEA. Pergunte sobre volume de ocorrências, sentimento, plataformas, assuntos, publicadores, origem geográfica, conteúdos, picos ou alertas do painel." }]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [messages]);

  const ask = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [...prev, { id: prev.length + 1, role: "user", text: value }, { id: prev.length + 2, role: "assistant", text: answerQuestion(value) }]);
    setInput("");
    inputRef.current?.focus();
  };

  return <div className="mx-auto max-w-4xl space-y-5">
    <PageHeader title="Assistente BI" description="Converse com os dados do painel. As respostas são calculadas diretamente sobre os indicadores exibidos, sem uso de IA externa." />
    <article className={`${panel} flex h-[62vh] min-h-[420px] flex-col`}>
      <SectionTitle title="Chat de análise" subtitle="Respostas determinísticas baseadas nos dados da dashboard" info="O assistente interpreta a pergunta por palavras-chave e responde com os números exibidos no painel." />
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((message) => <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
          {message.role === "assistant" && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent text-primary"><Bot className="h-4 w-4" /></div>}
          <div className={message.role === "user" ? "max-w-[80%] rounded-lg bg-primary px-4 py-2.5 text-sm leading-6 text-primary-foreground" : "max-w-[85%] text-sm leading-6 text-foreground"}>{message.text}</div>
          {message.role === "user" && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground"><User className="h-4 w-4" /></div>}
        </div>)}
        <div ref={endRef} />
      </div>
      <div className="border-t p-3">
        <div className="mb-3 flex flex-wrap gap-2">{suggestedQuestions.slice(0, 5).map((q) => <Button key={q} variant="outline" size="sm" className="h-7 text-xs" onClick={() => ask(q)}>{q}</Button>)}</div>
        <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); ask(input); }}>
          <Input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pergunte algo sobre os dados do painel" aria-label="Pergunta para o assistente de BI" />
          <Button type="submit" size="icon" disabled={!input.trim()} aria-label="Enviar pergunta"><Send /></Button>
        </form>
      </div>
    </article>
  </div>;
}

export function BiAssistantWidget() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<BiChatMessage[]>([{ id: 1, role: "assistant", text: "Olá! Sou o assistente de BI da 81ª SOEA. Pergunte sobre ocorrências, sentimento, plataformas, assuntos, publicadores, cidades, picos ou alertas." }]);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { if (open) textareaRef.current?.focus(); }, [open]);
  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [messages, open]);

  const ask = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [...prev, { id: prev.length + 1, role: "user", text: value }, { id: prev.length + 2, role: "assistant", text: answerQuestion(value) }]);
    setDraft("");
    window.setTimeout(() => textareaRef.current?.focus(), 0);
  };

  if (!open) {
    return <Button type="button" className="fixed bottom-5 right-5 z-50 h-12 rounded-full px-4 shadow-lg" onClick={() => setOpen(true)} aria-label="Abrir Assistente BI"><Bot className="h-4 w-4" />Assistente BI</Button>;
  }

  return <aside className="fixed bottom-4 right-4 z-50 flex h-[min(680px,calc(100vh-2rem))] w-[calc(100vw-2rem)] max-w-[410px] flex-col rounded-lg border bg-card shadow-xl sm:bottom-5 sm:right-5" aria-label="Assistente BI">
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b p-3">
      <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground"><Bot className="h-4 w-4" /></div>
      <div className="min-w-0"><h2 className="truncate text-sm font-extrabold">Assistente BI</h2><p className="truncate text-[11px] text-muted-foreground">Pergunte sobre os dados da 81ª SOEA</p></div>
      <div className="flex items-center gap-1"><Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)} aria-label="Minimizar Assistente BI"><Minimize2 className="h-4 w-4" /></Button><Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => setMessages([{ id: 1, role: "assistant", text: "Chat reiniciado. Pode perguntar sobre ocorrências, sentimento, plataformas, assuntos, publicadores, cidades, picos ou alertas." }])} aria-label="Limpar conversa"><X className="h-4 w-4" /></Button></div>
    </div>
    <Conversation className="min-h-0 flex-1">
      <ConversationContent className="gap-4 p-4">
        {messages.map((message) => <Message key={message.id} from={message.role} className="max-w-full">
          <MessageContent className={message.role === "user" ? "bg-primary text-primary-foreground" : "max-w-[92%]"}>
            <MessageResponse>{message.text}</MessageResponse>
          </MessageContent>
        </Message>)}
        <div ref={endRef} />
      </ConversationContent>
      <ConversationScrollButton className="bottom-3" />
    </Conversation>
    <div className="border-t p-3">
      <div className="mb-2 flex gap-2 overflow-x-auto pb-1">{suggestedQuestions.slice(0, 4).map((question) => <Button key={question} type="button" variant="outline" size="sm" className="h-7 shrink-0 text-[11px]" onClick={() => ask(question)}>{question}</Button>)}</div>
      <PromptInput onSubmit={(message) => ask(message.text)}>
        <PromptInputTextarea ref={textareaRef} value={draft} onChange={(event) => setDraft(event.currentTarget.value)} placeholder="Pergunte algo sobre os dados" className="min-h-14 text-sm" />
        <PromptInputFooter className="justify-end">
          <PromptInputSubmit disabled={!draft.trim()} aria-label="Enviar pergunta"><Send className="h-4 w-4" /></PromptInputSubmit>
        </PromptInputFooter>
      </PromptInput>
    </div>
  </aside>;
}
