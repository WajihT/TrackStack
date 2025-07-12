import { MediaItem } from './types';

const TMDB_API_KEY = '8d8e7b4a5c6d4e8a9f0b1c2d3e4f5a6b'; // Public demo key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export interface TMDBMovie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    genre_ids: number[];
    vote_average: number;
    original_language: string;
}

export interface TMDBTVShow {
    id: number;
    name: string;
    poster_path: string;
    first_air_date: string;
    overview: string;
    genre_ids: number[];
    vote_average: number;
    original_language: string;
}

const genreMap: { [key: number]: string } = {
    // Movie genres
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
    // TV genres
    10759: 'Action & Adventure',
    10762: 'Kids',
    10763: 'News',
    10764: 'Reality',
    10765: 'Sci-Fi & Fantasy',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War & Politics',
};

function convertTMDBToMediaItem(tmdbItem: TMDBMovie | TMDBTVShow, type: 'film' | 'show'): MediaItem {
    const isMovie = 'title' in tmdbItem;
    const title = isMovie ? tmdbItem.title : tmdbItem.name;
    const year = isMovie
        ? new Date(tmdbItem.release_date || '').getFullYear()
        : new Date(tmdbItem.first_air_date || '').getFullYear();

    const genres = tmdbItem.genre_ids.map(id => genreMap[id]).filter(Boolean);

    return {
        id: `${type}-${tmdbItem.id}`,
        title,
        poster: tmdbItem.poster_path ? `${TMDB_IMAGE_BASE}${tmdbItem.poster_path}` : 'https://images.unsplash.com/photo-1489599663928-e26d67e3a6fd?w=300&h=450&fit=crop',
        type,
        genre: genres.length > 0 ? genres : ['Drama'],
        creator: 'Various', // TMDB doesn't provide director in list endpoints
        year: year || 2024,
        rating: Math.round((tmdbItem.vote_average / 2) * 10) / 10, // Convert 10-point to 5-point scale
        description: tmdbItem.overview,
    };
}

export async function fetchTrendingMovies(): Promise<MediaItem[]> {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();

        if (data.results) {
            return data.results.slice(0, 20).map((movie: TMDBMovie) =>
                convertTMDBToMediaItem(movie, 'film')
            );
        }
        return [];
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}

export async function fetchTrendingTVShows(): Promise<MediaItem[]> {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();

        if (data.results) {
            return data.results.slice(0, 20).map((show: TMDBTVShow) =>
                convertTMDBToMediaItem(show, 'show')
            );
        }
        return [];
    } catch (error) {
        console.error('Error fetching trending TV shows:', error);
        return [];
    }
}

export async function searchMovies(query: string): Promise<MediaItem[]> {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        if (data.results) {
            return data.results.slice(0, 20).map((movie: TMDBMovie) =>
                convertTMDBToMediaItem(movie, 'film')
            );
        }
        return [];
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}

export async function searchTVShows(query: string): Promise<MediaItem[]> {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        if (data.results) {
            return data.results.slice(0, 20).map((show: TMDBTVShow) =>
                convertTMDBToMediaItem(show, 'show')
            );
        }
        return [];
    } catch (error) {
        console.error('Error searching TV shows:', error);
        return [];
    }
}

export async function getPopularMovies(): Promise<MediaItem[]> {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();

        if (data.results) {
            return data.results.slice(0, 20).map((movie: TMDBMovie) =>
                convertTMDBToMediaItem(movie, 'film')
            );
        }
        return [];
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getPopularTVShows(): Promise<MediaItem[]> {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();

        if (data.results) {
            return data.results.slice(0, 20).map((show: TMDBTVShow) =>
                convertTMDBToMediaItem(show, 'show')
            );
        }
        return [];
    } catch (error) {
        console.error('Error fetching popular TV shows:', error);
        return [];
    }
}
