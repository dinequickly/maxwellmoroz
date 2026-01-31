import { NextResponse } from 'next/server';
import { notion, DATABASE_IDS, extractText, extractFiles } from '@/lib/notion';

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.projects,
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

    const projects = response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        name: extractText(properties.Name?.title) || 'Untitled',
        description: extractText(properties.Description?.rich_text) || '',
        year: properties.Year?.number?.toString() || '',
        githubUrl: properties.GitHub?.url || '',
        liveUrl: properties.Live?.url || '',
        paperUrl: properties.Paper?.url || '',
        tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        image: extractFiles(properties.Image?.files) || null,
      };
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
