'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [research, setResearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, researchRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/research'),
        ]);

        if (projectsRes.ok && researchRes.ok) {
          const projectsData = await projectsRes.json();
          const researchData = await researchRes.json();
          setProjects(projectsData);
          setResearch(researchData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/profile"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Manage Profile
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <Link
              href="/projects/new"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Add Project
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <ul className="space-y-4">
              {projects.map((project: any) => (
                <li key={project._id} className="flex justify-between items-center">
                  <span>{project.title}</span>
                  <Link
                    href={`/projects/${project._id}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Research</h2>
            <Link
              href="/research/new"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Add Research
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <ul className="space-y-4">
              {research.map((item: any) => (
                <li key={item._id} className="flex justify-between items-center">
                  <span>{item.title}</span>
                  <Link
                    href={`/research/${item._id}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 