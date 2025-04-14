import Image from "next/image";
import Link from "next/link";

export default function Updates() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Latest Updates
        </h1>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Update Card */}
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <time className="text-sm text-gray-500 dark:text-gray-400">
                March 15, 2024
              </time>
              <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Project Update
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              New Project Launch
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Brief description of the update, what's new, and what to expect.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/updates/new-project-launch"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Read more →
              </Link>
              <a
                href="https://www.loom.com/share/your-video-id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Watch Update
              </a>
            </div>
          </article>

          {/* Add more update cards as needed */}
        </div>
      </div>
    </div>
  );
} 