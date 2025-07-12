'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { currentUser, books, films, shows } from '@/lib/mockData';
import { Star, Users, UserPlus, Edit3, BookOpen, Film, Tv } from 'lucide-react';

export function UserProfile() {
    const userBooks = books.slice(0, 12); // Show first 12 books as user's library

    const renderStars = (rating: number = 0) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-3 w-3 ${
                    i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                }`}
            />
        ));
    };

    return (
        <div className="space-y-6">
            {/* Cover Photo */}
            <div
                className="h-48 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg relative overflow-hidden"
                style={{
                    backgroundImage: currentUser.coverImage ? `url(${currentUser.coverImage})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Profile Info */}
            <div className="relative -mt-16 px-6">
                <div className="flex items-end gap-4 mb-4">
                    <Avatar className="h-24 w-24 border-4 border-gray-900">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                        <AvatarFallback className="bg-gray-800 text-white text-2xl">
                            {currentUser.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-white">{currentUser.displayName}</h1>
                        <p className="text-gray-400">@{currentUser.username}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                            <Users className="h-4 w-4 mr-2" />
                            Get Recommendations
                        </Button>
                        <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>
                </div>

                <div className="flex items-center gap-6 mb-6">
          <span className="text-white">
            <span className="font-bold">{currentUser.followers}</span>{' '}
              <span className="text-gray-400">Followers</span>
          </span>
                    <span className="text-white">
            <span className="font-bold">{currentUser.following}</span>{' '}
                        <span className="text-gray-400">Following</span>
          </span>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <BookOpen className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="text-sm text-gray-400 mb-1">Books</div>
                            <div className="text-sm text-gray-400 mb-1">Read</div>
                            <div className="text-2xl font-bold text-white">{currentUser.stats.booksRead}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Film className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="text-sm text-gray-400 mb-1">Films</div>
                            <div className="text-sm text-gray-400 mb-1">Watched</div>
                            <div className="text-2xl font-bold text-white">{currentUser.stats.filmsWatched}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Tv className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="text-sm text-gray-400 mb-1">Shows</div>
                            <div className="text-sm text-gray-400 mb-1">Completed</div>
                            <div className="text-2xl font-bold text-white">{currentUser.stats.showsCompleted}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs for different content */}
                <Tabs defaultValue="books" className="w-full">
                    <TabsList className="bg-gray-900 border-gray-800">
                        <TabsTrigger value="books" className="data-[state=active]:bg-red-600">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Books
                        </TabsTrigger>
                        <TabsTrigger value="films" className="data-[state=active]:bg-blue-600">
                            <Film className="h-4 w-4 mr-2" />
                            Films
                        </TabsTrigger>
                        <TabsTrigger value="shows" className="data-[state=active]:bg-green-600">
                            <Tv className="h-4 w-4 mr-2" />
                            Shows
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="books" className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="bg-red-600 text-white">All</Badge>
                                <Badge variant="outline" className="border-gray-700 text-gray-400">Reading</Badge>
                                <Badge variant="outline" className="border-gray-700 text-gray-400">Completed</Badge>
                                <Badge variant="outline" className="border-gray-700 text-gray-400">Want to Read</Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                            {userBooks.map((book) => (
                                <Card key={book.id} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer group">
                                    <CardContent className="p-0">
                                        <div className="relative">
                                            <img
                                                src={book.poster}
                                                alt={book.title}
                                                className="w-full aspect-[3/4] object-cover rounded"
                                            />
                                            {book.rating && (
                                                <div className="absolute bottom-2 left-2 flex items-center gap-1">
                                                    {renderStars(book.rating)}
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="films" className="mt-6">
                        <div className="text-center text-gray-400 py-8">
                            Films library coming soon...
                        </div>
                    </TabsContent>

                    <TabsContent value="shows" className="mt-6">
                        <div className="text-center text-gray-400 py-8">
                            Shows library coming soon...
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Footer */}
            <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
                <p>© 2025 ListLinkd. All rights reserved.</p>
                <p className="mt-1">*TV data from TMDB</p>
            </footer>
        </div>
    );
}
