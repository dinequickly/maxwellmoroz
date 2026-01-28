import { NextResponse } from 'next/server';
import { notion, DATABASE_IDS, extractText } from '@/lib/notion';

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.experience,
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

    const experiences = response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        role: extractText(properties.Role?.title) || '',
        company: extractText(properties.Company?.rich_text) || '',
        dates: extractText(properties.Dates?.rich_text) || '',
        location: extractText(properties.Location?.rich_text) || '',
        description: extractText(properties.Description?.rich_text) || '',
      };
    });

    return NextResponse.json({ experiences });
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    );
  }
}
