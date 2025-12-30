
import { SKILLS } from '../data/portfolio';

export default function Skills() {
    // Group skills by category
    const categories = Array.from(new Set(SKILLS.map(s => s.category)));

    return (
        <section id="skills" className="py-20 px-4 bg-slate-900/30">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Technical <span className="text-emerald-400">Skills</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((category) => (
                        <div key={category} className="glass-panel rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-4 text-slate-200 border-b border-slate-800 pb-2">
                                {category}s
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {SKILLS.filter(s => s.category === category).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium"
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
