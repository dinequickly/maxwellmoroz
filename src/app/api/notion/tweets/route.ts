import { NextResponse } from 'next/server';
import { notion, DATABASE_IDS, extractText } from '@/lib/notion';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '100');

    // Build filter - avoid circular references
    let filter: any;
    
    if (featuredOnly) {
      // Both Show = true AND Featured = true
      filter = {
        and: [
          {
            property: 'Show',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Featured',
            checkbox: {
              equals: true,
            },
          },
        ],
      };
    } else {
      // Just Show = true
      filter = {
        property: 'Show',
        checkbox: {
          equals: true,
        },
      };
    }

    const response = await notion.databases.query({
      database_id: DATABASE_IDS.tweets,
      filter,
      sorts: [
        {
          property: 'Order',
          direction: 'ascending',
        },
      ],
    });

    let tweets = response.results.map((page: any) => {
      const properties = page.properties;

      // Try multiple property name variations
      const content = extractText(properties.Content?.title) ||
                      extractText(properties.content?.title) ||
                      extractText(properties.Text?.rich_text) ||
                      extractText(properties.text?.rich_text) ||
                      '';

      const tweetUrl = properties['Tweet URL']?.url ||
                       properties['Tweet URL']?.url ||
                       properties.URL?.url ||
                       properties.url?.url ||
                       null;

      const tweetId = extractText(properties['Tweet ID']?.rich_text) ||
                      extractText(properties['tweet id']?.rich_text) ||
                      extractText(properties.ID?.rich_text) ||
                      '';

      const date = properties.Date?.date?.start ||
                   properties.date?.date?.start ||
                   page.created_time;

      const isFeatured = properties.Featured?.checkbox ||
                         properties.featured?.checkbox ||
                         false;

      const order = properties.Order?.number || 999;

      return {
        id: page.id,
        content,
        tweetUrl,
        tweetId: tweetId.trim(),
        date,
        featured: isFeatured,
        order,
      };
    });

    // Filter out tweets with no content and no tweetId
    tweets = tweets.filter((t: any) => t.content || t.tweetId);

    // Apply limit
    if (limit && tweets.length > limit) {
      tweets = tweets.slice(0, limit);
    }

    return NextResponse.json({ tweets });
  } catch (error: any) {
    console.error('Error fetching tweets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tweets', details: error.message },
      { status: 500 }
    );
  }
}
