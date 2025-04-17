'use client';

import { useProfile } from '@/lib/hooks/useProfile';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-center py-8">Profile not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="animate-fade-in">
          <Image
            src={profile.avatar || '/placeholder.jpg'}
            alt={profile.name}
            width={150}
            height={150}
            className="rounded-full mx-auto mb-8"
          />
        </div>
        <h1 className="animate-fade-in-up text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          {profile.name}
        </h1>
        <p className="animate-fade-in-up delay-200 mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          {profile.bio || 'Welcome to my portfolio'}
        </p>
        <div className="animate-fade-in-up delay-400 mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              GitHub
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 