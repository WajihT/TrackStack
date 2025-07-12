'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavigationTab } from '@/lib/types';
import { currentUser } from '@/lib/mockData';
import { Search, BookOpen, Film, Tv, Compass, BarChart3, User } from 'lucide-react';

interface NavigationProps {
    activeTab: NavigationTab;
    onTabChange: (tab: NavigationTab) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    searchPlaceholder: string;
    onProfileClick: () => void;
}

export function Navigation({
                               activeTab,
                               onTabChange,
                               searchQuery,
                               onSearchChange,
                               searchPlaceholder,
                               onProfileClick
                           }: NavigationProps) {
    const navItems = [
        { id: 'books' as NavigationTab, label: 'Books', icon: BookOpen },
        { id: 'films' as NavigationTab, label: 'Films', icon: Film },
        { id: 'shows' as NavigationTab, label: 'Shows', icon: Tv },
        { id: 'discover' as NavigationTab, label: 'Discover', icon: Compass },
        { id: 'analytics' as NavigationTab, label: 'Analytics', icon: BarChart3 },
    ];

    return (
        <header className="border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-white">ListLinkd.</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.id}
                                    variant="ghost"
                                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
                                        activeTab === item.id
                                            ? 'text-white bg-gray-800'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                    }`}
                                    onClick={() => onTabChange(item.id)}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Button>
                            );
                        })}
                    </nav>

                    {/* Search and Profile */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="search"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-64 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 pl-10"
                            />
                        </div>
                        <Avatar
                            className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-gray-600 transition-all"
                            onClick={onProfileClick}
                        >
                            <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                            <AvatarFallback className="bg-gray-800 text-white">
                                <User className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </header>
    );
}
