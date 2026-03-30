
'use client';

import { useState, useEffect, useRef } from 'react';
import { PROFILE } from '../data/portfolio';

type CommandHistory = {
    command: string;
    output: React.ReactNode;
};

export default function Terminal() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandHistory[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const commands: { [key: string]: () => React.ReactNode } = {
        help: () => (
            <div className="text-slate-300 space-y-1">
                <p>Available commands:</p>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-emerald-400">about</span>
                    <span>Display profile information</span>
                    <span className="text-emerald-400">skills</span>
                    <span>List technical skills</span>
                    <span className="text-emerald-400">clear</span>
                    <span>Clear terminal history</span>
                    <span className="text-emerald-400">contact</span>
                    <span>Show contact details</span>
                </div>
            </div>
        ),
        about: () => (
            <div className="text-slate-300">
                <p className="mb-2">Hello! I'm <span className="text-emerald-400 font-bold">{PROFILE.name}</span></p>
                <p>{PROFILE.bio}</p>
            </div>
        ),
        contact: () => (
            <div className="text-slate-300">
                <p>GitHub: <a href={PROFILE.socials.github} target="_blank" className="text-blue-400 hover:underline">{PROFILE.socials.github}</a></p>
                <p>LinkedIn: <a href={PROFILE.socials.linkedin} target="_blank" className="text-blue-400 hover:underline">Connect</a></p>
                <p>Email: <a href={PROFILE.socials.email.startsWith('mailto:') ? PROFILE.socials.email : `mailto:${PROFILE.socials.email}`} className="text-blue-400 hover:underline">Send Email</a></p>
            </div>
        ),
        skills: () => (
            <div className="text-slate-300">
                <p className="text-emerald-400 mb-1">Languages:</p>
                <p>Java, Python, C++, SQL</p>
                <p className="text-emerald-400 mt-2 mb-1">Domains:</p>
                <p>Backend Systems, Machine Learning, Algorithms</p>
            </div>
        ),
    };

    // Initial boot sequence
    useEffect(() => {
        const bootSequence = async () => {
            const addLine = (text: string, delay: number) =>
                new Promise<void>(resolve => setTimeout(() => {
                    setHistory(prev => [...prev, { command: '', output: <span className="text-emerald-500/80">{text}</span> }]);
                    resolve();
                }, delay));

            await addLine('> initializing_portfolio_kernel...', 100);
            await addLine('> loading_modules: [react, next.js, tailwind]', 300);
            await addLine('> accessing_user_data...', 600);
            await addLine('> system_ready.', 800);
            await addLine('> type "help" to view commands.', 1000);
        };
        bootSequence();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if (!cmd) return;

        let output: React.ReactNode;
        if (cmd === 'clear') {
            setHistory([]);
            setInput('');
            return;
        } else if (commands[cmd]) {
            output = commands[cmd]();
        } else {
            output = <span className="text-red-400">Command not found: {cmd}. Type "help" for list.</span>;
        }

        setHistory(prev => [...prev, { command: input, output }]);
        setInput('');
    };

    return (
        <div className="w-full max-w-3xl mx-auto h-[400px] bg-slate-950/90 rounded-xl overflow-hidden border border-slate-800 shadow-2xl shadow-emerald-900/20 font-mono text-sm flex flex-col backdrop-blur-md">
            {/* Terminal Header */}
            <div className="bg-slate-900/50 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="ml-4 text-slate-500 text-xs">user@sushant-portfolio:~</div>
            </div>

            {/* Terminal Content */}
            <div
                className="p-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
                onClick={() => inputRef.current?.focus()}
            >
                <div className="space-y-2">
                    {history.map((entry, i) => (
                        <div key={i}>
                            {entry.command && (
                                <div className="flex gap-2 text-slate-400">
                                    <span className="text-emerald-500">➜</span>
                                    <span className="text-cyan-400">~</span>
                                    <span className="text-slate-100">{entry.command}</span>
                                </div>
                            )}
                            <div className="pl-6">{entry.output}</div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleCommand} className="mt-2 flex gap-2 text-slate-400">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-cyan-400">~</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 text-slate-100 focus:ring-0 p-0"
                        autoFocus
                    />
                </form>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
