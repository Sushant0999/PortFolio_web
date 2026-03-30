
import { PROFILE } from '../data/portfolio';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
            {/* Ambient Glow */}
            <div className="glow-mesh" />
            
            {/* Background Texture */}
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>

            <div className="max-w-5xl mx-auto text-center space-y-10 z-10">
                <div className="space-y-4">
                    <span className="px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-sm font-medium tracking-wider uppercase animate-pulse-slow">
                        Software Engineer & Architect
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
                        <span className="block italic opacity-90">Building</span>
                        <span className="text-gradient">Intelligent Systems</span>
                    </h1>
                </div>

                <p className="text-xl md:text-2xl text-slate-300/80 max-w-3xl mx-auto leading-relaxed font-light">
                    {PROFILE.subtext}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pb-12">
                    <PillarCard title="Signals" color="purple" icon="◈" />
                    <PillarCard title="Decisions" color="orange" icon="◈" />
                    <PillarCard title="Systems" color="blue" icon="◈" />
                    <PillarCard title="Trust" color="green" icon="◈" />
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
                    <Link
                        href="/projects"
                        className="px-10 py-4 rounded-full button-primary font-bold text-lg"
                    >
                        Explore Systems
                    </Link>
                    <Link
                        href="/about"
                        className="px-10 py-4 rounded-full border border-slate-700 bg-slate-900/50 text-slate-300 font-semibold hover:bg-slate-800 transition-all hover:scale-105 backdrop-blur-md"
                    >
                        Read My Story
                    </Link>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float opacity-50">
                <div className="w-1 h-12 rounded-full bg-gradient-to-b from-sky-500 to-transparent"></div>
            </div>
        </section>
    );
}

function PillarCard({ title, color, icon }: { title: string; color: string; icon: string }) {
    const colors: { [key: string]: string } = {
        purple: "text-purple-400 border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/5",
        orange: "text-orange-400 border-orange-500/20 hover:border-orange-500/50 hover:bg-orange-500/5",
        blue: "text-blue-400 border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/5",
        green: "text-green-400 border-green-500/20 hover:border-green-500/50 hover:bg-green-500/5",
    };

    return (
        <div className={`p-6 rounded-2xl border glass-card flex flex-col items-center justify-center gap-2 group ${colors[color]}`}>
            <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">{icon}</span>
            <span className="font-mono font-bold tracking-widest uppercase text-xs">{title}</span>
        </div>
    );
}
