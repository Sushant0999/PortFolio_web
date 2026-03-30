
import { PROFILE } from '../data/portfolio';

export default function Footer() {
    return (
        <footer className="py-8 border-t border-emerald-900/30 bg-slate-900/50 backdrop-blur-sm text-center">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-400 text-sm">
                        <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
                    </div>

                    <div className="flex gap-6">
                        <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                            GitHub
                        </a>
                        <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                            LinkedIn
                        </a>
                        <a href={PROFILE.socials.email.startsWith('mailto:') ? PROFILE.socials.email : `mailto:${PROFILE.socials.email}`} className="text-slate-400 hover:text-emerald-400 transition-colors">
                            Email
                        </a>
                    </div>
                </div>
                <p className="mt-4 text-xs text-slate-600">
                    {/* Built with Next.js 15 & Tailwind CSS v4 */}
                </p>
            </div>
        </footer>
    );
}
