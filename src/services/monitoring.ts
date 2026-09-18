import type { Platform, Sentiment } from "@/types/dashboard";

export interface MonitoringFilters { period: string; platform: Platform; sentiment?: Sentiment | "Todos"; topic?: string; sort?: "recent" | "impact"; }
export interface MonitoringService<T> { getOverview(filters: MonitoringFilters): Promise<T>; refresh(): Promise<{ syncedAt: Date }>; }

export class MockMonitoringService<T> implements MonitoringService<T> {
  constructor(private readonly payload: T) {}
  async getOverview(): Promise<T> { return this.payload; }
  async refresh() { await new Promise((resolve) => setTimeout(resolve, 650)); return { syncedAt: new Date() }; }
}