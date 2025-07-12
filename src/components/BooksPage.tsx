'use client';

import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/MediaCard';
import { books } from '@/lib/mockData';
import { ChevronRight } from 'lucide-react';

interface BooksPageProps {
    searchQuery: string;
}

export function BooksPage({ searchQuery }: BooksPageProps) {
    const filteredBooks = books.filter(book =>
        searchQuery === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.creator.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fictionBooks = filteredBooks.filter(book => book.genre.includes('Fiction'));
    const fantasyBooks = filteredBooks.filter(book => book.genre.includes('Fantasy'));

    const CategorySection = ({ title, books, color }: { title: string; books: typeof filteredBooks; color: string }) => (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                    {title}
                </h2>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {books.map((book) => (
                    <MediaCard key={book.id} item={book} />
                ))}
            </div>
        </section>
    );

    return (
        <div className="space-y-8">
            {searchQuery ? (
                <section>
                    <h2 className="text-xl font-bold text-white mb-4">
                        Search Results for "{searchQuery}"
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                        {filteredBooks.map((book) => (
                            <MediaCard key={book.id} item={book} />
                        ))}
                    </div>
                </section>
            ) : (
                <>
                    <CategorySection
                        title="Fiction"
                        books={fictionBooks}
                        color="bg-red-500"
                    />
                    <CategorySection
                        title="Fantasy"
                        books={fantasyBooks}
                        color="bg-purple-500"
                    />
                </>
            )}
        </div>
    );
}
