export type Platform = "Todas" | "Instagram" | "X" | "Facebook" | "YouTube" | "LinkedIn" | "TikTok" | "Notícias";
export type Sentiment = "Positivo" | "Neutro" | "Negativo";

export interface Kpi { label: string; value: string; change?: string; detail: string; tone: "blue" | "green" | "amber" | "red"; info: string; }
export interface ConversationPoint { time: string; mentions: number; variation: number; topic: string; }
export interface Topic { name: string; volume: number; trend: "Em alta" | "Estável" | "Em queda"; change: number; }
export interface Mention { id: number; author: string; handle: string; initials: string; platform: Exclude<Platform, "Todas">; time: string; publishedAt: string; text: string; sentiment: Sentiment; engagement: number; comments?: number; rts?: number; topic: string; url?: string; }
export interface OfficialContent { title: string; type: string; occurrences: number; comments: number; engagement: string; sentiment: Sentiment; url?: string; }
export interface Highlight { author: string; platform: string; excerpt: string; estimatedReach: string; engagement: string; comments: string; rts?: string; sentiment: Sentiment; }
export interface PublisherInsight { name: string; handle: string; platform: Exclude<Platform, "Todas">; value: string; sentiment: Sentiment; profile: "Influente" | "Evangelizador" | "Agressor"; }
export interface GeoRanking { label: string; value: number; }
export interface PeakSummary { time: string; day: string; mentions: number; estimatedReach: string; topic: string; }
export interface BiAnswer { question: string; answer: string; }
