'use client';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import CityPopup from '@/components/city-popup';

const metadata: Metadata = {
    title: 'GearGrow Cycle - Professional Bicycle Maintenance',
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
            <head></head>
            <body>
                <Provider store={store}>
                    <CityPopup />
                    {children}
                </Provider>
            </body>
        </html>
    );
}
