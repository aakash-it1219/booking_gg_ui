import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Providers } from './providers';
import CityPopup from '@/components/city-popup';
import LayoutShell from '@/components/layout-shell';

export const metadata: Metadata = {
    title: 'Gear Grow Cycle | Doorstep Bicycle Service & Repair',
    description:
        'Professional doorstep bicycle maintenance and repair services at your location. We serve Pune, Bengaluru, Mumbai, Vishakhapatnam, Hyderabad, Chennai, and Navi Mumbai.',
    keywords: 'bicycle repair, doorstep bike service, cycle maintenance, Pune, Bengaluru, Mumbai, Vishakhapatnam, Hyderabad, Chennai, Navi Mumbai',
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
