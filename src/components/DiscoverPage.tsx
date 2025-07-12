'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { topUsers, topReviews } from '@/lib/mockData';
import { Star, Users, MessageSquare } from 'lucide-react';

export function DiscoverPage() {
    const renderStars = (rating: number) => {
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
        <div className="space-y-8">
            {/* Top Users */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Top Users
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {topUsers.map((user) => (
                        <Card key={user.id} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
                            <CardContent className="p-4 text-center">
                                <Avatar className="h-16 w-16 mx-auto mb-3">
                                    <AvatarImage src={user.avatar} alt={user.username} />
                                    <AvatarFallback className="bg-gray-800 text-white">
                                        {user.username.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className="text-white font-medium text-sm mb-1 truncate">
                                    {user.username}
                                </h3>
                                <p className="text-gray-400 text-xs">
                                    {user.followers} followers
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Top Reviews */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="h-6 w-6" />
                    Top Reviews
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {topReviews.map((review) => (
                        <Card key={review.id} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3 mb-3">
                                    <img
                                        src={review.mediaPoster}
                                        alt={review.mediaTitle}
                                        className="w-16 h-24 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white font-medium text-sm mb-1 truncate">
                                            {review.mediaTitle}
                                        </h4>
                                        <div className="flex items-center gap-1 mb-2">
                                            {renderStars(review.rating)}
                                        </div>
                                        <p className="text-gray-300 text-sm line-clamp-2">
                                            {review.content}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={review.userAvatar} alt={review.username} />
                                        <AvatarFallback className="bg-gray-800 text-white text-xs">
                                            {review.username.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-gray-400 text-xs">{review.username}</span>
                                    <span className="text-gray-500 text-xs ml-auto">{review.createdAt}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
