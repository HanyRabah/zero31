// utils/urlParamHandler.ts
import { ProjectType } from "@prisma/client";

/**
 * Decodes and normalizes a URL parameter that might contain special characters
 * @param urlParam - The possibly encoded URL parameter
 * @returns The decoded and normalized parameter
 */
export function decodeUrlParam(urlParam: string): string {
    if (!urlParam) return '';
    
    try {
      // Attempt to decode the URL parameter in case it contains encoded characters
      return decodeURIComponent(urlParam);
    } catch (error) {
      // If decoding fails (e.g., invalid encoding), return the original parameter
      console.error('Error decoding URL parameter:', error);
      return urlParam;
    }
  }
  
  /**
   * Normalizes a type name from URL for database queries
   * Handles special characters and URL encoding
   * 
   * @param urlTypeName - The possibly encoded type name from URL
   * @returns The normalized type name for database queries
   */
  export function normalizeCategoryType(urlTypeName: ProjectType['name']): string {
    if (!urlTypeName) return '';
    
    // First decode the URL parameter
    const decodedTypeName = decodeUrlParam(urlTypeName);
    
    // If the type name contains spaces but not dashes, it might be a display name
    // Convert spaces to dashes and lowercase everything
    if (decodedTypeName.includes(' ') && !decodedTypeName.includes('-')) {
      return decodedTypeName.toLowerCase().replace(/\s+/g, '-');
    }
    
    // Otherwise, assume it's already in the correct format for the database
    return decodedTypeName.toLowerCase();
  }
  
  /**
   * Formats a type name from URL for display
   * Handles special characters and URL encoding
   * 
   * @param urlTypeName - The possibly encoded type name from URL
   * @returns The formatted type name for display
   */
  export function formatTypeNameFromUrl(urlTypeName: string): string {
    if (!urlTypeName) return '';
    
    // First decode the URL parameter
    const decodedTypeName = decodeUrlParam(urlTypeName);
    
    // Handle special cases like FF&E
    const specialCases: Record<string, string> = {
      'ff&e': 'FF&E',
      'ff&e-services': 'FF&E Services',
    };
    
    const lowerCaseName = decodedTypeName.toLowerCase();
    if (specialCases[lowerCaseName]) {
      return specialCases[lowerCaseName];
    }
    
    // Replace dashes with spaces and split into words
    const words = decodedTypeName.replace(/-/g, ' ').split(' ');
    
    // Capitalize each word
    return words
      .map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
      .join(' ');
  }