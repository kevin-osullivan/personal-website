'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

async function getResearch(id: string): Promise<Research | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/research/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching research:', error);
    return null;
  }
}

export default function ResearchDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [research, setResearch] = useState<Research | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await fetch(`/api/research/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch research topic');
        }
        const data = await response.json();
        setResearch(data);
      } catch (error) {
        console.error('Error fetching research topic:', error);
      }
    };

    fetchResearch();
  }, [params.id]);

  const handleUpdate = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/research/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update research topic');
      }

      setResearch(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating research topic:', error);
      alert('Failed to update research topic. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this research topic?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/research/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete research topic');
      }

      router.push('/research');
    } catch (error) {
      console.error('Error deleting research topic:', error);
      alert('Failed to delete research topic. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!research) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{research.title}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'Cancel Edit' : 'Update Entry'}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Entry'}
          </button>
        </div>
      </div>

      {isEditing ? (
        <ResearchForm
          onSubmit={handleUpdate}
          isSubmitting={isSubmitting}
          initialData={research}
        />
      ) : (
        <div className="space-y-6">
          {research.imageUrl && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={research.imageUrl}
                alt={research.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg">{research.description}</p>
          </div>

          {research.technologies && research.technologies.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {research.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {research.paperUrl && (
              <Link
                href={research.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View Paper
              </Link>
            )}
            {research.githubUrl && (
              <Link
                href={research.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View on GitHub
              </Link>
            )}
          </div>

          {research.status && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Status: {research.status}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ResearchForm({
  onSubmit,
  isSubmitting,
  initialData,
}: {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  initialData?: any;
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    technologies: initialData?.technologies?.join(', ') || '',
    status: initialData?.status || 'In Progress',
    paperUrl: initialData?.paperUrl || '',
    githubUrl: initialData?.githubUrl || '',
    imageUrl: initialData?.imageUrl || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const researchData = {
      ...formData,
      technologies: formData.technologies.split(',').map((tech) => tech.trim()),
    };
    onSubmit(researchData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="technologies"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Technologies (comma-separated)
        </label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="paperUrl"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Paper URL
        </label>
        <input
          type="url"
          id="paperUrl"
          name="paperUrl"
          value={formData.paperUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="githubUrl"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          GitHub URL
        </label>
        <input
          type="url"
          id="githubUrl"
          name="githubUrl"
          value={formData.githubUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Updating...' : 'Update Research Topic'}
        </button>
      </div>
    </form>
  );
} 