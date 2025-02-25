// hooks/useTypes.ts
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ProjectType } from "../types/dashboard";

interface UseTypesState {
	data: ProjectType[];
	loading: boolean;
	error: Error | null;
}

interface TypeMutationOptions {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}

const useTypes = () => {
	const [state, setState] = useState<UseTypesState>({
		data: [],
		loading: false,
		error: null,
	});

	const fetchTypes = useCallback(async () => {
		setState(prev => ({ ...prev, loading: true, error: null }));
		try {
			const response = await fetch("/api/types", {
				cache: "no-store",
			});
			if (!response.ok) {
				throw new Error(`Failed to fetch types: ${response.statusText}`);
			}
			const data = await response.json();
			setState({ data, loading: false, error: null });
			return data;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "An error occurred";
			setState(prev => ({ ...prev, error: new Error(errorMessage), loading: false }));
			toast.error(errorMessage);
			throw error;
		}
	}, []);

	// Add new type
	const addType = useCallback(
		async (type: Omit<ProjectType, "id" | "createdAt" | "updatedAt">, options?: TypeMutationOptions) => {
			setState(prev => ({ ...prev, loading: true, error: null }));
			try {
				const response = await fetch("/api/types", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(type),
					cache: "no-store",
				});

				if (!response.ok) {
					throw new Error(`Failed to add type: ${response.statusText}`);
				}

				const newType = await response.json();
				setState(prev => ({
					...prev,
					data: [...prev.data, newType],
					loading: false,
				}));

				toast.success("Type added successfully");
				options?.onSuccess?.();
				return newType;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "An error occurred";
				setState(prev => ({ ...prev, error: new Error(errorMessage), loading: false }));
				toast.error(errorMessage);
				options?.onError?.(new Error(errorMessage));
				throw error;
			}
		},
		[]
	);

	// Update existing type
	const updateType = useCallback(async (id: string, updates: Partial<ProjectType>, options?: TypeMutationOptions) => {
		setState(prev => ({ ...prev, loading: true, error: null }));
		try {
			const response = await fetch(`/api/types/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updates),
				cache: "no-store",
			});

			if (!response.ok) {
				throw new Error(`Failed to update type: ${response.statusText}`);
			}

			const updatedType = await response.json();
			setState(prev => ({
				...prev,
				data: prev.data.map(type => (type.id === id ? { ...type, ...updatedType } : type)),
				loading: false,
			}));

			toast.success("Type updated successfully");
			options?.onSuccess?.();
			return updatedType;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "An error occurred";
			setState(prev => ({ ...prev, error: new Error(errorMessage), loading: false }));
			toast.error(errorMessage);
			options?.onError?.(new Error(errorMessage));
			throw error;
		}
	}, []);

	// Delete type
	const deleteType = useCallback(async (id: string, options?: TypeMutationOptions) => {
		setState(prev => ({ ...prev, loading: true, error: null }));
		try {
			const response = await fetch(`/api/types/${id}`, {
				method: "DELETE",
				cache: "no-store",
			});

			if (!response.ok) {
				throw new Error(`Failed to delete type: ${response.statusText}`);
			}

			setState(prev => ({
				...prev,
				data: prev.data.filter(type => type.id !== id),
				loading: false,
			}));

			toast.success("Type deleted successfully");
			options?.onSuccess?.();
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "An error occurred";
			setState(prev => ({ ...prev, error: new Error(errorMessage), loading: false }));
			toast.error(errorMessage);
			options?.onError?.(new Error(errorMessage));
			throw error;
		}
	}, []);

	useEffect(() => {
		fetchTypes();
	}, [fetchTypes]);

	return {
		...state,
		fetchTypes,
		addType,
		updateType,
		deleteType,
		// Helper methods
		refresh: fetchTypes,
		clearError: () => setState(prev => ({ ...prev, error: null })),
		reset: () => setState({ data: [], loading: false, error: null }),
	};
};

export default useTypes;
