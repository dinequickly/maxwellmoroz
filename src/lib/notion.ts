import { Client } from '@notionhq/client';

const token = process.env.NOTION_TOKEN;

if (!token) {
  console.warn('NOTION_TOKEN is not set. Notion integration will not work.');
}

export const notion = new Client({
  auth: token || '',
});

// Database IDs
export const DATABASE_IDS = {
  blog: '075c9918de77404687ea02e706f2c16f',
  reading: 'a900e239d97742f48fd5fe8c50c6c064',
  projects: 'a2ce496fa726459aa7b693dc2cb88e05',
  experience: 'a0edb5c3967546f1b6f53009a1e02927',
  quotes: '242e3bcf0b3c4db3a823388c5bffb66a',
  siteSettings: '6f4329b39f13403a9e6996bc0dcade29',
  tweets: '5a7553b800bd43438c4a64fd2fc21ed0',
};

// Helper to get page content
export async function getPageContent(pageId: string) {
  const response = await notion.blocks.children.list({
    block_id: pageId,
  });
  return response.results;
}

// Helper to extract text from rich_text
export function extractText(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return '';
  return richText.map((rt) => rt.plain_text || '').join('');
}

// Helper to extract files/urls
export function extractFiles(files: any[]): string | null {
  if (!files || !Array.isArray(files) || files.length === 0) return null;
  const file = files[0];
  if (file.type === 'external') return file.external?.url || null;
  if (file.type === 'file') return file.file?.url || null;
  return null;
}

// Helper to get URL from URL property or text
export function extractUrl(urlProperty: any): string | null {
  if (!urlProperty) return null;
  if (urlProperty.url) return urlProperty.url;
  return null;
}
