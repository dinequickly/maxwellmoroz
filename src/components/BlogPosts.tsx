'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  tags: string[];
  slug: string;
}

// Truncate text to ~150 words
function truncateToWords(text: string, wordCount: number = 150): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(' ') + '...';
}

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/notion/blog');
        const data = await response.json();
        
        if (data.posts) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 border-t border-[#262626]">
        <div className="flex items-center gap-3 text-[#737373]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm tracking-wide">Loading blogs...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 border-t border-[#262626]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Section Label */}
        <div className="lg:col-span-3">
          <span className="text-xs tracking-[0.2em] text-[#737373] uppercase">
            Blogs
          </span>
        </div>

        {/* Content */}
        <div className="lg:col-span-9">
          <div className="space-y-0">
            {posts.length === 0 ? (
              <p className="text-[#525252] text-sm">No published blogs yet.</p>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group block py-8 border-b border-[#1a1a1a] hover:border-[#333] transition-colors"
                >
                  <div className="flex justify-between items-start gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs text-[#404040]">{post.date}</span>
                        {post.tags.map((tag, i) => (
                          <span key={i} className="text-xs text-[#333]">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-xl text-[#e5e5e5] group-hover:text-white transition-colors mb-3">
                        {post.title}
                      </h3>
                      <p className="text-[#525252] text-sm leading-relaxed">
                        {truncateToWords(post.excerpt, 150)}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#262626] group-hover:text-[#525252] transition-colors flex-shrink-0 mt-1" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
