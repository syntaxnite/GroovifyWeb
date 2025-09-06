'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '@/context/ThemeContext';
import GroovifyLogo from './GroovifyLogo';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('spotify', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        return 'bg-white/90';
      case 'cream':
        return 'bg-[#f5f5dc]/90';
      default: // dark
        return 'bg-gray-800/50';
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

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center ${getBackgroundClass()} p-4`}>
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      
      <div className={`w-full max-w-md space-y-8 rounded-2xl ${getCardBgClass()} p-8 backdrop-blur-sm`}>
        <div className="flex flex-col items-center text-center">
          <GroovifyLogo 
            width={240} 
            height={180} 
            className="mb-6"
          />
          <h1 className={`text-4xl font-bold ${getTextClass()}`}>Groovify</h1>
          <p className={`mt-2 ${getSubTextClass()}`}>Enhance your Spotify experience</p>
        </div>

        <div className="mt-8">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-full bg-spotify-green py-3 px-4 text-center font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? (
              <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Continue with Spotify
              </>
            )}
          </button>
        </div>

        <div className={`mt-6 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>By continuing, you agree to Groovify&apos;s Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
