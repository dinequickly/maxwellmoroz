'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  year: string;
  githubUrl: string;
  liveUrl: string;
  tags: string[];
  image: string | null;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/notion/projects');
        const data = await response.json();
        
        if (data.projects) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-24 border-t border-[#262626]">
        <div className="flex items-center gap-3 text-[#737373]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm tracking-wide">Loading projects...</span>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 border-t border-[#262626]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Section Label */}
        <div className="lg:col-span-3">
          <span className="text-xs tracking-[0.2em] text-[#737373] uppercase">
            Projects
          </span>
        </div>

        {/* Projects Grid */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.liveUrl || project.githubUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {/* Project Card */}
                <div className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#333] transition-colors p-8 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[#404040] text-xs tracking-wider">
                      {project.year}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#333] group-hover:text-[#737373] transition-colors" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-2xl text-[#e5e5e5] mb-3 group-hover:text-white transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-[#737373] text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs text-[#404040] bg-[#141414] px-2 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Links hint */}
                  <div className="mt-8 pt-6 border-t border-[#1a1a1a] flex gap-6">
                    {project.githubUrl && (
                      <span className="text-xs text-[#404040] group-hover:text-[#525252] transition-colors tracking-wide uppercase">
                        GitHub →
                      </span>
                    )}
                    {project.liveUrl && (
                      <span className="text-xs text-[#404040] group-hover:text-[#525252] transition-colors tracking-wide uppercase">
                        Live Demo →
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
