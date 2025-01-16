import { cn } from "@/lib/utils";
import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"flex h-[35px] w-full rounded-[32px] bg-transparent px-24 py-16 bg-blue-black",
				"border border-white text-white placeholder:text-white/40",
				"focus:outline-none focus:border-white/40 focus:ring-0",
				"text-[12px] transition-colors",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = "Input";

export { Input };
