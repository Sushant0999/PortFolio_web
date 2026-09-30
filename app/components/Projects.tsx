
// ─────────────────────────────────────────────────────────────────────────────
// components/Projects.tsx — Homepage featured projects section
//
// Pulls featured projects dynamically from GitHub + ENRICHMENTS.
// No static data — new enriched repos with featured:true appear automatically.
// ─────────────────────────────────────────────────────────────────────────────

import { getAllRepos, GitHubRepo, humanName } from '../lib/github';
import { ENRICHMENTS, ProjectCategory } from '../data/portfolio';
import ProjectCardClient from './ProjectCardClient';

// Server component — fetches data
export default async function Projects() {
  const repos = await getAllRepos();

  // Only show repos with an enrichment entry where featured = true
  const featured = repos
    .filter(r => ENRICHMENTS[r.name]?.featured === true)
    .slice(0, 6); // cap at 6 cards on homepage

  return (
    <section id="projects" className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A curation of technical systems, algorithms, and applications I&apos;ve designed and built.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map(repo => {
            const e = ENRICHMENTS[repo.name]!;
            return (
              <ProjectCardClient
                key={repo.name}
                id={repo.name}
                title={e.title ?? humanName(repo.name)}
                shortDescription={e.shortDescription ?? repo.description ?? ''}
                tags={repo.topics.length > 0 ? repo.topics.slice(0, 4) : [repo.language ?? 'Code']}
                link={repo.homepage || repo.html_url}
                category={e.category}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
