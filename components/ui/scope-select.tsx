// components/ui/scope-select.tsx
"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface Scope {
	id: string;
	name: string;
}

interface ScopesSelectProps {
	availableScopes: Scope[];
	selectedScopes: string[];
	onChange: (scopes: string[]) => void;
}

export function ScopesSelect({ availableScopes, selectedScopes, onChange }: ScopesSelectProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleScope = (scopeId: string) => {
		const newScopes = selectedScopes.includes(scopeId)
			? selectedScopes.filter(id => id !== scopeId)
			: [...selectedScopes, scopeId];
		onChange(newScopes);
	};

	return (
		<div className="relative">
			<div className="min-h-[38px] w-full border rounded-md p-1 flex flex-wrap gap-1">
				{selectedScopes.map(scopeId => {
					const scope = availableScopes.find(s => s.id === scopeId);
					return (
						<span
							key={scopeId}
							className="inline-flex items-center gap-1 bg-primary/10 text-primary rounded px-2 py-1 text-sm">
							{scope?.name}
							<button type="button" onClick={() => handleToggleScope(scopeId)} className="hover:text-primary/70">
								<X className="h-3 w-3" />
							</button>
						</span>
					);
				})}
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="text-sm text-gray-500 hover:text-gray-700 p-1">
					+ Add Scope
				</button>
			</div>
			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg p-2">
					{availableScopes.map(scope => (
						<div
							key={scope.id}
							className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
							onClick={() => {
								handleToggleScope(scope.id);
								setIsOpen(false);
							}}>
							<input type="checkbox" checked={selectedScopes.includes(scope.id)} onChange={() => {}} className="mr-2" />
							{scope.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
