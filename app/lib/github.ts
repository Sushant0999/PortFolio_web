
// ─────────────────────────────────────────────────────────────────────────────
// lib/github.ts — GitHub as Single Source of Truth
// Every public repo pushed to Sushant0999 auto-appears on the portfolio.
// No manual data entry needed for new projects.
// ─────────────────────────────────────────────────────────────────────────────

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  updated_at: string;
  created_at: string;
  open_issues_count: number;
  size: number;
  license: { name: string } | null;
  default_branch: string;
}

export interface MappedRepo {
  name: string;
  displayName: string;
  description: string;
  url: string;
  stars: number;
  updatedAt: string;
  language: string | null;
  features: string[];
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

const GITHUB_USER = 'Sushant0999';
const EXCLUDED_NAMES = new Set(['PortFolio_web', 'Sushant0999', 'portfolio']);

/** Fetch all public non-forked repos, sorted by stars then recency. */
export async function getAllRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&direction=desc`,
      {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const raw: GitHubRepo[] = await res.json();
    return raw
      .filter(r => !r.fork && !r.archived && !EXCLUDED_NAMES.has(r.name))
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
  } catch {
    return [];
  }
}

/** Fetch a single repo by name. */
export async function getRepo(name: string): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${name}`,
      {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Display helpers ──────────────────────────────────────────────────────────

export const LANG_COLORS: Record<string, string> = {
  Java: '#f89820', TypeScript: '#3178c6', JavaScript: '#f7df1e',
  Python: '#3776ab', Go: '#00add8', Dart: '#0175c2',
  HTML: '#e34c26', CSS: '#563d7c', Kotlin: '#7f52ff',
  'C++': '#f34b7d', C: '#555555', Shell: '#89e051', Rust: '#dea584',
  Scala: '#dc322f', Ruby: '#701516', Swift: '#fa7343',
};

export function langColor(lang: string | null): string {
  return lang ? (LANG_COLORS[lang] ?? '#94a3b8') : '#94a3b8';
}

export function timeAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function humanName(name: string): string {
  return name
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// ─── Legacy helpers (used by TechUniverse, SystemFlow, etc.) ─────────────────

export const TECH_KEYWORDS: Record<string, string[]> = {
  'spring-boot': ['spring', 'springboot', 'spring-boot', 'spring_boot', 'spring-mvc', 'springboot3', 'spring-eureka', 'spring-cloud', 'spring-security'],
  'kafka':       ['kafka'],
  'redis':       ['redis', 'redis-cache'],
  'postgresql':  ['postgre', 'postgresql', 'postgres'],
  'react':       ['react', 'reactjs', 'react-router'],
  'docker':      ['docker', 'microservices', 'eureka', 'feign-client'],
  'flutter':     ['flutter', 'dart', 'flutter-firebase', 'flutter-examples', 'flutter-firestore'],
  'java':        ['java', 'java-17', 'java17', 'java-8', 'java-design-patterns', 'cli-app', 'logback'],
  'nextjs':      ['nextjs', 'next.js', 'next'],
  'typescript':  ['typescript', 'ts'],
  'python':      ['python', 'django', 'flask', 'fastapi', 'mlops', 'machine-learning', 'pandas', 'numpy'],
  'sql':         ['sql', 'mysql', 'sqlite', 'database', 'rdbms'],
};

const FEATURE_MAP: [string, string][] = [
  ['kafka',             'Async messaging'],
  ['redis',             'Redis caching'],
  ['redis-cache',       'Redis caching'],
  ['microservices',     'Microservices'],
  ['grpc',              'gRPC transport'],
  ['spring-security',   'Spring Security'],
  ['sso-authentication','OAuth / SSO'],
  ['rest-api',          'REST API'],
  ['docker',            'Containerized'],
  ['spring-eureka',     'Service discovery'],
  ['feign-client',      'Feign client'],
  ['flutter-firebase',  'Firebase'],
  ['stream-api',        'Java Stream API'],
  ['java-8',            'Java 8 features'],
];

export function mapRepoToTechs(repo: GitHubRepo): string[] {
  const hay = `${repo.name} ${repo.description ?? ''} ${repo.topics.join(' ')}`.toLowerCase();
  return Object.entries(TECH_KEYWORDS)
    .filter(([, keywords]) => keywords.some(k => hay.includes(k)))
    .map(([tech]) => tech);
}

export function filterRepos(repos: GitHubRepo[]): GitHubRepo[] {
  const JUNK = ['TTTT', 'test', 'dummy'];
  return repos.filter(r =>
    !r.fork &&
    r.description !== null &&
    r.description.trim().length > 10 &&
    !EXCLUDED_NAMES.has(r.name) &&
    !JUNK.some(j => r.description!.toLowerCase().startsWith(j))
  );
}

export function repoToMapped(repo: GitHubRepo): MappedRepo {
  const features = FEATURE_MAP
    .filter(([topic]) => repo.topics.includes(topic))
    .map(([, label]) => label);
  const unique = [...new Set(features)].slice(0, 3);
  if (unique.length === 0 && repo.language) unique.push(repo.language);
  return {
    name: repo.name,
    displayName: humanName(repo.name),
    description: repo.description ?? '',
    url: repo.html_url,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    language: repo.language,
    features: unique,
  };
}
