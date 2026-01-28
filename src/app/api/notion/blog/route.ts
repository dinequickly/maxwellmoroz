import { NextResponse } from 'next/server';
import { notion, DATABASE_IDS, extractText } from '@/lib/notion';

export async function GET() {
  try {
    // Try to query with filters, but fall back to no filters if it fails
    let response;
    try {
      // Try with select filter first (more common)
      response = await notion.databases.query({
        database_id: DATABASE_IDS.blog,
        filter: {
          and: [
            {
              property: 'Status',
              select: {
                equals: 'Published',
              },
            },
            {
              property: 'Show',
              checkbox: {
                equals: true,
              },
            },
          ],
        },
        sorts: [
          {
            timestamp: 'created_time',
            direction: 'descending',
          },
        ],
      });
    } catch (selectError) {
      // Try status filter if select fails
      try {
        response = await notion.databases.query({
          database_id: DATABASE_IDS.blog,
          filter: {
            and: [
              {
                property: 'Status',
                status: {
                  equals: 'Published',
                },
              },
              {
                property: 'Show',
                checkbox: {
                  equals: true,
                },
              },
            ],
          },
          sorts: [
            {
              timestamp: 'created_time',
              direction: 'descending',
            },
          ],
        });
      } catch (statusError) {
        // If both fail, fetch all posts
        console.log('All filters failed, fetching all posts');
        response = await notion.databases.query({
          database_id: DATABASE_IDS.blog,
          sorts: [
            {
              timestamp: 'created_time',
              direction: 'descending',
            },
          ],
        });
      }
    }

    const posts = response.results.map((page: any) => {
      const properties = page.properties;
      
      // Try multiple property name variations
      const title = extractText(properties.Title?.title) || 
                    extractText(properties.Name?.title) || 
                    extractText(properties['Post Title']?.title) ||
                    'Untitled';
      
      const excerpt = extractText(properties.Excerpt?.rich_text) || 
                      extractText(properties.Summary?.rich_text) || 
                      extractText(properties.Description?.rich_text) || 
                      extractText(properties.Preview?.rich_text) ||
                      '';
      
      const slug = extractText(properties.Slug?.rich_text) || 
                   extractText(properties.URL?.rich_text) ||
                   page.id;
      
      // Try Tags first, then Category/Categories
      const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || 
                   properties.Category?.multi_select?.map((tag: any) => tag.name) ||
                   properties.Categories?.multi_select?.map((tag: any) => tag.name) ||
                   (properties.Category?.select?.name ? [properties.Category.select.name] : []) ||
                   [];
      
      const date = properties.Date?.date?.start || 
                   properties.Published?.date?.start ||
                   properties['Publish Date']?.date?.start ||
                   page.created_time;

      // Check if post should be shown (Status = Published OR Show = true OR Published checkbox)
      const statusValue = properties.Status?.select?.name || 
                          properties.Status?.status?.name ||
                          '';
      const isPublished = statusValue === 'Published' ||
                         properties.Published?.checkbox === true ||
                         properties.Show?.checkbox === true;

      return {
        id: page.id,
        title,
        excerpt,
        slug,
        tags,
        date,
        isPublished,
      };
    });

    // Filter to only published posts if we didn't filter at API level
    const publishedPosts = posts.filter((p: any) => p.isPublished);

    return NextResponse.json({ posts: publishedPosts.length > 0 ? publishedPosts : posts });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', details: error.message },
      { status: 500 }
    );
  }
}
