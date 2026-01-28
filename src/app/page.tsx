import { Suspense } from 'react';
import Header from '@/components/Header';
import ReadingAndQuote from '@/components/ReadingAndQuote';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import BlogPosts from '@/components/BlogPosts';
import Tweets from '@/components/Tweets';
import { notion, DATABASE_IDS, extractText, extractUrl } from '@/lib/notion';

async function getSiteSettings() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.siteSettings,
      filter: {
        property: 'Title',
        title: {
          equals: 'Main',
        },
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0] as any;
    const properties = page.properties;

    return {
      title: extractText(properties['Site Title']?.rich_text) || 'Maxwell Moroz',
      description: extractText(properties.Description?.rich_text) || '',
      tagline: extractText(properties.Tagline?.rich_text) || 
               'Updates on me',
      photo: extractUrl(properties.Photo) || null,
      email: extractUrl(properties.Email) || null,
      github: extractUrl(properties.GitHub) || 'https://github.com/dinequickly',
      linkedin: extractUrl(properties.LinkedIn) || 
                extractUrl(properties.LinkedInURL) || null,
      twitter: extractUrl(properties.Twitter) || 
               extractUrl(properties.TwitterURL) || null,
    };
  } catch (error) {
    console.log('Site Settings not accessible, using defaults');
    return null;
  }
}

export default async function Home() {
  const settings = await getSiteSettings();

  const siteTitle = settings?.title || 'Maxwell Moroz';
  const tagline = settings?.tagline || 'Updates on me';
  const githubUrl = settings?.github || 'https://github.com/dinequickly';

  return (
    <>
      {/* Fixed Header */}
      <Header siteTitle={siteTitle} />

      <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] pt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header Section with Photo */}
          <header className="py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7">
                <h1 className="font-display text-display text-[#f5f5f5] leading-[0.9]">
                  {siteTitle}
                </h1>
                <p className="text-[#737373] mt-4" style={{ fontSize: '20px' }}>
                  {tagline}
                </p>
              </div>
              <div className="lg:col-span-5 flex justify-end lg:justify-start lg:pl-24 lg:pt-32">
                <img
                  src="https://i.postimg.cc/h4b0vR1L/104504331-4k0cg90anb.jpg"
                  alt="Profile"
                  width={250}
                  height={200}
                  className="object-cover grayscale"
                />
              </div>
            </div>
          </header>

          {/* Experience Section */}
          <div id="experience">
            <Suspense fallback={<div className="py-24 text-[#737373]">Loading...</div>}>
              <Experience />
            </Suspense>
          </div>

          {/* Blog Posts Section */}
          <div id="blogs">
            <Suspense fallback={<div className="py-24 text-[#737373]">Loading...</div>}>
              <BlogPosts />
            </Suspense>
          </div>

          {/* Projects Section */}
          <div id="projects">
            <Suspense fallback={<div className="py-24 text-[#737373]">Loading...</div>}>
              <Projects />
            </Suspense>
          </div>

          {/* Reading & Quote Section */}
          <div id="reading">
            <Suspense fallback={<div className="py-24 text-[#737373]">Loading...</div>}>
              <ReadingAndQuote />
            </Suspense>
          </div>

          {/* Tweets Section */}
          <div id="tweets">
            <Suspense fallback={<div className="py-24 text-[#737373]">Loading...</div>}>
              <Tweets featuredOnly={true} limit={3} showViewAll={true} />
            </Suspense>
          </div>

          {/* Footer */}
          <footer className="py-24 border-t border-[#262626]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <span className="text-xs tracking-[0.2em] text-[#333] uppercase">
                  End
                </span>
              </div>
              <div className="lg:col-span-9 flex justify-between items-end">
                <p className="text-[#404040] text-sm">
                  © {new Date().getFullYear()} — Built with intention
                </p>
                <div className="flex gap-6">
                  <a 
                    href={githubUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-[#404040] hover:text-[#737373] transition-colors uppercase tracking-wider"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </main>
    </>
  );
}
