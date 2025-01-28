// hooks/useUsers.ts
import { User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UseUsersState {
	data: User[];
	loading: boolean;
	error: Error | null;
}

interface UserMutationOptions {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}

const useUsers = () => {
	const [state, setState] = useState<UseUsersState>({
		data: [],
		loading: false,
		error: null,
	});

	const fetchUsers = useCallback(async () => {
		setState(prev => ({ ...prev, loading: true, error: null }));
		try {
			const response = await fetch("/api/users");
			if (!response.ok) {
				throw new Error(`Failed to fetch users: ${response.statusText}`);
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

	const addUser = useCallback(
		async (userData: Omit<User, "id" | "createdAt" | "updatedAt">, options?: UserMutationOptions) => {
			setState(prev => ({ ...prev, loading: true, error: null }));
			try {
				const response = await fetch("/api/users", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(userData),
				});

				if (!response.ok) {
					throw new Error(`Failed to add user: ${response.statusText}`);
				}

				const newUser = await response.json();
				setState(prev => ({
					...prev,
					data: [...prev.data, newUser],
					loading: false,
				}));

				toast.success("User added successfully");
				options?.onSuccess?.();
				return newUser;
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

	const updateUser = useCallback(async (id: string, updates: Partial<User>, options?: UserMutationOptions) => {
		setState(prev => ({ ...prev, loading: true, error: null }));
		try {
			const response = await fetch(`/api/users/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updates),
			});

			if (!response.ok) {
				throw new Error(`Failed to update user: ${response.statusText}`);
			}

			const updatedUser = await response.json();
			setState(prev => ({
				...prev,
				data: prev.data.map(user => (user.id === id ? { ...user, ...updatedUser } : user)),
				loading: false,
			}));

			toast.success("User updated successfully");
			options?.onSuccess?.();
			return updatedUser;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "An error occurred";
			setState(prev => ({ ...prev, error: new Error(errorMessage), loading: false }));
			toast.error(errorMessage);
			options?.onError?.(new Error(errorMessage));
			throw error;
		}
	}, []);

	const deleteUser = useCallback(async (id: string, options?: UserMutationOptions) => {
		setState(prev => ({ ...prev, loading: true, error: null }));
		try {
			const response = await fetch(`/api/users/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error(`Failed to delete user: ${response.statusText}`);
			}

			setState(prev => ({
				...prev,
				data: prev.data.filter(user => user.id !== id),
				loading: false,
			}));

			toast.success("User deleted successfully");
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
		fetchUsers();
	}, [fetchUsers]);

	return {
		...state,
		fetchUsers,
		addUser,
		updateUser,
		deleteUser,
		refresh: fetchUsers,
		clearError: () => setState(prev => ({ ...prev, error: null })),
		reset: () => setState({ data: [], loading: false, error: null }),
	};
};

export default useUsers;
