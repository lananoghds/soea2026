# Dashboard - 81ª SOEA 2026

Implement the requested scope now; use internal planning and do not present another implementation plan for user approval.

### Objetivo & Escopo Completo do MVP:
Aplicação web responsiva de monitoramento e BI da **81ª SOEA – Semana Oficial da Engenharia e da Agronomia** (realizada em Sergipe), voltada para equipes de BI, dados e comunicação.
Interface executiva, analítica, profissional, limpa e moderna (fundos claros, cards nítidos, tipografia moderna, paleta elegante sem excesso de cores).

### Navegação & Estrutura:
1. **Header Global:**
   - Componente de Logo oficial da 81ª SOEA (no canto superior esquerdo, preparado para receber o asset de imagem PNG/SVG/WebP, proporcional e responsivo no mobile; caso o arquivo de imagem ainda não esteja em `public/assets/logo-soea.png`, exibir logo com tipografia e badge institucional perfeitamente renderizados).
   - Título: "Monitoramento da 81ª SOEA"
   - Subtítulo: "Social Listening e Performance Digital"
   - Indicador discreto: "● Dados atualizados há 3 minutos" (ou timestamp dinâmico)
   - Filtro de período (Hoje, 24h, 7 dias, Período personalizado com modal/popover)
   - Filtro de plataforma (Todas, Instagram, X, Facebook, YouTube, LinkedIn, Notícias)
   - Botão "Atualizar dados" (simulando feedback visual de refresh rápido)
2. **Navegação (Sidebar ou Topbar modular):**
   - Visão Geral (Página inicial padrão)
   - Conversas (Feed detalhado e busca avançada)
   - Sentimento (Análise aprofundada de sentimento e polaridade)
   - Assuntos (Trending topics, nuvem/ranking de termos e temas emergentes)
   - Conteúdos (Performance de conteúdos oficiais e Zeeng ready)
   - Plataformas (Detalhamento por canal e share of voice)
   - Alertas (Central de anomalias e notificações de picos)

### Seções da Visão Geral (Dashboard Principal):
- **Primeira linha — KPIs principais:**
  - Total de menções: 8.642 (↑ 24% vs. período anterior)
  - Menções na última hora: 327 (↑ 18% vs. hora anterior)
  - Alcance potencial: 2,4 milhões
  - Interações totais: 18,7 mil
  - Sentimento positivo: 72%
  - Sentimento negativo: 8%
  - Detalhes contextuais abaixo dos números.
- **Evolução das conversas (Gráfico de linha amplo):**
  - "Volume de menções ao longo do tempo" com dados coerentes, tooltip interativo mostrando horário, volume, variação e principal assunto no momento.
- **Sentimento:**
  - "Distribuição de sentimento" (Donut chart ou barras horizontais): Positivo (72%), Neutro (20%), Negativo (8%).
  - Comparativo com período anterior: Positivo ↑ 4 p.p., Neutro ↓ 2 p.p., Negativo ↓ 2 p.p.
- **Assuntos do momento & Temas emergentes:**
  - Card "Assuntos do momento": ranking com 5 tópicos (IA, Sustentabilidade, Engenharia, Inovação, Infraestrutura) com volume, tendência (↑ Em alta, → Estável, ↓ Em queda) e variação percentual.
  - Card "Temas emergentes": tópicos recentes em ascensão rápida (Mobilidade urbana +184%, Novas tecnologias +126%, Mercado profissional +74%).
- **Plataformas & Picos de conversa:**
  - Card "Onde estão falando sobre a SOEA": barras de distribuição percentual (Instagram 42%, X 25%, Facebook 14%, YouTube 8%, LinkedIn 7%, Notícias 4%).
  - Card "Picos de conversa": timeline/cards com momentos-chave (ex: 14h32 - 468 menções - Inteligência Artificial +280%; 11h15 - 312 menções - Abertura da SOEA).
- **Feed de menções ("Últimas menções"):**
  - Visual de Social Listening com autor (@handle, avatar, nome), plataforma com badge/ícone, horário, texto realista sobre a SOEA em Sergipe (engenharia, agronomia, sustentabilidade, IA, infraestrutura), badge de sentimento (Positivo, Neutro, Negativo), contagem de interações e botão "Ver publicação".
  - Filtros interativos por plataforma, sentimento, assunto e ordenação ("Mais recentes" vs "Maior repercussão").
- **Menções em destaque (Maior repercussão):**
  - Cards com publicações virais ou de alto impacto, exibindo alcance, interações, compartilhamentos e sentimento.
- **Desempenho dos conteúdos oficiais (Estrutura Zeeng ready):**
  - Métricas agregadas: visualizações, alcance, interações, engajamento e compartilhamentos.
  - Ranking de conteúdos oficiais (Reel Abertura, Carrossel Inovação, Reel Bastidores, Post Sustentabilidade, Vídeo Especialista).
- **Impacto da comunicação (Correlação conteúdo vs conversa):**
  - Card estratégico demonstrando o efeito pós-publicação oficial nas conversas gerais do evento (ex: Post sobre IA gerando +218% nas menções espontâneas).
- **Alertas de monitoramento:**
  - Cards de alertas demonstrativos: 🔥 Pico de conversa, ⚠️ Aumento de sentimento negativo, 🔥 Novo tema em crescimento, 📈 Conteúdo em destaque.
- **Status das fontes & Integrações:**
  - Indicador visual das conexões: V-Tracker (🟢 Estrutura preparada), Zeeng (🟡 Integração futura), Supabase (🟡 Conexão futura), Última sincronização (14:45).

### Arquitetura & Código:
- Estrutura modular limpa em TypeScript + Tailwind CSS + Lucide Icons + Recharts / Radix UI / Shadcn.
- Separação rigorosa de pastas: `/types`, `/mocks`, `/services`, `/components`, `/pages`.
- Dados mockados realistas, consistentes matematicamente entre si, isolados em arquivos de mock sem valores hardcoded dentro do JSX dos componentes.
- Camada de `/services` preparada com contratos e interfaces TypeScript para conectar ao Supabase futuramente.
- Totalmente responsivo para Desktop, Notebook, Tablet e Mobile.

### Restrições Estritas:
- NÃO utilizar nenhuma API de IA (sem OpenAI, Claude, Gemini ou LLMs).
- NÃO colocar chaves secretas ou tokens no frontend.
- Nenhum dado fictício genérico ("Lorem Ipsum"); todo o conteúdo deve ser temático da 81ª SOEA (Engenharia, Agronomia, Sergipe, Inovação, Sustentabilidade).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://soea2026.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a5f42598-d65e-4a71-9d26-4ca3548ba79c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
