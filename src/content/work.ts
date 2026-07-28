// Experience + projects snapshot.

export interface Experience {
  role: string;
  company: string;
  dates: string;
  location: string;
  description: string;
  url?: string;
}

export const experience: Experience[] = [
  {
    role: 'AI & Automation Lead',
    company: 'Good Peeps',
    dates: 'May 2026 — Present',
    location: 'Los Angeles',
    description: '',
  },
  {
    role: 'Senior AI Associate',
    company: 'Pressed Juicery',
    dates: 'Jun 2025 — Jul 2026',
    location: 'Los Angeles / London',
    description:
      'Lead AI integration strategy across a fast-growth wholesale, retail, and digital wellness brand. Collaborate with Finance, the Executive team, Legal, Marketing, HR, Tech, and Guest Services. Supervise a team of seven interns advising on Gen Z marketing trends.',
  },
  {
    role: 'Venture Capital Fund Researcher',
    company: 'Edenbase — Venture Capital',
    dates: 'Sep 2025 — Apr 2026',
    location: 'London',
    description:
      'Researching quantum computing startups — analyzing technology, business models, and market fit across multiple technology stacks to support smarter investment decisions.',
  },
  {
    role: 'Director of Innovation & Experience',
    company: 'RVIVL',
    dates: 'Oct 2023 — Aug 2025',
    location: 'Los Angeles',
    description: '',
  },
];

export interface Project {
  name: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  paperUrl?: string;
}

export const projects: Project[] = [
  {
    name: 'Continual Learning w/ DPO & RLHF',
    description:
      'A self-improving agent stack: online SDPO feedback learning (deny / revise / ideal response), LoRA supervised training from example JSONL, DPO training from preference-pair JSONL — with CLI + web GUI interfaces.',
    githubUrl: 'https://github.com/dinequickly/continuallearning',
  },
  {
    name: 'Veritas — Interview Pro',
    description:
      'A professional interview-practice platform with AI/ML-powered feedback. Chat with audio & video models live; a deeply customized agentic system combined with an ML system for nuanced feedback.',
    liveUrl: 'https://geminihackathon-nu.vercel.app',
  },
  {
    name: 'Image Ad Variant Pipeline',
    description:
      'Automatically generates and reviews product-placement variations in images. Uses SAM3 to detect and mask objects (e.g. drink cans), sends the original image + mask + brand reference to an image-editing model, then scores generated variants for quality.',
    githubUrl: 'https://github.com/dinequickly/adembeddings',
    liveUrl: 'https://adembeddings.vercel.app/feed',
    paperUrl: '/adpipelinepaper.pdf',
  },
  {
    name: 'Json-Render Skill',
    description:
      'An agentic skill using the Vercel AI SDK for JSON rendering — return JSON from tool calls and map outputs to React components; render tool outputs on the client or stream UI from the server with RSC.',
    githubUrl: 'https://github.com/dinequickly/json-renderskill',
  },
];
