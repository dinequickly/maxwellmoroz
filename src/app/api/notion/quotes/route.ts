import { NextResponse } from 'next/server';
import { notion, DATABASE_IDS, extractText } from '@/lib/notion';

// Default Man in the Arena quote
const DEFAULT_QUOTE = {
  id: 'default',
  text: "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood; who strives valiantly; who errs, who comes short again and again, because there is no effort without error and shortcoming; but who does actually strive to do the deeds; who knows great enthusiasms, the great devotions; who spends himself in a worthy cause; who at the best knows in the end the triumph of high achievement, and who at the worst, if he fails, at least fails while daring greatly, so that his place shall never be with those cold and timid souls who neither know victory nor defeat.",
  author: "Theodore Roosevelt",
  source: "Citizenship in a Republic, 1910",
  featured: true,
};

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.quotes,
      filter: {
        property: 'Show',
        checkbox: {
          equals: true,
        },
      },
    });

    // If no quotes found, return default
    if (response.results.length === 0) {
      return NextResponse.json({ 
        quotes: [DEFAULT_QUOTE], 
        featured: DEFAULT_QUOTE 
      });
    }

    const quotes = response.results.map((page: any) => {
      const properties = page.properties;
      
      // Debug: log available properties
      console.log('Quote page properties:', Object.keys(properties));
      
      // Try multiple property name variations and types
      // Text could be title or rich_text type
      const textValue = extractText(properties.Text?.title) ||
                        extractText(properties.Text?.rich_text) || 
                        extractText(properties.text?.title) ||
                        extractText(properties.text?.rich_text) || 
                        extractText(properties.Quote?.title) ||
                        extractText(properties.Quote?.rich_text) ||
                        extractText(properties.quote?.title) ||
                        extractText(properties.quote?.rich_text) ||
                        extractText(properties.Content?.title) ||
                        extractText(properties.Content?.rich_text) ||
                        '';
      
      // Author could also be title or rich_text
      const authorValue = extractText(properties.Author?.title) ||
                          extractText(properties.Author?.rich_text) || 
                          extractText(properties.author?.title) ||
                          extractText(properties.author?.rich_text) || 
                          extractText(properties.By?.title) ||
                          extractText(properties.By?.rich_text) ||
                          '';
      
      // Source could also be title or rich_text  
      const sourceValue = extractText(properties.Source?.title) ||
                          extractText(properties.Source?.rich_text) || 
                          extractText(properties.source?.title) ||
                          extractText(properties.source?.rich_text) || 
                          extractText(properties.From?.title) ||
                          extractText(properties.From?.rich_text) ||
                          '';
      
      const isFeatured = properties.Featured?.checkbox || 
                         properties.featured?.checkbox || 
                         properties.Pinned?.checkbox ||
                         false;

      console.log('Extracted quote:', { textValue: textValue.slice(0, 50), authorValue, sourceValue });

      return {
        id: page.id,
        text: textValue,
        author: authorValue,
        source: sourceValue,
        featured: isFeatured,
      };
    });

    // Filter out quotes with no text
    const validQuotes = quotes.filter((q: any) => q.text && q.text.trim().length > 0);
    
    if (validQuotes.length === 0) {
      console.log('No valid quotes found, using default');
      return NextResponse.json({ 
        quotes: [DEFAULT_QUOTE], 
        featured: DEFAULT_QUOTE 
      });
    }

    // Return featured quote first, or first quote if none featured
    const featuredQuote = validQuotes.find((q: any) => q.featured) || validQuotes[0];

    return NextResponse.json({ quotes: validQuotes, featured: featuredQuote });
  } catch (error: any) {
    console.error('Error fetching quotes:', error);
    // Return default quote on error
    return NextResponse.json({ 
      quotes: [DEFAULT_QUOTE], 
      featured: DEFAULT_QUOTE,
      error: error.message 
    });
  }
}
