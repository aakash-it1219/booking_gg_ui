import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Providers } from './providers';
import CityPopup from '@/components/city-popup';
import LayoutShell from '@/components/layout-shell';

export const metadata: Metadata = {
    title: 'Gear Grow Cycle',
    description:
        'Doorstep bicycle maintenance services. Professional bike servicing at your convenience.',
    generator: 'v0.dev',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                <Providers>
                    <CityPopup />
                    <LayoutShell>{children}</LayoutShell>
                </Providers>
            </body>
        </html>
    );
}
