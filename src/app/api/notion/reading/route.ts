import { NextResponse } from 'next/server';
import { notion, DATABASE_IDS, extractText, extractFiles } from '@/lib/notion';

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.reading,
      filter: {
        property: 'Show',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Order',
          direction: 'ascending',
        },
      ],
    });

    const books = response.results.map((page: any) => {
      const properties = page.properties;
      
      // Try different property names that might exist in Notion
      const title = extractText(properties.Title?.title) || 
                    extractText(properties.Name?.title) || 
                    extractText(properties.Book?.title) ||
                    'Untitled';
      
      const author = extractText(properties.Author?.rich_text) || 
                     extractText(properties.Writer?.rich_text) || 
                     extractText(properties.By?.rich_text) ||
                     '';
      
      const coverImage = extractFiles(properties.Cover?.files) || 
                         extractFiles(properties['Cover Image']?.files) ||
                         extractFiles(properties.Image?.files) ||
                         extractFiles(properties.Photo?.files) ||
                         properties.CoverURL?.url || 
                         properties.URL?.url ||
                         properties.Link?.url ||
                         null;
      
      const description = extractText(properties.Description?.rich_text) || 
                          extractText(properties.Summary?.rich_text) || 
                          extractText(properties.Notes?.rich_text) ||
                          '';
      
      const link = properties.Link?.url || 
                   properties.URL?.url ||
                   page.url ||
                   null;
      
      const status = properties.Status?.select?.name || 
                     properties.State?.select?.name ||
                     'Reading';
      
      const order = properties.Order?.number || 999;

      return {
        id: page.id,
        title,
        author,
        coverImage,
        description,
        link,
        status,
        order,
      };
    });

    return NextResponse.json({ books });
  } catch (error: any) {
    console.error('Error fetching reading list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reading list', details: error.message },
      { status: 500 }
    );
  }
}
