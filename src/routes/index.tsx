import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visão Geral | Monitoramento da 81ª SOEA" },
      { name: "description", content: "Painel executivo de social listening, sentimento e performance digital da 81ª SOEA em Sergipe." },
      { property: "og:title", content: "Monitoramento da 81ª SOEA" },
      { property: "og:description", content: "Social Listening e Performance Digital da 81ª SOEA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <DashboardShell />;
}
