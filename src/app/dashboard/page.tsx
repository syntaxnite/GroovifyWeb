'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useTheme } from '@/context/ThemeContext';
import GroovifyLogo from '@/components/GroovifyLogo';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // Check if URL contains devMode parameter
    const searchParams = new URLSearchParams(window.location.search);
    const devMode = searchParams.get('devMode') === 'true';
    setIsDevMode(devMode);
    
    // Only redirect if not in dev mode and not authenticated
    if (status === 'unauthenticated' && !devMode) {
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
    <div className={`min-h-screen flex flex-col ${getBackgroundClass()}`}>
      {/* Main Content */}
      <div className="flex-grow p-6">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <GroovifyLogo 
                width={70} 
                height={50} 
                className="mr-3"
              />
              <h1 className={`text-3xl font-bold ${getTextClass()}`}>Groovify Dashboard</h1>
              {isDevMode && (
                <span className="ml-3 rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white">
                  DEV MODE
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <button
                onClick={() => isDevMode ? router.push('/') : router.push('/api/auth/signout')}
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
      
      {/* Footer */}
      <footer className={`py-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <GroovifyLogo width={40} height={30} className="mr-2" />
              <span className={`text-sm font-medium ${getTextClass()}`}>Groovify</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex space-x-4 mb-4 md:mb-0 md:mr-8">
                <a href="#" className={`text-sm ${getSubTextClass()} hover:text-spotify-green`}>Privacy</a>
                <a href="#" className={`text-sm ${getSubTextClass()} hover:text-spotify-green`}>Terms</a>
                <a href="#" className={`text-sm ${getSubTextClass()} hover:text-spotify-green`}>Help</a>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" aria-label="Twitter">
                  <svg className={`w-5 h-5 ${getSubTextClass()} hover:text-spotify-green`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" aria-label="Discord">
                  <svg className={`w-5 h-5 ${getSubTextClass()} hover:text-spotify-green`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg className={`w-5 h-5 ${getSubTextClass()} hover:text-spotify-green`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className={`mt-6 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>© {new Date().getFullYear()} Groovify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
