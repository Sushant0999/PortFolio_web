
import { PROFILE } from '../data/portfolio';

export default function Contact() {
    return (
        <section id="contact" className="py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>

            <div className="max-w-3xl mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to turn ideas into <span className="text-emerald-400">Reality</span>?
                </h2>
                <p className="text-slate-400 mb-8 text-lg">
                    I'm currently available for freelance work and full-time opportunities.
                    Let's discuss how I can contribute to your team.
                </p>

                <a
                    href={PROFILE.socials.email}
                    className="inline-block px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:scale-105 transition-transform shadow-lg shadow-white/10"
                >
                    Say Hello
                </a>

                <footer className="mt-20 pt-8 border-t border-slate-800 text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
                    <p className="mt-2">Built with Next.js, Tailwind CSS & Scilab Magic.</p>
                </footer>
            </div>
        </section>
    );
}
