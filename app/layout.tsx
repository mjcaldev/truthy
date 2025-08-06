import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Truthy.io - Truth-Driven Tech Career Insights',
  description: 'Build careers that matter with actionable advice, industry trends, and real success stories for tech professionals.',
  keywords: 'tech careers, software development, career advice, technology trends, programming jobs, career growth',
  authors: [{ name: 'Truthy.io Team' }],
  openGraph: {
    title: 'Truthy.io - Truth-Driven Tech Career Insights',
    description: 'Build careers that matter with actionable advice, industry trends, and real success stories for tech professionals.',
    url: 'https://truthy.io',
    siteName: 'Truthy.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Truthy.io - Truth-Driven Tech Career Insights',
    description: 'Build careers that matter with actionable advice, industry trends, and real success stories for tech professionals.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}