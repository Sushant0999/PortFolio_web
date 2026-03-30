
import { SKILLS } from '../data/portfolio';

export default function Skills() {
    // Group skills by category
    const categories = Array.from(new Set(SKILLS.map(s => s.category)));

    const categoryLabel: Record<string, string> = {
        Language: 'Languages',
        Framework: 'Frameworks & Tools',
        Domain: 'Domains',
        Infrastructure: 'Infrastructure',
    };

    return (
        <section id="skills" className="py-32 px-4 relative">
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                        Technical <span className="text-gradient">Capabilities</span>
                    </h2>
                    <p className="text-slate-400">
                        A comprehensive stack of technologies I use to solve complex problems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {categories.map((category) => (
                        <div key={category} className="glass-panel rounded-3xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold mb-6 text-white border-b border-white/5 pb-4 tracking-tight">
                                {categoryLabel[category] ?? category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {SKILLS.filter(s => s.category === category).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-full bg-sky-500/5 text-sky-400 border border-sky-500/10 text-xs font-bold uppercase tracking-widest hover:bg-sky-500/10 hover:border-sky-500/30 transition-all cursor-default"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
