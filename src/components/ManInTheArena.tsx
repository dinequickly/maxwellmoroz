'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Quote {
  id: string;
  text: string;
  author: string;
  source: string;
  featured: boolean;
}

export default function QuoteSection() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch('/api/notion/quotes');
        const data = await response.json();
        
        if (data.featured) {
          setQuote(data.featured);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuotes();
  }, []);

  // Fallback quote if Notion fetch fails or no quotes
  const fallbackQuote = {
    text: "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood; who strives valiantly; who errs, who comes short again and again, because there is no effort without error and shortcoming; but who does actually strive to do the deeds; who knows great enthusiasms, the great devotions; who spends himself in a worthy cause; who at the best knows in the end the triumph of high achievement, and who at the worst, if he fails, at least fails while daring greatly, so that his place shall never be with those cold and timid souls who neither know victory nor defeat.",
    author: "Theodore Roosevelt",
    source: "Citizenship in a Republic, 1910",
  };

  const displayQuote = quote || fallbackQuote;

  if (loading) {
    return (
      <section className="py-24 border-t border-[#262626]">
        <div className="flex items-center gap-3 text-[#737373]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm tracking-wide">Loading...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 border-t border-[#262626]">
      <div className="max-w-4xl mx-auto">
        <blockquote>
          <p className="font-display text-xl sm:text-2xl leading-[1.5] text-[#a3a3a3] tracking-[-0.01em]">
            "{displayQuote.text}"
          </p>
        </blockquote>
        
        <footer className="mt-8 flex items-center gap-4">
          <div className="h-px w-12 bg-[#333]" />
          <div>
            <cite className="text-[#737373] text-sm not-italic">
              {displayQuote.author}
            </cite>
            {displayQuote.source && (
              <p className="text-[#525252] text-xs mt-0.5">
                {displayQuote.source}
              </p>
            )}
          </div>
        </footer>
      </div>
    </section>
  );
}
