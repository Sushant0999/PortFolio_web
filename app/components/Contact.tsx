import { PROFILE } from '../data/portfolio';

export default function Contact() {
    return (
        <section id="contact" className="py-40 px-4 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
            <div className="glow-mesh opacity-50" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
                    Ready to build <br />
                    <span className="text-gradient">The Future</span> together?
                </h2>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
                    I'm currently looking for new opportunities and collaborations. 
                    Whether you have a question or just want to say hi, my inbox is always open!
                </p>

                <a
                    href={PROFILE.socials.email.startsWith('mailto:') ? PROFILE.socials.email : `mailto:${PROFILE.socials.email}`}
                    className="inline-block px-12 py-5 rounded-full button-primary font-bold text-xl tracking-tight"
                >
                    Get In Touch
                </a>
            </div>
        </section>
    );
}
