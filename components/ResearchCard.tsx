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
  image?: string;
  featured?: boolean;
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
        <div className="relative h-48 bg-white">
          <Image
            src={research.image || '/window.svg'}
            alt={research.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={research.featured}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/window.svg';
            }}
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold">{research.title}</h3>
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