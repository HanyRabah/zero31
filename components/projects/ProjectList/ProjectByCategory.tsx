// components/ProjectsByType.tsx
'use client';

import { useState, useEffect } from 'react'; 
import useProjects from '@/hooks/useProjects';
import { Project, ProjectSection, ProjectsOnScopes, ProjectType } from '@prisma/client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectCard from '../ProjectCard';
import { CombinedProject } from '@/types/main';
 
const ProjectCardSkeleton = () => {
	return (
		<div className="animate-pulse">
			{/* Image Skeleton */}
			<div className="relative aspect-square mb-16 bg-gray-200 flex items-center justify-center">
				<div className="w-[90%] h-[90%] bg-gray-300" />
			</div>

			{/* Content Skeleton */}
			<div className="relative">
				{/* Type Skeleton */}
				<div className="h-3 w-24 bg-gray-200 mb-8" />

				{/* Title Skeleton */}
				<div className="h-4 w-48 bg-gray-200" />
			</div>
		</div>
	);
};

const EmptyProjects = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
			<h3 className="text-lg font-mono mb-2">No Projects Yet</h3>
			<Link
				href="/"
				className="inline-flex items-center px-4 py-2 border border-black text-sm font-mono hover:bg-black hover:text-white transition-colors">
				Return to home
			</Link>
		</div>
	);
};

export default function ProjectByCategory({ category }: {category: ProjectType['name']}) {
  const { getProjectsByTypeName } = useProjects();
  const [projects, setProjects] = useState<(CombinedProject)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjectsByTypeName(category);
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    return () => {
      setLoading(false);
      setProjects([]);
      setError(null);
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <section className="py-40 md:py-80 bg-white">
			<div className="container mx-auto px-24">
				{loading && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[...Array(3)].map((_, i) => (
							<ProjectCardSkeleton key={i} />
						))}
					</div>
				)}
				{!loading && !projects?.length && <EmptyProjects />}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-20 md:gap-y-80"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}>
					{projects.map((project, index) => (
						<ProjectCard key={project.id} project={project} isHorizontal={index % 2 === 0} />
					))}
				</motion.div>
			</div>
		</section>
  );
} 