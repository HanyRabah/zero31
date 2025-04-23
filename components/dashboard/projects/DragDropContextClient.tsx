// components/dashboard/DragDropContextClient.tsx
"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const DragDropContext = dynamic(() => import("react-beautiful-dnd").then(mod => mod.DragDropContext), { ssr: false });

export function DragDropContextClient({
	children,
	onDragEnd,
}: {
	children: ReactNode;
	onDragEnd: (result: any) => void;
}) {
	return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}
