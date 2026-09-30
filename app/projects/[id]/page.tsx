
// ─────────────────────────────────────────────────────────────────────────────
// /projects/[id] — Dynamic Project Detail Page
//
// [id] = GitHub repo name.
// Data comes from the GitHub API + optional enrichment from portfolio.ts.
// Works for any repo — enriched repos show the full case-study; others show
// a clean GitHub overview.
// ─────────────────────────────────────────────────────────────────────────────

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRepo, getAllRepos, GitHubRepo, langColor, timeAgo, humanName } from '../../lib/github';
import { ENRICHMENTS, ProjectCategory } from '../../data/portfolio';

export const revalidate = 3600;

// Pre-generate static paths for all enriched repos at build time
export async function generateStaticParams() {
  const repos = await getAllRepos();
  return repos.map(r => ({ id: r.name }));
}

type Props = { params: Promise<{ id: string }> };

export default async function ProjectDetail({ params }: Props) {
  const { id } = await params;
  const [repo, enrichment] = await Promise.all([
    getRepo(id),
    Promise.resolve(ENRICHMENTS[id] ?? null),
  ]);

  if (!repo) notFound();

  const title = enrichment?.title ?? humanName(repo.name);
  const desc  = enrichment?.shortDescription ?? repo.description ?? '';
  const color = langColor(repo.language);

  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {/* Language dot */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm font-mono text-slate-400">{repo.language ?? 'Repository'}</span>
            </div>

            {/* Category badge (if enriched) */}
            {enrichment && (
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${getCategoryStyle(enrichment.category)}`}>
                {enrichment.category} layer
              </span>
            )}

            {enrichment?.featured && (
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white px-2 py-1 rounded">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-5 leading-tight">
            {title}
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">{desc}</p>

          {/* GitHub stats row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">⭐ {repo.stargazers_count} stars</span>
            <span className="flex items-center gap-1.5">🍴 {repo.forks_count} forks</span>
            <span className="flex items-center gap-1.5">🕒 Updated {timeAgo(repo.updated_at)}</span>
            {repo.open_issues_count > 0 && (
              <span className="flex items-center gap-1.5">🐛 {repo.open_issues_count} open issues</span>
            )}
          </div>

          {/* Topics */}
          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {repo.topics.map(t => (
                <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  {t}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* ── Case Study (enriched repos only) ── */}
        {enrichment?.details && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <DetailCard title="Signal" content={enrichment.details.signal}    color="text-purple-400"  bg="bg-purple-500/5  border-purple-500/10" />
              <DetailCard title="Decision" content={enrichment.details.decision} color="text-orange-400" bg="bg-orange-500/5  border-orange-500/10" />
              <DetailCard title="System" content={enrichment.details.system}    color="text-sky-400"    bg="bg-sky-500/5    border-sky-500/10" />
              <DetailCard title="Trust" content={enrichment.details.trust}     color="text-emerald-400" bg="bg-emerald-500/5 border-emerald-500/10" />
            </div>

            <div className="bg-card-bg border border-white/5 rounded-2xl p-8 mb-12">
              <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-4">
                Engineering Challenges
              </h3>
              <p className="text-slate-200 leading-relaxed text-lg">
                {enrichment.details.challenges}
              </p>
            </div>
          </>
        )}

        {/* ── Actions ── */}
        <div className="flex flex-wrap gap-4">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-white font-bold rounded-xl hover:border-white/30 hover:bg-white/5 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Live Site
            </a>
          )}
        </div>

      </div>
    </main>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function DetailCard({ title, content, color, bg }: { title: string; content: string; color: string; bg: string }) {
  return (
    <div className={`rounded-2xl border p-6 ${bg}`}>
      <h3 className={`font-mono text-xs uppercase tracking-widest font-bold mb-3 ${color}`}>{title}</h3>
      <p className="text-slate-300 leading-relaxed text-sm">{content}</p>
    </div>
  );
}

function getCategoryStyle(category: ProjectCategory): string {
  switch (category) {
    case 'signal':   return 'bg-purple-500/10  text-purple-400  border-purple-500/20';
    case 'decision': return 'bg-orange-500/10  text-orange-400  border-orange-500/20';
    case 'system':   return 'bg-sky-500/10     text-sky-400     border-sky-500/20';
    case 'trust':    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    default:         return 'bg-slate-500/10   text-slate-400   border-slate-500/20';
  }
}
