import type { Metadata } from 'next';
import { Geist, Geist_Mono, Fraunces, Newsreader } from 'next/font/google';
import { profile } from '@/content/profile';
import CommandPalette from '@/components/CommandPalette';
import ConsoleSignature from '@/components/ConsoleSignature';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  axes: ['opsz', 'SOFT'],
  display: 'swap',
});

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maxwellmoroz.com'),
  title: {
    default: `${profile.name} — Notes on Frontier AI`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — Notes on Frontier AI`,
    description: profile.tagline,
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${newsreader.variable} antialiased`}
      >
        <div className="grain" aria-hidden />
        <div className="relative z-[2]">{children}</div>
        <CommandPalette />
        <ConsoleSignature />
      </body>
    </html>
  );
}
