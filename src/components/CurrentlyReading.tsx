'use client';

import { useEffect, useState } from 'react';
import { Loader2, ArrowUpRight, BookOpen } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string | null;
  description: string;
  link: string | null;
  status: string;
}

export default function CurrentlyReading() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/notion/reading');
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setBooks(data.books || []);
      } catch (err) {
        setError('Unable to load library');
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <section className="py-24 border-t border-[#262626]">
        <div className="flex items-center gap-3 text-[#737373]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm tracking-wide">Loading library...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 border-t border-[#262626]">
        <span className="text-xs tracking-[0.2em] text-[#737373] uppercase block mb-8">
          Currently Reading
        </span>
        <p className="text-[#525252] text-sm">{error}</p>
      </section>
    );
  }

  if (books.length === 0) {
    return (
      <section className="py-24 border-t border-[#262626]">
        <span className="text-xs tracking-[0.2em] text-[#737373] uppercase block mb-8">
          Currently Reading
        </span>
        <p className="text-[#525252] text-sm">No books in the library yet.</p>
      </section>
    );
  }

  const currentBook = books[0];
  const shelfBooks = books.slice(1, 6);

  return (
    <section className="py-24 border-t border-[#262626]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Section Label */}
        <div className="lg:col-span-3">
          <span className="text-xs tracking-[0.2em] text-[#737373] uppercase">
            Currently Reading
          </span>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Book Cover */}
            <a 
              href={currentBook.link || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-[2/3] overflow-hidden bg-[#141414] flex items-center justify-center"
            >
              {currentBook.coverImage ? (
                <>
                  <img
                    src={currentBook.coverImage}
                    alt={`${currentBook.title} cover`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 text-[#333]">
                  <BookOpen className="w-16 h-16" />
                  <span className="text-xs tracking-wider uppercase">No Cover</span>
                </div>
              )}
            </a>

            {/* Book Details */}
            <div className="flex flex-col justify-between">
              <div>
                <a 
                  href={currentBook.link || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-block"
                >
                  <h3 className="font-display text-3xl sm:text-4xl text-[#f5f5f5] mb-4 group-hover:text-[#a3a3a3] transition-colors leading-tight">
                    {currentBook.title}
                  </h3>
                </a>
                {currentBook.author && (
                  <p className="text-[#737373] text-lg mb-6">
                    by <span className="text-[#a3a3a3]">{currentBook.author}</span>
                  </p>
                )}
                
                {currentBook.description && (
                  <p className="text-[#737373] text-sm leading-relaxed line-clamp-4">
                    {currentBook.description}
                  </p>
                )}
              </div>

              {/* Shelf */}
              {shelfBooks.length > 0 && (
                <div className="mt-8 pt-8 border-t border-[#262626]">
                  <p className="text-sm tracking-[0.15em] text-[#737373] uppercase mb-5">
                    Also reading
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {shelfBooks.map((book, index) => (
                      <a
                        key={index}
                        href={book.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <div className="aspect-[2/3] w-full overflow-hidden bg-[#141414] border border-[#1a1a1a] group-hover:border-[#333] transition-colors">
                          {book.coverImage ? (
                            <img
                              src={book.coverImage}
                              alt={`${book.title} cover`}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-[#333]">
                              <BookOpen className="w-6 h-6 mb-2" />
                              <span className="text-[10px] tracking-wider uppercase">No Cover</span>
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-xs text-[#737373] group-hover:text-[#f5f5f5] transition-colors">
                          {book.title.length > 35 ? book.title.slice(0, 35) + '...' : book.title}
                        </p>
                      </a>
                    ))}
                    {books.length > 6 && (
                      <span className="text-xs text-[#525252] self-end">
                        +{books.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
