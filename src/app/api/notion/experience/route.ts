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

    const formatMonthYear = (value?: string) => {
      if (!value) return '';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '';
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: 'numeric',
      }).format(date);
    };

    const experiences = response.results.map((page: any) => {
      const properties = page.properties;
      const startDate = properties.Start?.date?.start || '';
      const endDate = properties.End?.date?.start || '';
      const formattedStart = formatMonthYear(startDate);
      const formattedEnd = endDate ? formatMonthYear(endDate) : 'Present';
      const dates =
        formattedStart && formattedEnd ? `${formattedStart} — ${formattedEnd}` : '';
      
      return {
        id: page.id,
        role: extractText(properties.Role?.title) || '',
        company: extractText(properties.Company?.rich_text) || '',
        dates,
        startDate,
        endDate,
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
