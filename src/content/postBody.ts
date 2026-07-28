// Server-only: imported solely by the statically-generated post page.
import fs from 'node:fs';
import path from 'node:path';
import type { Post } from './posts';

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');

/** Read a post's markdown body at build time (static generation). Server-only. */
export function getPostBody(post: Post): string {
  if (!post.bodyFile) return '';
  return fs.readFileSync(path.join(POSTS_DIR, post.bodyFile), 'utf8');
}
