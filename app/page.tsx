import Hero from './components/Hero';
import TechUniverse from './components/TechUniverse';
import SystemFlow from './components/SystemFlow';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <TechUniverse />
      <SystemFlow />
      <Footer />
    </main>
  );
}
