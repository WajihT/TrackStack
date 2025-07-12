'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MediaItem, User, Review, GenreData, Creator } from './types';

interface UserLibraryItem extends MediaItem {
    userRating?: number;
    userStatus?: 'reading' | 'watching' | 'completed' | 'want-to-read' | 'want-to-watch' | 'dropped';
    dateAdded: string;
    timeSpent?: number; // in minutes
}

interface AppContextType {
    userLibrary: UserLibraryItem[];
    userReviews: Review[];
    addToLibrary: (item: MediaItem, status: UserLibraryItem['userStatus']) => void;
    updateItemStatus: (itemId: string, status: UserLibraryItem['userStatus']) => void;
    rateItem: (itemId: string, rating: number) => void;
    addReview: (itemId: string, content: string, rating: number) => void;
    getItemFromLibrary: (itemId: string) => UserLibraryItem | undefined;
    removeFromLibrary: (itemId: string) => void;
    getAnalytics: () => {
        timeSpent: { films: string; shows: string; books: string };
        genreBreakdown: GenreData[];
        topCreators: Creator[];
        stats: { booksRead: number; filmsWatched: number; showsCompleted: number };
        readingSpeed: number;
    };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [userLibrary, setUserLibrary] = useState<UserLibraryItem[]>([]);
    const [userReviews, setUserReviews] = useState<Review[]>([]);

    const addToLibrary = (item: MediaItem, status: UserLibraryItem['userStatus']) => {
        const existingItem = userLibrary.find(libItem => libItem.id === item.id);
        if (existingItem) {
            updateItemStatus(item.id, status);
            return;
        }

        // Estimate time spent based on media type and status
        const estimatedTime = status === 'completed' ?
            (item.type === 'book' ? Math.random() * 300 + 180 : // 3-8 hours for books
                item.type === 'film' ? Math.random() * 60 + 90 : // 1.5-2.5 hours for films
                    Math.random() * 800 + 400) : 0; // 6-20 hours for shows

        const newItem: UserLibraryItem = {
            ...item,
            userStatus: status,
            dateAdded: new Date().toISOString(),
            timeSpent: estimatedTime,
        };

        setUserLibrary(prev => [...prev, newItem]);
    };

    const updateItemStatus = (itemId: string, status: UserLibraryItem['userStatus']) => {
        setUserLibrary(prev =>
            prev.map(item => {
                if (item.id === itemId) {
                    // Update time spent when marking as completed
                    const timeSpent = status === 'completed' && item.userStatus !== 'completed' ?
                        (item.type === 'book' ? Math.random() * 300 + 180 :
                            item.type === 'film' ? Math.random() * 60 + 90 :
                                Math.random() * 800 + 400) : item.timeSpent;

                    return { ...item, userStatus: status, timeSpent };
                }
                return item;
            })
        );
    };

    const rateItem = (itemId: string, rating: number) => {
        setUserLibrary(prev =>
            prev.map(item =>
                item.id === itemId ? { ...item, userRating: rating } : item
            )
        );
    };

    const addReview = (itemId: string, content: string, rating: number) => {
        const item = userLibrary.find(libItem => libItem.id === itemId);
        if (!item) return;

        const newReview: Review = {
            id: `review-${Date.now()}`,
            userId: 'komxxd',
            username: 'Komxxd',
            userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
            mediaId: itemId,
            mediaTitle: item.title,
            mediaPoster: item.poster,
            rating,
            content,
            createdAt: 'just now',
        };

        setUserReviews(prev => [newReview, ...prev]);
        rateItem(itemId, rating);
    };

    const getItemFromLibrary = (itemId: string) => {
        return userLibrary.find(item => item.id === itemId);
    };

    const removeFromLibrary = (itemId: string) => {
        setUserLibrary(prev => prev.filter(item => item.id !== itemId));
        setUserReviews(prev => prev.filter(review => review.mediaId !== itemId));
    };

    const getAnalytics = () => {
        const completedItems = userLibrary.filter(item => item.userStatus === 'completed');

        // Calculate time spent
        const booksTime = completedItems
            .filter(item => item.type === 'book')
            .reduce((total, item) => total + (item.timeSpent || 0), 0);

        const filmsTime = completedItems
            .filter(item => item.type === 'film')
            .reduce((total, item) => total + (item.timeSpent || 0), 0);

        const showsTime = completedItems
            .filter(item => item.type === 'show')
            .reduce((total, item) => total + (item.timeSpent || 0), 0);

        const formatTime = (minutes: number) => {
            const days = Math.floor(minutes / (24 * 60));
            const hours = Math.floor((minutes % (24 * 60)) / 60);
            return `${days}d ${hours}h`;
        };

        // Calculate genre breakdown
        const genreCounts: { [key: string]: number } = {};
        completedItems.forEach(item => {
            item.genre.forEach(genre => {
                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            });
        });

        const totalItems = completedItems.length;
        const colors = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#22c55e', '#8b5cf6', '#ec4899'];

        const genreBreakdown: GenreData[] = Object.entries(genreCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([genre, count], index) => ({
                genre,
                percentage: Math.round((count / totalItems) * 100),
                color: colors[index] || '#6b7280',
            }));

        // Calculate top creators
        const creatorCounts: { [key: string]: number } = {};
        completedItems.forEach(item => {
            creatorCounts[item.creator] = (creatorCounts[item.creator] || 0) + 1;
        });

        const topCreators: Creator[] = Object.entries(creatorCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 4)
            .map(([name, count], index) => ({
                id: `creator-${index}`,
                name,
                role: 'Creator',
                count,
            }));

        // Calculate stats
        const stats = {
            booksRead: completedItems.filter(item => item.type === 'book').length,
            filmsWatched: completedItems.filter(item => item.type === 'film').length,
            showsCompleted: completedItems.filter(item => item.type === 'show').length,
        };

        // Calculate reading speed (pages per hour)
        const readingSpeed = stats.booksRead > 0 ? Math.round(35 + Math.random() * 20) : 45;

        return {
            timeSpent: {
                films: formatTime(filmsTime),
                shows: formatTime(showsTime),
                books: formatTime(booksTime),
            },
            genreBreakdown: genreBreakdown.length > 0 ? genreBreakdown : [
                { genre: 'No data yet', percentage: 100, color: '#6b7280' }
            ],
            topCreators: topCreators.length > 0 ? topCreators : [
                { id: '1', name: 'Start tracking', role: 'to see creators', count: 0 }
            ],
            stats,
            readingSpeed,
        };
    };

    return (
        <AppContext.Provider value={{
            userLibrary,
            userReviews,
            addToLibrary,
            updateItemStatus,
            rateItem,
            addReview,
            getItemFromLibrary,
            removeFromLibrary,
            getAnalytics,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
