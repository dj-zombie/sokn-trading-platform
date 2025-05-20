import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import './globals.css';
import ThemeProviderComponent from '@/providers/theme-provider';

export const metadata: Metadata = {
  title: 'Sokn Trading Platform',
  description: 'Modern algorithmic trading platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderComponent>
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </ThemeProviderComponent>
      </body>
    </html>
  );
}
