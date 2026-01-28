import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notion, extractText } from '@/lib/notion';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

async function getBlogPost(id: string) {
  try {
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

    return {
      id: pageData.id,
      title,
      excerpt,
      content: content.trim() || excerpt,
      tags,
      date,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[#525252] hover:text-[#a3a3a3] transition-colors text-sm mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-xs text-[#525252] mb-6">
            <span>{post.date}</span>
            {post.tags.length > 0 && (
              <>
                <span className="text-[#333]">·</span>
                {post.tags.map((tag: string, i: number) => (
                  <span key={i} className="text-[#404040]">{tag}</span>
                ))}
              </>
            )}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-[#f5f5f5] leading-[1.1]">
            {post.title}
          </h1>
        </header>

        {/* Post Content */}
        <article className="prose prose-invert prose-neutral max-w-none">
          <div className="text-[#a3a3a3] leading-[1.8] text-lg whitespace-pre-wrap">
            {post.content.split('\n').map((paragraph: string, i: number) => {
              if (paragraph.startsWith('# ')) {
                return <h2 key={i} className="text-2xl text-[#f5f5f5] mt-12 mb-6">{paragraph.slice(2)}</h2>;
              }
              if (paragraph.startsWith('## ')) {
                return <h3 key={i} className="text-xl text-[#e5e5e5] mt-10 mb-4">{paragraph.slice(3)}</h3>;
              }
              if (paragraph.startsWith('### ')) {
                return <h4 key={i} className="text-lg text-[#d4d4d4] mt-8 mb-3">{paragraph.slice(4)}</h4>;
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote key={i} className="border-l-2 border-[#333] pl-4 my-6 text-[#737373]">
                    {paragraph.slice(2)}
                  </blockquote>
                );
              }
              if (paragraph.startsWith('• ')) {
                return <li key={i} className="ml-4 text-[#a3a3a3]">{paragraph.slice(2)}</li>;
              }
              if (paragraph.trim()) {
                return <p key={i} className="mb-6">{paragraph}</p>;
              }
              return null;
            })}
          </div>
        </article>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-[#262626]">
          <Link 
            href="/"
            className="text-[#525252] hover:text-[#a3a3a3] transition-colors text-sm"
          >
            ← Back to all writings
          </Link>
        </footer>
      </div>
    </main>
  );
}
