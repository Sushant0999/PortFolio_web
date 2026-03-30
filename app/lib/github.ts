export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  homepage: string | null;
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

// Repos to hide from display
const EXCLUDED_NAMES = ['Sushant0999', 'portfolio', 'MLOPS_Training', 'Win11Debloat', 'Linux-Universal-App-Installer', 'bash_scripts'];
const JUNK_DESCRIPTIONS = ['TTTT', 'test', 'dummy'];

// Keywords that map a repo to a tech bubble
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

// Feature labels extracted from topics
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
  return repos.filter(r =>
    !r.fork &&
    r.description !== null &&
    r.description.trim().length > 10 &&
    !EXCLUDED_NAMES.includes(r.name) &&
    !JUNK_DESCRIPTIONS.some(j => r.description!.toLowerCase().startsWith(j))
  );
}

export function repoToMapped(repo: GitHubRepo): MappedRepo {
  const features = FEATURE_MAP
    .filter(([topic]) => repo.topics.includes(topic))
    .map(([, label]) => label);

  // Deduplicate
  const unique = [...new Set(features)].slice(0, 3);
  if (unique.length === 0 && repo.language) unique.push(repo.language);

  return {
    name: repo.name,
    displayName: repo.name.replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    description: repo.description!,
    url: repo.html_url,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    language: repo.language,
    features: unique,
  };
}

export function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / 86400000);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}
