import { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  CalendarDays,
  Hash,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  MonitorPlay,
  Network,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Platform } from "@/types/dashboard";
import { OverviewDashboard } from "./overview-dashboard";
import {
  AlertsModule,
  BiAssistantWidget,
  ConversationsModule,
  PlatformsModule,
  SentimentModule,
  TopicsModule,
} from "./module-views";
import soeaProfile from "@/assets/soea-profile.jpg.asset.json";

const navigation = [
  { label: "Visão Geral", icon: LayoutDashboard },
  { label: "Conversas", icon: MessageSquareText },
  { label: "Sentimento", icon: Activity },
  { label: "Assuntos", icon: Hash },
  { label: "Plataformas", icon: Network },
  { label: "Alertas", icon: Bell, count: 5 },
];
function Brand() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="h-14 w-16 shrink-0 overflow-hidden rounded-md bg-primary">
        <img src={soeaProfile.url} alt="81ª SOEA" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold text-foreground sm:text-base">81ª SOEA</p>
        <p className="truncate text-xs text-muted-foreground">
          Social Listening e Performance Digital
        </p>
      </div>
    </div>
  );
}

export function DashboardShell() {
  const [active, setActive] = useState("Visão Geral");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [period, setPeriod] = useState("24h");
  const platform: Platform = "Todas";
  const [refreshing, setRefreshing] = useState(false);
  const [updated, setUpdated] = useState("há 3 minutos");
  const [presentationMode, setPresentationMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tvUserAgent = /smart-tv|smarttv|hbbtv|tizen|web0s|netcast|viera|bravia/i.test(
      window.navigator.userAgent,
    );
    const tvDisplay = window.matchMedia("(min-width: 1800px) and (min-height: 900px)").matches;
    setPresentationMode(params.get("presentation") === "tv" || tvUserAgent || tvDisplay);
  }, []);
  const refresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      setUpdated("agora");
    }, 700);
  };

  const renderContent = () => {
    if (active === "Visão Geral")
      return <OverviewDashboard platform={platform} presentationMode={presentationMode} />;
    if (active === "Conversas") return <ConversationsModule platform={platform} />;
    if (active === "Sentimento") return <SentimentModule />;
    if (active === "Assuntos") return <TopicsModule />;
    if (active === "Plataformas") return <PlatformsModule />;
    if (active === "Alertas") return <AlertsModule />;
    return <OverviewDashboard platform={platform} />;
  };

  const sidebar = (
    <>
      <div className="border-b border-sidebar-border px-5 py-5">
        <Brand />
      </div>
      <nav className="flex-1 space-y-1 p-3" aria-label="Navegação principal">
        {navigation.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            onClick={() => {
              setActive(item.label);
              setMobileOpen(false);
            }}
            className={`h-10 w-full justify-start px-3 ${active === item.label ? "bg-sidebar-accent text-primary shadow-sm" : "text-sidebar-foreground/70"}`}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.count ? (
              <span className="rounded-full bg-destructive px-1.5 py-0.5 text-[10px] text-destructive-foreground">
                {item.count}
              </span>
            ) : null}
          </Button>
        ))}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>Ambiente de monitoramento</span>
        </div>
        <p className="mt-1 pl-6 text-[11px] text-muted-foreground">81ª SOEA · Sergipe</p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        {sidebar}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[86%] max-w-72 flex-col bg-sidebar shadow-xl">
            {sidebar}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar menu"
            >
              <X />
            </Button>
          </aside>
        </div>
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:px-7">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu />
            </Button>
            <div className="hidden min-w-0 lg:block">
              <h1 className="truncate text-base font-bold">{active}</h1>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Dados atualizados {updated}
              </div>
            </div>
            <div className="min-w-0 lg:hidden">
              <p className="truncate text-sm font-bold">81ª SOEA</p>
              <p className="truncate text-[10px] text-muted-foreground">
                Dados atualizados {updated}
              </p>
            </div>
            <div className="col-span-3 flex min-w-0 items-center gap-2 overflow-x-auto pt-1 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:pt-0">
              <div className="flex h-9 shrink-0 items-center rounded-md border bg-background p-0.5">
                {["Hoje", "24h", "7 dias"].map((p) => (
                  <Button
                    key={p}
                    size="sm"
                    variant={period === p ? "secondary" : "ghost"}
                    className="h-7 px-2.5"
                    onClick={() => setPeriod(p)}
                  >
                    {p}
                  </Button>
                ))}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      aria-label="Período personalizado"
                    >
                      <CalendarDays />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end">
                    <p className="text-sm font-semibold">Período personalizado</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <label className="text-xs text-muted-foreground">
                        Início
                        <input
                          type="date"
                          className="mt-1 h-9 w-full rounded-md border bg-background px-2 text-foreground"
                        />
                      </label>
                      <label className="text-xs text-muted-foreground">
                        Fim
                        <input
                          type="date"
                          className="mt-1 h-9 w-full rounded-md border bg-background px-2 text-foreground"
                        />
                      </label>
                    </div>
                    <Button
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => setPeriod("Personalizado")}
                    >
                      Aplicar período
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
              <Button onClick={refresh} disabled={refreshing} className="shrink-0">
                <RefreshCw className={refreshing ? "animate-spin" : ""} />
                <span className="hidden xl:inline">Atualizar dados</span>
              </Button>
              <Button
                type="button"
                variant={presentationMode ? "secondary" : "outline"}
                className="hidden shrink-0 lg:inline-flex"
                onClick={() => setPresentationMode((current) => !current)}
                aria-pressed={presentationMode}
              >
                <MonitorPlay />
                {presentationMode ? "Sair do modo TV" : "Modo TV"}
              </Button>
            </div>
          </div>
        </header>
        <main
          className={
            presentationMode
              ? "overflow-hidden p-4 pb-6 lg:p-7 lg:pb-6"
              : "p-4 pb-28 lg:p-7 lg:pb-28"
          }
        >
          {renderContent()}
        </main>
      </div>
      <BiAssistantWidget />
    </div>
  );
}
