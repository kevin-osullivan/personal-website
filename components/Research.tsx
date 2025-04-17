'use client';

import { useState, useEffect } from 'react';
import { ResearchCard } from './ResearchCard';
import Link from 'next/link';

interface Research {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  paperUrl?: string;
  githubUrl?: string;
  image?: string;
  status: 'ongoing' | 'completed' | 'published';
}

export function Research() {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const res = await fetch('/api/research');
        if (!res.ok) {
          throw new Error('Failed to fetch research');
        }
        const data = await res.json();
        setResearch(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResearch();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading research...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (research.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No Research Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          There are no research topics to display yet.
        </p>
        <Link
          href="/research/new"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Your First Research Topic
        </Link>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Research
        </h2>
        <Link
          href="/research/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add Research
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {research.map((item) => (
          <ResearchCard key={item._id} research={item} />
        ))}
      </div>
    </section>
  );
} 