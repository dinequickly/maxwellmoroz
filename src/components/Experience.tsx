'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';

interface Job {
  id: string;
  role: string;
  company: string;
  dates: string;
  startDate?: string;
  endDate?: string;
  location: string;
  description: string;
}

const LINKEDIN_URL = 'https://linkedin.com/in/maxwellmoroz';

export default function Experience() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperience() {
      try {
        const response = await fetch('/api/notion/experience');
        const data = await response.json();
        
        if (data.experiences) {
          setJobs(data.experiences);
        }
      } catch (error) {
        console.error('Error fetching experience:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperience();
  }, []);

  if (loading) {
    return (
      <section className="py-24 border-t border-[#262626]">
        <div className="flex items-center gap-3 text-[#737373]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm tracking-wide">Loading experience...</span>
        </div>
      </section>
    );
  }

  if (jobs.length === 0) {
    return null;
  }

  return (
    <section className="py-24 border-t border-[#262626]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Section Label */}
        <div className="lg:col-span-3">
          <span className="text-xs tracking-[0.2em] text-[#737373] uppercase">
            Experience
          </span>
        </div>

        {/* Experience List */}
        <div className="lg:col-span-9">
          <div className="space-y-0">
            {jobs.map((job, index) => (
              <a
                key={job.id}
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-8 border-b border-[#1a1a1a] hover:border-[#333] transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  {/* Role */}
                  <div className="md:col-span-5">
                    <h3 className="text-lg text-[#f5f5f5] group-hover:text-white transition-colors flex items-center gap-2">
                      {job.role}
                      <ArrowUpRight className="w-4 h-4 text-[#333] group-hover:text-[#737373] transition-colors opacity-0 group-hover:opacity-100" />
                    </h3>
                  </div>
                  
                  {/* Company */}
                  <div className="md:col-span-3">
                    <span className="text-[#737373] text-sm group-hover:text-[#a3a3a3] transition-colors">
                      {job.company}
                    </span>
                  </div>
                  
                  {/* Dates & Location */}
                  <div className="md:col-span-4 text-right">
                    <p className="text-[#525252] text-sm">
                      {job.dates}
                    </p>
                    <p className="text-[#404040] text-xs mt-1">
                      {job.location}
                    </p>
                  </div>
                </div>
                
                {job.description && (
                  <p className="mt-4 text-[#525252] text-sm leading-relaxed max-w-2xl group-hover:text-[#737373] transition-colors">
                    {job.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
