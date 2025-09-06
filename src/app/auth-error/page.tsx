'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function AuthErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { theme } = useTheme();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      switch (error) {
        case 'OAuthAccountNotLinked':
          setErrorMessage('This email is already associated with another account. Please sign in with the correct provider.');
          break;
        case 'OAuthSignin':
          setErrorMessage('Error in the OAuth sign-in process. Please try again.');
          break;
        case 'OAuthCallback':
          setErrorMessage('Error in the OAuth callback. This could be due to invalid credentials.');
          break;
        case 'AccessDenied':
          setErrorMessage('Access was denied to your account. Please check your permissions.');
          break;
        default:
          setErrorMessage(`Authentication error: ${error}`);
      }
    } else {
      setErrorMessage('An unknown authentication error occurred');
    }
  }, [searchParams]);

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

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center ${getBackgroundClass()} p-4`}>
      <div className="w-full max-w-md rounded-lg bg-opacity-10 bg-white p-8 shadow-xl backdrop-blur-sm">
        <h1 className={`mb-6 text-center text-2xl font-bold ${getTextClass()}`}>Authentication Error</h1>
        
        <div className="mb-6 rounded-md bg-red-500 bg-opacity-10 p-4">
          <p className="text-red-400">{errorMessage}</p>
        </div>
        
        <div className="flex justify-center">
          <Link
            href="/"
            className="rounded-full bg-spotify-green px-6 py-2 text-center font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
