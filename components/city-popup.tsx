'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import type { AppDispatch } from '@/lib/store';
import { setCityPopup } from '@/lib/slices/uiSlice';
import { getCitiesAction } from '@/lib/actions/cityActions';
import { getLocaleStorage, setLocaleStorage } from '@/lib/utils';

export default function CityPopup() {
    const dispatch = useDispatch<AppDispatch>();
    const { cities } = useSelector((state: any) => state.city);
    const showCityPopup = useSelector((state: any) => state.ui.showCityPopup);

    const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

    // Fetch cities on mount
    useEffect(() => {
        dispatch(getCitiesAction());
    }, [dispatch]);

    // Auto-show popup if no city saved
    useEffect(() => {
        if (!getLocaleStorage('cityId')) {
            dispatch(setCityPopup(true));
        }
    }, [dispatch]);

    // Default select first city
    useEffect(() => {
        if (cities && cities.length > 0 && selectedCityId === null) {
            setSelectedCityId(cities[0].id);
        }
    }, [cities, selectedCityId]);

    // Pre-select saved city when popup re-opens from header
    useEffect(() => {
        if (showCityPopup) {
            const savedCityId = getLocaleStorage('cityId');
            if (savedCityId) {
                setSelectedCityId(parseInt(savedCityId));
            }
        }
    }, [showCityPopup]);

    const hasSavedCity = !!getLocaleStorage('cityId');
    const showPopup = showCityPopup || !hasSavedCity;

    const handleClosePopup = () => {
        if (selectedCityId !== null) {
            setLocaleStorage('cityId', selectedCityId.toString());
            dispatch(setCityPopup(false));
        }
    };

    const handleDismissPopup = () => {
        dispatch(setCityPopup(false));
    };

    if (!showPopup) return null;

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
            <div className='bg-white text-black rounded-lg p-6 min-w-[300px] shadow-lg relative'>
                {hasSavedCity && (
                    <button
                        onClick={handleDismissPopup}
                        className='absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition-colors'
                        aria-label='Close'
                    >
                        <X className='w-4 h-4 text-gray-500' />
                    </button>
                )}
                <h2 className='text-lg font-semibold mb-4'>Select your city</h2>
                <div className='grid grid-cols-2 gap-2 mb-4'>
                    {cities.map((city: any) => (
                        <button
                            key={city.id}
                            className={`w-full p-2 border rounded ${
                                selectedCityId === city.id
                                    ? 'bg-[#fbbf24] text-white border-blue-600'
                                    : 'bg-white text-black border-gray-300'
                            }`}
                            onClick={() => setSelectedCityId(city.id)}
                            type='button'
                        >
                            {city.name}
                        </button>
                    ))}
                </div>
                <button
                    className='bg-[#000] text-[#fbbf24] px-4 py-2 rounded w-full'
                    onClick={handleClosePopup}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}
