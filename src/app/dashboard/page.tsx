'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useTheme } from '@/context/ThemeContext';
import GroovifyLogo from '@/components/GroovifyLogo';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Define background and text colors based on theme
  const getBackgroundClass = () => {
    switch (theme) {
      case 'light':
        return 'bg-gradient-to-b from-gray-100 to-gray-200';
      case 'cream':
        return 'bg-gradient-to-b from-[#f5f5dc] to-[#e8e8c8]';
      default: // dark
        return 'bg-gradient-to-b from-spotify-black to-gray-900';
    }
  };

  const getCardBgClass = () => {
    switch (theme) {
      case 'light':
        return 'bg-white';
      case 'cream':
        return 'bg-[#f0f0d8]';
      default: // dark
        return 'bg-gray-800';
    }
  };

  const getTextClass = () => {
    switch (theme) {
      case 'light':
        return 'text-gray-800';
      case 'cream':
        return 'text-gray-800';
      default: // dark
        return 'text-white';
    }
  };

  const getSubTextClass = () => {
    switch (theme) {
      case 'light':
        return 'text-gray-600';
      case 'cream':
        return 'text-gray-700';
      default: // dark
        return 'text-gray-300';
    }
  };

  const getButtonClass = () => {
    switch (theme) {
      case 'light':
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      case 'cream':
        return 'bg-[#e0e0c0] text-gray-800 hover:bg-[#d0d0b0]';
      default: // dark
        return 'bg-gray-700 text-white hover:bg-gray-600';
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-spotify-green border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getBackgroundClass()} p-6`}>
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <GroovifyLogo 
              width={70} 
              height={50} 
              className="mr-3"
            />
            <h1 className={`text-3xl font-bold ${getTextClass()}`}>Groovify Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <button
              onClick={() => router.push('/api/auth/signout')}
              className={`rounded-full ${getButtonClass()} px-4 py-2 text-sm font-medium`}
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className={`rounded-lg ${getCardBgClass()} p-6 shadow-lg`}>
          <h2 className={`mb-4 text-xl font-semibold ${getTextClass()}`}>Welcome to Groovify!</h2>
          <p className={getSubTextClass()}>
            You've successfully authenticated with Spotify. This is your dashboard where you'll see your personalized music experience.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className={`rounded-lg ${getCardBgClass()} p-6 shadow-lg`}>
            <h3 className={`mb-3 text-lg font-medium ${getTextClass()}`}>Your Playlists</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Connect to see your Spotify playlists here</p>
          </div>
          <div className={`rounded-lg ${getCardBgClass()} p-6 shadow-lg`}>
            <h3 className={`mb-3 text-lg font-medium ${getTextClass()}`}>Recently Played</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>See your recently played tracks</p>
          </div>
          <div className={`rounded-lg ${getCardBgClass()} p-6 shadow-lg`}>
            <h3 className={`mb-3 text-lg font-medium ${getTextClass()}`}>Top Artists</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Discover your most listened artists</p>
          </div>
        </div>
      </div>
    </div>
  );
}
