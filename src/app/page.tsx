'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { DiscoverPage } from '@/components/DiscoverPage';
import { BooksPage } from '@/components/BooksPage';
import { FilmsPage } from '@/components/FilmsPage';
import { ShowsPage } from '@/components/ShowsPage';
import { UserProfile } from '@/components/UserProfile';
import { NavigationTab } from '@/lib/types';

export default function Home() {
    const [activeTab, setActiveTab] = useState<NavigationTab>('analytics');
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfile, setShowProfile] = useState(false);

    const getSearchPlaceholder = () => {
        switch (activeTab) {
            case 'books':
                return 'Search books...';
            case 'films':
                return 'Search films...';
            case 'shows':
                return 'Search shows...';
            case 'discover':
                return 'Search for users...';
            default:
                return 'Search...';
        }
    };

    const handleTabChange = (tab: NavigationTab) => {
        setActiveTab(tab);
        setShowProfile(false);
        setSearchQuery('');
    };

    const handleProfileView = () => {
        setShowProfile(true);
    };

    const renderContent = () => {
        if (showProfile) {
            return <UserProfile />;
        }

        switch (activeTab) {
            case 'analytics':
                return <AnalyticsDashboard />;
            case 'discover':
                return <DiscoverPage />;
            case 'books':
                return <BooksPage searchQuery={searchQuery} />;
            case 'films':
                return <FilmsPage searchQuery={searchQuery} />;
            case 'shows':
                return <ShowsPage searchQuery={searchQuery} />;
            default:
                return <AnalyticsDashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <Navigation
                activeTab={showProfile ? 'analytics' : activeTab}
                onTabChange={handleTabChange}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder={getSearchPlaceholder()}
                onProfileClick={handleProfileView}
            />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
            </main>
        </div>
    );
}
