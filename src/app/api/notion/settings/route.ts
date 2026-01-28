import { NextResponse } from 'next/server';
import { notion, DATABASE_IDS, extractText, extractUrl } from '@/lib/notion';

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.siteSettings,
      filter: {
        property: 'Title',
        title: {
          equals: 'Main',
        },
      },
    });

    if (response.results.length === 0) {
      return NextResponse.json({ settings: null });
    }

    const page = response.results[0] as any;
    const properties = page.properties;

    const settings = {
      id: page.id,
      title: extractText(properties['Site Title']?.rich_text) || 
             extractText(properties.Title?.title) || 
             'Personal Archive',
      description: extractText(properties.Description?.rich_text) || '',
      tagline: extractText(properties.Tagline?.rich_text) || 
               'A living collection of thoughts, works, and inspirations.',
      photo: extractUrl(properties.Photo) || null,
      email: extractUrl(properties.Email) || null,
      github: extractUrl(properties.GitHub) || null,
      linkedin: extractUrl(properties.LinkedIn) || 
                extractUrl(properties.LinkedInURL) || null,
      twitter: extractUrl(properties.Twitter) || 
               extractUrl(properties.TwitterURL) || null,
    };

    return NextResponse.json({ settings });
  } catch (error: any) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site settings', details: error.message },
      { status: 500 }
    );
  }
}
