import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import Writing from '@/components/sections/Writing';
import Work from '@/components/sections/Work';
import Projects from '@/components/sections/Projects';
import Reading from '@/components/sections/Reading';
import Posts from '@/components/sections/Posts';
import Newsletter from '@/components/sections/Newsletter';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Writing />
        <Work />
        <Projects />
        <Reading />
        <Posts />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
