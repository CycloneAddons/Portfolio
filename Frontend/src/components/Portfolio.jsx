import Nav from "./portfolio/Nav";
import Background from "./portfolio/Background";
import Hero from "./portfolio/Hero";
import About from "./portfolio/About";
import Skills from "./portfolio/Skills";
import Projects from "./portfolio/Projects";
import Experience from "./portfolio/Experience";
import Stats from "./portfolio/Stats";
import GitHubSection from "./portfolio/GitHubSection";
import Contact from "./portfolio/Contact";
import Footer from "./portfolio/Footer";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen isolate">
      <Background />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Stats />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
