import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
// The cn function combines clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}