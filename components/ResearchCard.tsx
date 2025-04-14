'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Research {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  paperUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  status: 'ongoing' | 'completed' | 'published';
}

interface ResearchCardProps {
  research: Research;
}

export function ResearchCard({ research }: ResearchCardProps) {
  return (
    <Link href={`/research/${research._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      >
        <div className="relative h-48">
          <Image
            src={research.imageUrl || '/placeholder.jpg'}
            alt={research.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold">{research.title}</h3>
            <span className={`px-2 py-1 rounded text-sm ${
              research.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              research.status === 'ongoing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {research.status}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {research.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {research.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
              >
                {tech}
              </span>
            ))}
            {research.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">
                +{research.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 