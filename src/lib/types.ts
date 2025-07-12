export interface User {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    coverImage?: string;
    followers: number;
    following: number;
    stats: {
        booksRead: number;
        filmsWatched: number;
        showsCompleted: number;
    };
    timeSpent: {
        films: string;
        shows: string;
        books: string;
    };
    readingSpeed: number; // pages per hour
}

export interface MediaItem {
    id: string;
    title: string;
    poster: string;
    type: 'book' | 'film' | 'show';
    genre: string[];
    creator: string;
    year: number;
    rating?: number;
    description?: string;
    status?: 'reading' | 'watching' | 'completed' | 'want-to-read' | 'want-to-watch' | 'dropped';
}

export interface Review {
    id: string;
    userId: string;
    username: string;
    userAvatar: string;
    mediaId: string;
    mediaTitle: string;
    mediaPoster: string;
    rating: number;
    content: string;
    createdAt: string;
}

export interface Creator {
    id: string;
    name: string;
    role: string;
    count: number;
}

export interface GenreData {
    genre: string;
    percentage: number;
    color: string;
}

export type NavigationTab = 'books' | 'films' | 'shows' | 'discover' | 'analytics';
