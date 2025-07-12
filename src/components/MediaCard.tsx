'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MediaItem } from '@/lib/types';
import { useApp } from '@/lib/context';
import { Star, Plus, Check, Clock, Eye, BookOpen, Play } from 'lucide-react';

interface MediaCardProps {
    item: MediaItem;
    showQuickActions?: boolean;
}

export function MediaCard({ item, showQuickActions = true }: MediaCardProps) {
    const { addToLibrary, getItemFromLibrary, updateItemStatus, rateItem } = useApp();
    const [showDialog, setShowDialog] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(0);

    const libraryItem = getItemFromLibrary(item.id);
    const userRating = libraryItem?.userRating || 0;
    const userStatus = libraryItem?.userStatus;

    const handleQuickAdd = () => {
        const defaultStatus =
            item.type === 'book' ? 'want-to-read' :
                item.type === 'film' ? 'want-to-watch' :
                    'want-to-watch';

        addToLibrary(item, defaultStatus);
    };

    const handleStatusChange = (status: 'reading' | 'watching' | 'completed' | 'want-to-read' | 'want-to-watch' | 'dropped') => {
        if (libraryItem) {
            updateItemStatus(item.id, status);
        } else {
            addToLibrary(item, status);
        }
        setShowDialog(false);
    };

    const handleRating = (rating: number) => {
        if (!libraryItem) {
            const defaultStatus = item.type === 'book' ? 'reading' : 'watching';
            addToLibrary(item, defaultStatus);
        }
        rateItem(item.id, rating);
    };

    const getStatusIcon = () => {
        switch (userStatus) {
            case 'completed':
                return <Check className="h-3 w-3" />;
            case 'reading':
            case 'watching':
                return <Clock className="h-3 w-3" />;
            case 'want-to-read':
            case 'want-to-watch':
                return item.type === 'book' ? <BookOpen className="h-3 w-3" /> : <Play className="h-3 w-3" />;
            default:
                return <Plus className="h-3 w-3" />;
        }
    };

    const getStatusColor = () => {
        switch (userStatus) {
            case 'completed':
                return 'bg-green-600';
            case 'reading':
            case 'watching':
                return 'bg-blue-600';
            case 'want-to-read':
            case 'want-to-watch':
                return 'bg-yellow-600';
            default:
                return 'bg-gray-600';
        }
    };

    const statusOptions = [
        ...(item.type === 'book' ? [
            { value: 'want-to-read' as const, label: 'Want to Read' },
            { value: 'reading' as const, label: 'Currently Reading' },
            { value: 'completed' as const, label: 'Read' },
        ] : [
            { value: 'want-to-watch' as const, label: 'Want to Watch' },
            { value: 'watching' as const, label: 'Currently Watching' },
            { value: 'completed' as const, label: 'Watched' },
        ]),
        { value: 'dropped' as const, label: 'Dropped' },
    ];

    return (
        <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer group relative">
            <CardContent className="p-0">
                <div className="relative">
                    <img
                        src={item.poster}
                        alt={item.title}
                        className="w-full aspect-[3/4] object-cover rounded-t"
                    />

                    {/* Rating Display */}
                    {item.rating && (
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-xs font-medium">{item.rating}</span>
                        </div>
                    )}

                    {/* Status Badge */}
                    {userStatus && (
                        <div className={`absolute top-2 left-2 ${getStatusColor()} rounded-full p-1`}>
                            {getStatusIcon()}
                        </div>
                    )}

                    {/* Quick Actions Overlay */}
                    {showQuickActions && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex gap-2">
                                {!libraryItem && (
                                    <Button
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleQuickAdd();
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add
                                    </Button>
                                )}

                                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                                    <DialogTrigger asChild>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={(e) => e.stopPropagation()}
                                            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            Details
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-900 border-gray-800 text-white">
                                        <DialogHeader>
                                            <DialogTitle>{item.title}</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div className="flex gap-4">
                                                <img
                                                    src={item.poster}
                                                    alt={item.title}
                                                    className="w-24 h-36 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-gray-400 mb-2">By {item.creator} • {item.year}</p>
                                                    <div className="flex gap-1 mb-3">
                                                        {item.genre.map((g) => (
                                                            <Badge key={g} variant="secondary" className="bg-gray-800 text-gray-300">
                                                                {g}
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    {/* Rating System */}
                                                    <div className="mb-4">
                                                        <p className="text-sm text-gray-400 mb-2">Your Rating:</p>
                                                        <div className="flex gap-1">
                                                            {Array.from({ length: 5 }, (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-5 w-5 cursor-pointer transition-colors ${
                                                                        i < (hoveredRating || userRating)
                                                                            ? 'text-yellow-400 fill-yellow-400'
                                                                            : 'text-gray-600 hover:text-yellow-300'
                                                                    }`}
                                                                    onMouseEnter={() => setHoveredRating(i + 1)}
                                                                    onMouseLeave={() => setHoveredRating(0)}
                                                                    onClick={() => handleRating(i + 1)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status Selection */}
                                            <div>
                                                <p className="text-sm text-gray-400 mb-2">Status:</p>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {statusOptions.map((option) => (
                                                        <Button
                                                            key={option.value}
                                                            variant={userStatus === option.value ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => handleStatusChange(option.value)}
                                                            className={userStatus === option.value
                                                                ? "bg-blue-600 hover:bg-blue-700"
                                                                : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                                                            }
                                                        >
                                                            {option.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-3">
                    <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs">{item.creator}</p>

                    {/* User Rating Display */}
                    {userRating > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                        i < userRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
