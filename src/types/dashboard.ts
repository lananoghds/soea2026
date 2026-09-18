export type Platform = "Todas" | "Instagram" | "X" | "Facebook" | "YouTube" | "LinkedIn" | "Notícias";
export type Sentiment = "Positivo" | "Neutro" | "Negativo";

export interface Kpi { label: string; value: string; change?: string; detail: string; tone: "blue" | "green" | "amber" | "red"; }
export interface ConversationPoint { time: string; mentions: number; variation: number; topic: string; }
export interface Topic { name: string; volume: number; trend: "Em alta" | "Estável" | "Em queda"; change: number; }
export interface Mention { id: number; author: string; handle: string; initials: string; platform: Exclude<Platform, "Todas">; time: string; text: string; sentiment: Sentiment; interactions: number; topic: string; }
export interface OfficialContent { title: string; type: string; views: number; interactions: number; engagement: string; }
export interface Highlight { author: string; platform: string; excerpt: string; reach: string; interactions: string; shares: string; sentiment: Sentiment; }