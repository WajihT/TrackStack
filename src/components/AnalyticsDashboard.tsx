'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/lib/context';
import { Trophy, Clock, BookOpen } from 'lucide-react';

export function AnalyticsDashboard() {
    const { getAnalytics } = useApp();
    const analytics = getAnalytics();

    return (
        <div className="space-y-6">
            {/* Time Spent */}
            <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Time Spent
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-1">
                                {analytics.timeSpent.films}
                            </div>
                            <div className="text-sm text-gray-400">Films</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-1">
                                {analytics.timeSpent.shows}
                            </div>
                            <div className="text-sm text-gray-400">Shows</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-1">
                                {analytics.timeSpent.books}
                            </div>
                            <div className="text-sm text-gray-400">Books</div>
                            <div className="text-xs text-gray-500 mt-1">
                                ({Math.round(analytics.stats.booksRead * 250)} pages)
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <BookOpen className="h-4 w-4" />
                            <span>Reading Speed (pages/hour):</span>
                            <span className="text-white font-medium">{analytics.readingSpeed}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Genre Breakdown */}
            <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        Genre Breakdown
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {analytics.genreBreakdown[0]?.genre === 'No data yet' ? (
                        <div className="text-center py-8">
                            <p className="text-gray-400 mb-4">No completed items yet</p>
                            <p className="text-gray-500 text-sm">
                                Add some movies, shows, or books and mark them as completed to see your genre breakdown!
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-center mb-6">
                                {/* Donut Chart */}
                                <div className="relative w-48 h-48">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        {analytics.genreBreakdown.map((genre, index) => {
                                            const radius = 35;
                                            const circumference = 2 * Math.PI * radius;
                                            const previousPercentages = analytics.genreBreakdown
                                                .slice(0, index)
                                                .reduce((sum, g) => sum + g.percentage, 0);
                                            const strokeDasharray = `${(genre.percentage / 100) * circumference} ${circumference}`;
                                            const strokeDashoffset = -((previousPercentages / 100) * circumference);

                                            return (
                                                <circle
                                                    key={genre.genre}
                                                    cx="50"
                                                    cy="50"
                                                    r={radius}
                                                    fill="transparent"
                                                    stroke={genre.color}
                                                    strokeWidth="8"
                                                    strokeDasharray={strokeDasharray}
                                                    strokeDashoffset={strokeDashoffset}
                                                    className="transition-all duration-300"
                                                />
                                            );
                                        })}
                                        {/* Inner circle */}
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="20"
                                            fill="#111827"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="grid grid-cols-2 gap-3">
                                {analytics.genreBreakdown.map((genre) => (
                                    <div key={genre.genre} className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: genre.color }}
                                        ></div>
                                        <span className="text-sm text-gray-300">{genre.genre}</span>
                                        <span className="text-sm text-gray-400">({genre.percentage}%)</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Top Creators */}
            <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Top Creators
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {analytics.topCreators.map((creator, index) => (
                            <div key={creator.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400 text-sm w-4">{index + 1}.</span>
                                    <div>
                                        <div className="text-white font-medium">{creator.name}</div>
                                        <div className="text-gray-400 text-sm">{creator.role}</div>
                                    </div>
                                </div>
                                <div className="text-white font-bold text-lg">{creator.count}</div>
                            </div>
                        ))}
                    </div>
                    {analytics.topCreators[0]?.name === 'Start tracking' && (
                        <div className="text-center mt-4 pt-4 border-t border-gray-800">
                            <p className="text-gray-500 text-sm">
                                Complete some movies, shows, or books to see your top creators!
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
