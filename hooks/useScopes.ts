// hooks/useScopes.ts
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ProjectScope } from "../types/dashboard";

interface UseScopesState {
	data: ProjectScope[];
	loading: boolean;
	error: Error | null;
}

interface TypeMutationOptions {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}

const useScopes = () => {
	const [state, setState] = useState<UseScopesState>({
		data: [],
		loading: false,
		error: null,
	});

	const fetchScopes = useCallback(async () => {
		setState(prev => ({ ...prev, loading: true, error: null }));
		try {
			const response = await fetch("/api/scopes");
			if (!response.ok) {
				throw new Error(`Failed to fetch scopes: ${response.statusText}`);
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

	// Add new scope
	const addScope = useCallback(
		async (type: Omit<ProjectScope, "id" | "createdAt" | "updatedAt">, options?: TypeMutationOptions) => {
			setState(prev => ({ ...prev, loading: true, error: null }));
			try {
				const response = await fetch("/api/scopes", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(type),
				});

				if (!response.ok) {
					throw new Error(`Failed to add scope: ${response.statusText}`);
				}

				const newScope = await response.json();
				setState(prev => ({
					...prev,
					data: [...prev.data, newScope],
					loading: false,
				}));

				toast.success("Type added successfully");
				options?.onSuccess?.();
				return newScope;
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
	const updateScope = useCallback(async (id: string, updates: Partial<ProjectScope>, options?: TypeMutationOptions) => {
		setState(prev => ({ ...prev, loading: true, error: null }));
		try {
			const response = await fetch(`/api/scopes/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updates),
			});

			if (!response.ok) {
				throw new Error(`Failed to update scope: ${response.statusText}`);
			}

			const updatedScope = await response.json();
			setState(prev => ({
				...prev,
				data: prev.data.map(scope => (scope.id === id ? { ...scope, ...updatedScope } : scope)),
				loading: false,
			}));

			toast.success("Type updated successfully");
			options?.onSuccess?.();
			return updatedScope;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "An error occurred";
			setState(prev => ({ ...prev, error: new Error(errorMessage), loading: false }));
			toast.error(errorMessage);
			options?.onError?.(new Error(errorMessage));
			throw error;
		}
	}, []);

	// Delete type
	const deleteScope = useCallback(async (id: string, options?: TypeMutationOptions) => {
		setState(prev => ({ ...prev, loading: true, error: null }));
		try {
			const response = await fetch(`/api/scopes/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error(`Failed to delete scope: ${response.statusText}`);
			}

			setState(prev => ({
				...prev,
				data: prev.data.filter(scope => scope.id !== id),
				loading: false,
			}));

			toast.success("Scope deleted successfully");
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
		fetchScopes();
	}, [fetchScopes]);

	return {
		...state,
		fetchScopes,
		addScope,
		updateScope,
		deleteScope,
		// Helper methods
		refresh: fetchScopes,
		clearError: () => setState(prev => ({ ...prev, error: null })),
		reset: () => setState({ data: [], loading: false, error: null }),
	};
};

export default useScopes;
