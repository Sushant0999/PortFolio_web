import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
            <div className="glass-panel rounded-full px-8 py-3.5 flex items-center gap-10 shadow-2xl">
                <Link href="/" className="font-black text-2xl tracking-tighter hover:scale-110 transition-transform text-white">
                    S<span className="text-sky-500">R</span>
                </Link>
                <div className="flex gap-8 text-sm font-semibold tracking-wide text-slate-300">
                    <Link href="/about" className="hover:text-sky-400 transition-colors uppercase">About</Link>
                    <Link href="/projects" className="hover:text-indigo-400 transition-colors uppercase">Projects</Link>
                    <a href="mailto:contact@sushantraj.com" className="hover:text-purple-400 transition-colors uppercase">Contact</a>
                </div>
            </div>
        </nav>
    );
}
