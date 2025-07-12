'use client';

import { MediaCard } from '@/components/MediaCard';
import { films } from '@/lib/mockData';
import { TrendingUp } from 'lucide-react';

interface FilmsPageProps {
    searchQuery: string;
}

export function FilmsPage({ searchQuery }: FilmsPageProps) {
    const filteredFilms = films.filter(film =>
        searchQuery === '' ||
        film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.creator.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <TrendingUp className="h-6 w-6" />
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'Trending This Week'}
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {filteredFilms.map((film) => (
                        <MediaCard key={film.id} item={film} />
                    ))}
                </div>
            </section>
        </div>
    );
}
