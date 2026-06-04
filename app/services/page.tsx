import { Suspense } from 'react';
import ServicesClient, { Service } from './services-client';

export default async function ServicesPage() {
    let initialServices: Service[] = [];
    try {
        // Default to city ID 3 (Pune) for pre-rendering purposes
        const res = await fetch('https://apiweb.geargrowcycle.com/api/service/getServices?city=3', { next: { revalidate: 3600 } });
        const json = await res.json();
        if (json && json.data) {
            initialServices = json.data;
        }
    } catch (error) {
        console.error('Failed to fetch initial services for SSR:', error);
    }

    return (
        <Suspense
            fallback={
                <div className='min-h-screen bg-[#060608] text-white flex justify-center items-center'>
                    Loading services...
                </div>
            }
        >
            <ServicesClient initialServices={initialServices} />
        </Suspense>
    );
}
