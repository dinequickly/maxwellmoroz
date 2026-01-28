import { NextResponse } from 'next/server';
import { notion, extractText } from '@/lib/notion';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get page details
    const page = await notion.pages.retrieve({ page_id: id });
    
    // Get page content (blocks)
    const blocks = await notion.blocks.children.list({
      block_id: id,
    });

    // Extract content from blocks
    let content = '';
    for (const block of blocks.results as any[]) {
      if (block.type === 'paragraph') {
        const text = extractText(block.paragraph?.rich_text);
        if (text) content += text + '\n\n';
      } else if (block.type === 'heading_1') {
        content += '# ' + extractText(block.heading_1?.rich_text) + '\n\n';
      } else if (block.type === 'heading_2') {
        content += '## ' + extractText(block.heading_2?.rich_text) + '\n\n';
      } else if (block.type === 'heading_3') {
        content += '### ' + extractText(block.heading_3?.rich_text) + '\n\n';
      } else if (block.type === 'bulleted_list_item') {
        content += '• ' + extractText(block.bulleted_list_item?.rich_text) + '\n';
      } else if (block.type === 'numbered_list_item') {
        content += '1. ' + extractText(block.numbered_list_item?.rich_text) + '\n';
      } else if (block.type === 'quote') {
        content += '> ' + extractText(block.quote?.rich_text) + '\n\n';
      } else if (block.type === 'callout') {
        content += extractText(block.callout?.rich_text) + '\n\n';
      }
    }

    const pageData = page as any;
    const properties = pageData.properties;

    // Try multiple property name variations
    const title = extractText(properties.Title?.title) || 
                  extractText(properties.Name?.title) || 
                  extractText(properties['Post Title']?.title) ||
                  'Untitled';
    
    const excerpt = extractText(properties.Excerpt?.rich_text) || 
                    extractText(properties.Summary?.rich_text) || 
                    extractText(properties.Description?.rich_text) || 
                    '';
    
    const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || 
                 properties.Categories?.multi_select?.map((tag: any) => tag.name) ||
                 [];
    
    const date = properties.Date?.date?.start || 
                 properties.Published?.date?.start ||
                 pageData.created_time;

    return NextResponse.json({
      post: {
        id: pageData.id,
        title,
        excerpt,
        content: content.trim(),
        tags,
        date,
      },
    });
  } catch (error: any) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post', details: error.message },
      { status: 500 }
    );
  }
}
