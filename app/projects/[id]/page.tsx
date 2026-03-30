
import { PROJECTS } from '../../data/portfolio';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Correctly typing params for Next.js 15+ dynamic routes
type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProjectDetail({ params }: Props) {
    const { id } = await params;
    const project = PROJECTS.find(p => p.id === id);

    if (!project) notFound();
    const p = project!;

    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/projects" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                    ← Back to Projects
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border ${getCategoryColor(p.category)}`}>
                            {p.category} Layer
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{p.title}</h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                        {p.shortDescription}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <DetailSection title="Signal" content={p.details.signal} color="text-purple-400" />
                    <DetailSection title="Decision" content={p.details.decision} color="text-orange-400" />
                    <DetailSection title="System" content={p.details.system} color="text-blue-400" />
                    <DetailSection title="Trust" content={p.details.trust} color="text-green-400" />
                </div>

                <div className="bg-card-bg border border-white/5 rounded-2xl p-8 mb-12">
                    <h3 className="text-xl font-bold mb-4">Engineering Challenges</h3>
                    <p className="text-slate-300 leading-relaxed">
                        {p.details.challenges}
                    </p>
                </div>

                <div className="flex gap-4">
                    {p.link && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors">
                            View Source
                        </a>
                    )}
                </div>
            </div>
        </main>
    );
}

function DetailSection({ title, content, color }: { title: string; content: string; color: string }) {
    return (
        <div className="space-y-3">
            <h3 className={`font-mono text-sm uppercase tracking-wider font-bold ${color}`}>
                {title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
                {content}
            </p>
        </div>
    );
}

function getCategoryColor(category: string) {
    switch (category) {
        case 'signal': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
        case 'decision': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
        case 'system': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        case 'trust': return 'bg-green-500/10 text-green-400 border-green-500/20';
        default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
}
