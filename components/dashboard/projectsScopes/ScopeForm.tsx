"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export function ScopeForm({ scope }: { scope?: { id: string; name: string } }) {
	const router = useRouter();
	const [name, setName] = useState(scope?.name || "");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await fetch("/api/scopes", {
				method: scope ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, id: scope?.id }),
				cache: "no-store",
			});

			if (!response.ok) throw new Error("Failed to save scope");

			router.push("/dashboard/projects/scopes");
			router.refresh();
		} catch (error) {
			console.error("Error saving scope:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 max-w-md">
			<div>
				<label className="block text-sm font-medium mb-2">Scope Name</label>
				<Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter scope name" required />
			</div>
			<Button type="submit" disabled={isLoading}>
				{isLoading ? "Saving..." : scope ? "Update Scope" : "Create Scope"}
			</Button>
		</form>
	);
}
