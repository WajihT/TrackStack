import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Track Stack',
    description: 'One clean space to log, track, rate, and discover all the stuff you\'re into',
    icons: {
        icon: '/logo.ico',
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
        <body className={inter.className}>
        <AppProvider>
            {children}
        </AppProvider>
        </body>
        </html>
    );
}
