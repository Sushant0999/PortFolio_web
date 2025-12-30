
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
            <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-8 shadow-lg shadow-emerald-500/5">
                <Link href="/" className="font-bold text-xl tracking-tight hover:text-emerald-400 transition-colors">
                    SR
                </Link>
                <div className="flex gap-6 text-sm font-medium text-slate-300">
                    <Link href="#about" className="hover:text-white transition-colors">About</Link>
                    <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
                    <Link href="#skills" className="hover:text-white transition-colors">Skills</Link>
                    <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
                </div>
            </div>
        </nav>
    );
}
