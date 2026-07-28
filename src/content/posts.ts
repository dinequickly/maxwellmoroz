export type Category = 'AI' | 'Tech' | 'Innovation' | 'Personal' | 'Paper' | 'Paper-Econ';

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  category: Category;
  readingTime: number; // minutes
  featured: boolean;
  order: number;
  /** 'article' renders a reading page; 'paper' links straight to a PDF. */
  type: 'article' | 'paper';
  /** Markdown body file under content/posts (articles only). */
  bodyFile?: string;
  /** Destination for paper-type posts. */
  pdfUrl?: string;
}

// Snapshot of the published Blog database (Status = Published, Show = ✓), ordered by Order.
export const posts: Post[] = [
  {
    slug: 'why-rl-eats-white-collar',
    title:
      'Why Reinforcement Learning Will Eat White-Collar Work & Frontier Labs Are the ONLY Ones at the Table',
    excerpt:
      "With Dario's 50% estimate of white-collar job loss by 2027 in mind, things start to get real. The TAM of all white-collar salaries is so astronomically high that the CapEx to automate it is completely justified — and once a frontier lab locks in a company like Goldman Sachs, model feedback, data and results form an increasingly relevant moat.",
    date: '2026-04-02',
    category: 'AI',
    readingTime: 6,
    featured: true,
    order: 1,
    type: 'article',
    bodyFile: 'why-rl-eats-white-collar.md',
  },
  {
    slug: 'elon-xai-macrohard',
    title: 'Elon Musk, xAI, SpaceX, Macrohard & Tesla',
    excerpt:
      "xAI's strategy: prioritizing latency, scale, and real-world deployment over polished abstractions, even if that means letting competitors lead on narrow benchmarks like coding. If Macrohard is real, it reflects a belief that brute-force computer use plus massive compute can outpace carefully scaffolded systems.",
    date: '2026-01-25',
    category: 'Tech',
    readingTime: 8,
    featured: false,
    order: 2,
    type: 'article',
    bodyFile: 'elon-xai-macrohard.md',
  },
  {
    slug: 'meta-ai-growth',
    title: 'Meta AI Growth Opportunity',
    excerpt:
      "Notes from Meta's earnings call and where Meta goes next — GEM, Reality Labs, the Neural Band, Genie 3, and a thesis on the future of advertising and content consumption.",
    date: '2026-01-30',
    category: 'Tech',
    readingTime: 10,
    featured: false,
    order: 3,
    type: 'article',
    bodyFile: 'meta-ai-growth.md',
  },
  {
    slug: 'ai-regulation-paper',
    title:
      'Against Broad Ex Ante AI Regulation: Dynamic Governance, Innovation, and Geopolitical Competition',
    excerpt:
      'A paper arguing against broad, pre-emptive AI regulation in favor of dynamic governance — weighing innovation and geopolitical competition. Written with OpenAI’s Prism tooling for the LaTeX; all ideas are my own.',
    date: '2026-01-28',
    category: 'Paper-Econ',
    readingTime: 0,
    featured: true,
    order: 4,
    type: 'paper',
    pdfUrl: '/papers/main-4.pdf',
  },
];

export const sortedPosts = [...posts].sort((a, b) => a.order - b.order);

export const articles = sortedPosts.filter((p) => p.type === 'article');

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
