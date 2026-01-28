'use client';

import { useEffect, useState } from 'react';
import { Loader2, BookOpen } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string | null;
  description: string;
  link: string | null;
  status: string;
}

interface Quote {
  id: string;
  text: string;
  author: string;
  source: string;
}

export default function ReadingAndQuote() {
  const [books, setBooks] = useState<Book[]>([]);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [booksRes, quotesRes] = await Promise.all([
          fetch('/api/notion/reading'),
          fetch('/api/notion/quotes'),
        ]);

        const booksData = await booksRes.json();
        const quotesData = await quotesRes.json();

        if (booksData.books) {
          setBooks(booksData.books);
        }
        if (quotesData.featured) {
          setQuote(quotesData.featured);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const fallbackQuote = {
    text: "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood; who strives valiantly; who errs, who comes short again and again, because there is no effort without error and shortcoming; but who does actually strive to do the deeds; who knows great enthusiasms, the great devotions; who spends himself in a worthy cause; who at the best knows in the end the triumph of high achievement, and who at the worst, if he fails, at least fails while daring greatly, so that his place shall never be with those cold and timid souls who neither know victory nor defeat.",
    author: "Theodore Roosevelt",
    source: "Citizenship in a Republic, 1910",
  };

  const displayQuote = quote || fallbackQuote;
  const currentBook = books[0];

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        {/* Currently Reading */}
        <div>
          <span className="text-xs tracking-[0.2em] text-[#737373] uppercase block mb-8">
            Currently Reading
          </span>
          
          {currentBook ? (
            <div>
              {/* Book Cover - NOT clickable */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#141414] flex items-center justify-center mb-6">
                {currentBook.coverImage ? (
                  <img
                    src={currentBook.coverImage}
                    alt={`${currentBook.title} cover`}
                    className="w-full h-full object-cover grayscale"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-[#333]">
                    <BookOpen className="w-16 h-16" />
                    <span className="text-xs tracking-wider uppercase">No Cover</span>
                  </div>
                )}
              </div>

              {/* Book Details - NOT clickable */}
              <h3 className="font-display text-2xl text-[#f5f5f5] mb-2">
                {currentBook.title}
              </h3>
              {currentBook.author && (
                <p className="text-[#737373] text-sm">
                  by <span className="text-[#a3a3a3]">{currentBook.author}</span>
                </p>
              )}

              {/* Shelf - NOT clickable */}
              {books.length > 1 && (
                <div className="mt-6 pt-6 border-t border-[#262626]">
                  <p className="text-xs tracking-[0.15em] text-[#525252] uppercase mb-3">
                    Also reading
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {books.slice(1, 4).map((book, index) => (
                      <span
                        key={index}
                        className="text-xs text-[#525252]"
                      >
                        {book.title}
                      </span>
                    ))}
                    {books.length > 4 && (
                      <span className="text-xs text-[#404040]">
                        +{books.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-[#525252] text-sm">No books in the library yet.</p>
          )}
        </div>

        {/* Quote */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs tracking-[0.2em] text-[#737373] uppercase block mb-8">
              Current favorite quote
            </span>
            
            <blockquote>
              <p className="text-lg sm:text-xl leading-[1.6] text-[#a3a3a3] italic">
                "{displayQuote.text}"
              </p>
            </blockquote>
            
            <footer className="mt-6">
              <div className="h-px w-12 bg-[#333] mb-4" />
              <cite className="text-[#737373] text-sm not-italic block">
                {displayQuote.author}
              </cite>
              {displayQuote.source && (
                <p className="text-[#525252] text-xs mt-1">
                  {displayQuote.source}
                </p>
              )}
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
