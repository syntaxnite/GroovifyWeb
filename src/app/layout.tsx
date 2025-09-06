'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Metadata is moved to a separate client component below
const metadata = {
  title: 'Groovify - Your Spotify Experience',
  description: 'Connect with your Spotify account to enjoy a personalized music experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Handle theme on initial load
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.add(storedTheme);
    setMounted(true);
  }, []);

  // This allows for proper initial server rendering
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen transition-colors duration-300`}>
        <Providers>{mounted && children}</Providers>
      </body>
    </html>
  );
}
