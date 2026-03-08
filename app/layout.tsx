import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sandpiper Middle School',
  description:
    'Sandpiper Middle School is a public, safe, and vibrant grades 6-8 school focused on strong academics, reduced bullying, and student leadership.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://sandpipermiddle.org' },
  openGraph: {
    type: 'website',
    siteName: 'Sandpiper Middle School',
    title: 'Sandpiper Middle School',
    description:
      'Sandpiper Middle School is a public, safe, and vibrant grades 6-8 school focused on strong academics, reduced bullying, and student leadership.',
    url: 'https://sandpipermiddle.org',
    images: [{ url: 'https://sandpipermiddle.web.app/favicon.svg' }],
  },
  twitter: {
    card: 'summary',
    title: 'Sandpiper Middle School',
    description:
      'Sandpiper Middle School is a public, safe, and vibrant grades 6-8 school focused on strong academics, reduced bullying, and student leadership.',
    images: ['https://sandpipermiddle.web.app/favicon.svg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MiddleSchool',
  name: 'Sandpiper Middle School',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Redwood City',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  url: 'https://sandpipermiddle.org',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Sandpiper Middle School" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var dark=t==='dark'||(t==null&&(function(){var h=new Date().getHours();return h>=18||h<6})());if(dark)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
