
// ─────────────────────────────────────────────────────────────────────────────
// /projects — Fully Dynamic Projects Page
//
// Source of truth: GitHub API (via lib/github.ts)
// No static arrays. New repos auto-appear. Enriched repos get curated cards.
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link';
import { getAllRepos, GitHubRepo, langColor, timeAgo, humanName } from '../lib/github';
import { ENRICHMENTS, ProjectEnrichment, ProjectCategory } from '../data/portfolio';

export const revalidate = 3600;

// ─── Merged project type ──────────────────────────────────────────────────────
interface MergedProject {
  repo: GitHubRepo;
  enrichment: ProjectEnrichment | null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectsPage() {
  const repos = await getAllRepos();

  // Split into enriched (curated) and bare (GitHub-only)
  const enriched: MergedProject[] = [];
  const bare: GitHubRepo[] = [];

  for (const repo of repos) {
    const e = ENRICHMENTS[repo.name] ?? null;
    if (e) enriched.push({ repo, enrichment: e });
    else bare.push(repo);
  }

  const featured = enriched.filter(p => p.enrichment!.featured);
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);

  return (
    <main className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-6xl mx-auto space-y-28">

        {/* ── Hero ── */}
        <header>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-sky-400 mb-4">Selected Work</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Projects &amp; <span className="text-gradient">Systems</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Backend systems, developer tools, and intelligent applications built around correctness, privacy, and reliability.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { dot: 'bg-sky-400',     label: `${enriched.length} Curated Projects` },
              { dot: 'bg-emerald-400', label: `${repos.length} GitHub Repositories` },
              { dot: 'bg-purple-400',  label: `${totalStars} Total Stars` },
            ].map(({ dot, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-400">
                <span className={`w-2 h-2 rounded-full ${dot}`} />
                {label}
              </div>
            ))}
          </div>
        </header>

        {/* ── Featured / Highlighted ── */}
        {featured.length > 0 && (
          <section>
            <SectionLabel>Featured</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Highlighted Systems</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featured.map(({ repo, enrichment }) => (
                <CuratedCard key={repo.name} repo={repo} enrichment={enrichment!} />
              ))}
            </div>
          </section>
        )}

        {/* ── All Curated ── */}
        {enriched.length > 0 && (
          <section>
            <SectionLabel>Curated</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold mb-10">All Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enriched.map(({ repo, enrichment }) => (
                <CuratedCard key={repo.name} repo={repo} enrichment={enrichment!} />
              ))}
            </div>
          </section>
        )}

        {/* ── Full GitHub Feed ── */}
        {repos.length > 0 && (
          <section>
            <SectionLabel live>Auto-Synced from GitHub</SectionLabel>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <h2 className="text-3xl md:text-4xl font-bold">All Repositories</h2>
              <a
                href="https://github.com/Sushant0999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <GitHubIcon />
                View GitHub Profile →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {repos.map(repo => (
                <GitHubCard key={repo.id} repo={repo} enriched={!!ENRICHMENTS[repo.name]} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

// ─── Category styles ──────────────────────────────────────────────────────────
const CAT_BORDER: Record<ProjectCategory, string> = {
  signal:   'border-purple-500/30  hover:border-purple-500/60  text-purple-400',
  decision: 'border-orange-500/30  hover:border-orange-500/60  text-orange-400',
  system:   'border-sky-500/30     hover:border-sky-500/60     text-sky-400',
  trust:    'border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400',
};
const CAT_BG: Record<ProjectCategory, string> = {
  signal: 'bg-purple-500/10', decision: 'bg-orange-500/10',
  system: 'bg-sky-500/10',   trust:    'bg-emerald-500/10',
};

// ─── SectionLabel ─────────────────────────────────────────────────────────────
function SectionLabel({ children, live }: { children: React.ReactNode; live?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      {live ? (
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {children}
        </span>
      ) : (
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400">— {children}</span>
      )}
    </div>
  );
}

// ─── Curated project card (enriched repos) ────────────────────────────────────
function CuratedCard({ repo, enrichment }: { repo: GitHubRepo; enrichment: ProjectEnrichment }) {
  const title = enrichment.title ?? humanName(repo.name);
  const desc  = enrichment.shortDescription ?? repo.description ?? '';
  const tags  = repo.topics.length > 0
    ? repo.topics.slice(0, 5)
    : [repo.language ?? 'Code'];

  return (
    <Link
      href={`/projects/${repo.name}`}
      className={`group block p-7 rounded-2xl bg-card-bg border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${CAT_BORDER[enrichment.category]}`}
    >
      <div className="flex justify-between items-start mb-5">
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${CAT_BG[enrichment.category]} opacity-80`}>
          {enrichment.category}
        </span>
        <div className="flex items-center gap-2">
          {enrichment.featured && (
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white px-2 py-1 rounded">
              Featured
            </span>
          )}
          {(repo.homepage || repo.html_url) && (
            <span className="text-slate-600 group-hover:text-current transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-current transition-colors leading-snug">
        {title}
      </h3>

      <p className="text-slate-400 mb-6 leading-relaxed text-sm line-clamp-3">{desc}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-400 px-2 py-1 rounded border border-white/5">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-[11px] text-current opacity-0 group-hover:opacity-50 transition-opacity mt-5 font-mono">
        View case study →
      </p>
    </Link>
  );
}

// ─── GitHub repo card (all repos) ─────────────────────────────────────────────
function GitHubCard({ repo, enriched }: { repo: GitHubRepo; enriched: boolean }) {
  const color = langColor(repo.language);
  const dest  = repo.homepage || repo.html_url;

  return (
    <a
      href={enriched ? `/projects/${repo.name}` : dest}
      target={enriched ? undefined : '_blank'}
      rel={enriched ? undefined : 'noopener noreferrer'}
      className="group flex flex-col p-6 rounded-2xl bg-card-bg border border-white/8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <span className="text-xs text-slate-500 font-mono">{repo.language ?? 'Repository'}</span>
        </div>
        <div className="flex items-center gap-2">
          {enriched && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              curated
            </span>
          )}
          <span className="text-[10px] text-slate-600 font-mono">{timeAgo(repo.updated_at)}</span>
        </div>
      </div>

      <h3 className="text-base font-bold text-white mb-2 group-hover:text-sky-400 transition-colors leading-snug">
        {humanName(repo.name)}
      </h3>

      <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
        {repo.description ?? 'No description provided.'}
      </p>

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 4).map(t => (
            <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400/70 border border-sky-500/10">
              {t}
            </span>
          ))}
          {repo.topics.length > 4 && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-500">
              +{repo.topics.length - 4}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>⭐ {repo.stargazers_count}</span>
          <span>🍴 {repo.forks_count}</span>
        </div>
        <span className="text-[10px] font-mono text-sky-500/60 group-hover:text-sky-400 transition-colors">
          {enriched ? 'Case study →' : repo.homepage ? 'Live →' : 'GitHub →'}
        </span>
      </div>
    </a>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
