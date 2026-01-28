'use client';

import { useEffect, useState } from 'react';
import { Tweet } from 'react-tweet';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface TweetData {
  id: string;
  content: string;
  tweetUrl: string | null;
  tweetId: string;
  date: string;
  featured: boolean;
  order: number;
}

interface TweetsProps {
  featuredOnly?: boolean;
  limit?: number;
  showViewAll?: boolean;
}

export default function Tweets({ featuredOnly = false, limit = 3, showViewAll = true }: TweetsProps) {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [failedTweets, setFailedTweets] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchTweets() {
      try {
        const url = `/api/notion/tweets?${featuredOnly ? 'featured=true&' : ''}limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.tweets) {
          setTweets(data.tweets);
        }
      } catch (error) {
        console.error('Error fetching tweets:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTweets();
  }, [featuredOnly, limit]);

  const handleTweetError = (tweetId: string) => {
    setFailedTweets(prev => new Set(prev).add(tweetId));
  };

  if (loading) {
    return (
      <section className="py-24 border-t border-[#262626]">
        <div className="flex items-center gap-3 text-[#737373]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm tracking-wide">Loading tweets...</span>
        </div>
      </section>
    );
  }

  if (tweets.length === 0) {
    return null;
  }

  return (
    <section className="py-24 border-t border-[#262626]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Section Label */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between lg:block">
            <span className="text-xs tracking-[0.2em] text-[#737373] uppercase">
              Tweets
            </span>
            {showViewAll && (
              <Link 
                href="/tweets"
                className="lg:mt-4 text-xs text-[#525252] hover:text-[#a3a3a3] transition-colors uppercase tracking-wider"
              >
                View all →
              </Link>
            )}
          </div>
        </div>

        {/* Tweets Grid */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tweets.map((tweet) => (
              <div key={tweet.id} className="bg-[#0f0f0f] border border-[#1a1a1a] overflow-hidden">
                {tweet.tweetId && !failedTweets.has(tweet.tweetId) ? (
                  <div className="[&_.react-tweet-theme]:!bg-transparent [&_.react-tweet-theme]:!border-none">
                    <Tweet 
                      id={tweet.tweetId} 
                      onError={() => handleTweetError(tweet.tweetId)}
                    />
                  </div>
                ) : (
                  <a 
                    href={tweet.tweetUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 hover:bg-[#141414] transition-colors"
                  >
                    <p className="text-[#a3a3a3] text-sm leading-relaxed mb-4 line-clamp-4">
                      {tweet.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#525252]">{tweet.date}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#404040]" />
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
