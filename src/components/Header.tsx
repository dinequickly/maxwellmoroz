'use client';

import { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Copy, Check } from 'lucide-react';

const EMAIL = 'maxwellmoroz10@gmail.com';
const LINKEDIN_URL = 'https://linkedin.com/in/maxwellmoroz';
const TWITTER_URL = 'https://x.com/maxwellsmoroz';
const GITHUB_URL = 'https://github.com/dinequickly';

interface HeaderProps {
  siteTitle?: string;
}

export default function Header({ siteTitle = 'Maxwell Moroz' }: HeaderProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <a href="/" className="text-[#f5f5f5] font-display text-lg hover:text-[#a3a3a3] transition-colors">
            {siteTitle}
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors uppercase tracking-wider"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('blogs')}
              className="text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors uppercase tracking-wider"
            >
              Blogs
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors uppercase tracking-wider"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('reading')}
              className="text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors uppercase tracking-wider"
            >
              Reading
            </button>
            <button 
              onClick={() => scrollToSection('tweets')}
              className="text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors uppercase tracking-wider"
            >
              Tweets
            </button>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {/* Email */}
            <button
              onClick={copyEmail}
              className="text-[#525252] hover:text-[#a3a3a3] transition-colors relative"
              title={EMAIL}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
              {copied && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-green-500 whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>

            {/* GitHub */}
            <a 
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#525252] hover:text-[#a3a3a3] transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a 
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#525252] hover:text-[#a3a3a3] transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Twitter/X */}
            <a 
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#525252] hover:text-[#a3a3a3] transition-colors"
              title="X/Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
