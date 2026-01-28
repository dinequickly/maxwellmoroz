'use client';

import { useEffect, useState } from 'react';
import { Tweet } from 'react-tweet';
import { ArrowLeft, ArrowUpRight, Loader2 } from 'lucide-react';
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

export default function TweetsPage() {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [failedTweets, setFailedTweets] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchTweets() {
      try {
        const response = await fetch('/api/notion/tweets');
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
  }, []);

  const handleTweetError = (tweetId: string) => {
    setFailedTweets(prev => new Set(prev).add(tweetId));
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[#525252] hover:text-[#a3a3a3] transition-colors text-sm mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        {/* Header */}
        <header className="mb-16">
          <h1 className="font-display text-4xl sm:text-5xl text-[#f5f5f5] mb-4">
            Tweets
          </h1>
          <p className="text-[#737373] text-sm max-w-md">
            A collection of thoughts, insights, and observations shared on X/Twitter.
          </p>
        </header>

        {/* Tweets Grid */}
        {loading ? (
          <div className="flex items-center gap-3 text-[#737373]">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm tracking-wide">Loading tweets...</span>
          </div>
        ) : tweets.length === 0 ? (
          <p className="text-[#525252] text-sm">No tweets found.</p>
        ) : (
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
                    <p className="text-[#a3a3a3] text-sm leading-relaxed mb-4">
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
        )}

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-[#262626]">
          <Link 
            href="/"
            className="text-[#525252] hover:text-[#a3a3a3] transition-colors text-sm"
          >
            ← Back to homepage
          </Link>
        </footer>
      </div>
    </main>
  );
}
