// hooks/useProjects.ts
import useSWR from "swr";
import { Project } from "../types/dashboard";

const fetcher = async (url: string) => {
	const response = await fetch(url, {
		cache: "no-store",
		// Add next config with tags for revalidation
		next: {
			tags: ["projects-list"],
		},
	});
	if (!response.ok) {
		throw new Error("An error occurred while fetching the data.");
	}
	return response.json();
};

export default function useProjects(type?: string) {
	const { data, error, mutate, isLoading } = useSWR<Project[]>(
		type ? `/api/projects?type=${type}` : "/api/projects",
		fetcher,
		{
			revalidateOnFocus: false,
			fallbackData: [],
		}
	);

	const updateProject = async (projectId: string, data: Project) => {
		try {
			const response = await fetch(`/api/projects/${projectId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...data,
					id: undefined,
					scopes: data.scopes || [],
					sections: (data.sections || []).map(section => ({
						...section,
						images: section.images || [],
					})),
				}),
				cache: "no-store",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to update project");
			}

			const updatedProject = await response.json();

			// Explicitly revalidate the specific project's data
			await fetch(`/api/revalidate?path=/projects/${projectId}`);

			// Refresh all projects in SWR cache
			await mutate();

			return updatedProject;
		} catch (error: any) {
			console.error("Update project error:", error);
			throw error;
		}
	};

	const addProject = async (projectData: Project) => {
		try {
			const response = await fetch("/api/projects", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(projectData),
				cache: "no-store",
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to create project");
			}

			const newProject = await response.json();

			// Revalidate the projects list
			await fetch(`/api/revalidate?path=/projects`);

			// Refresh data in SWR cache
			await mutate();

			return newProject;
		} catch (error) {
			console.error("Add project error:", error);
			throw error;
		}
	};

	const deleteProject = async (projectId: string) => {
		try {
			const response = await fetch(`/api/projects/${projectId}`, {
				method: "DELETE",
				cache: "no-store",
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to delete project");
			}

			// Revalidate projects list
			await fetch(`/api/revalidate?path=/projects`);

			// Refresh data in SWR cache
			await mutate();

			return true;
		} catch (error) {
			console.error("Delete project error:", error);
			throw error;
		}
	};

	return {
		data: data || [],
		loading: isLoading,
		error,
		addProject,
		updateProject,
		deleteProject,
	};
}
