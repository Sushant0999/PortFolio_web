
import { PROFILE } from '../data/portfolio';

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto space-y-12">
                <header>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-blue-500">System</span> Thinker.
                        <br />
                        <span className="text-orange-500">Decision</span> Maker.
                    </h1>
                </header>

                <article className="prose prose-invert prose-lg text-slate-300 leading-relaxed space-y-8">
                    <p className="text-xl font-bold text-slate-200">
                        Backend Engineer | System Thinker | Decision Maker
                    </p>
                    <p>
                        I build resilient backend architectures using <strong>Java, Spring Boot, and Machine Learning</strong> that thrive in an unpredictable world. I view engineering through a simple framework: <strong>Systems, Signals, and Decisions.</strong>
                    </p>
                    <ul className="space-y-4">
                        <li>
                            <strong className="text-white">Embracing Reality:</strong> Networks fail and data is noisy. I architect event-driven systems that acknowledge these constraints rather than wishing them away.
                        </li>
                        <li>
                            <strong className="text-white">Handling Signals:</strong> Whether parsing webhooks, sensor data, or user clicks, I build the logic layers that sanitize messy, delayed, or duplicated inputs.
                        </li>
                        <li>
                            <strong className="text-white">Executing Decisions:</strong> I ensure that the final downstream actions—charging a card, granting access, or sending an alert—are mathematically correct, secure, and reliable.
                        </li>
                    </ul>
                </article>
            </div>
        </main>
    );
}
