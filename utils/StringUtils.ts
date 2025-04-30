// utils/stringUtils.js

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The input string
 * @returns {string} - String with first letter capitalized
 */
export function capitalizeFirstLetter(str: string) {
    if (!str || typeof str !== 'string' || str.length === 0) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  /**
   * Replaces all dashes with spaces in a string
   * @param {string} str - The input string
   * @returns {string} - String with dashes replaced by spaces
   */
  export function replaceDashWithSpace(str: string) {
    if (!str || typeof str !== 'string') return '';
    return str.replace(/-/g, ' ');
  }
  
  /**
   * Formats a string by replacing dashes with spaces and capitalizing
   * each word
   * @param {string} str - The input string
   * @returns {string} - Formatted string
   */
  export function formatString(str: string) {
    if (!str || typeof str !== 'string') return '';
    
    // Replace dashes with spaces
    const withSpaces = replaceDashWithSpace(str);
    
    // Capitalize each word
    return withSpaces
      .split(' ')
      .map(word => capitalizeFirstLetter(word))
      .join(' ');
  }

  export function formatCategory(typeName?: string) {
    if (!typeName || typeof typeName !== 'string') return '';
    
    // Replace spaces with dashes and split into words
    const words = typeName.replace(/ /g, '-').split(' ');
    
    // Capitalize each word
    return words
      .map(word => word.toLowerCase())
      .join('-');
  }
  
  /**
   * Checks if a string contains a dash
   * @param {string} str - The input string
   * @returns {boolean} - True if string contains a dash, false otherwise
   */
  export function containsDash(str: string) {
    if (!str || typeof str !== 'string') return false;
    return str.includes('-');
  }
  
  /**
   * Processes an array of strings, formatting those with dashes and
   * leaving others unchanged
   * @param {Array<string>} strings - Array of strings to process
   * @returns {Array<string>} - Processed array of strings
   */
  export function processStrings(strings: string[]) {
    if (!Array.isArray(strings)) return [];
    
    return strings.map(str => {
      if (containsDash(str)) {
        return formatString(str);
      }
      return str;
    });
  }
  
  /**
   * Formats a type name (for project types) by replacing dashes with spaces
   * and capitalizing each word
   * @param {string} typeName - The type name (e.g., "interior-design")
   * @returns {string} - Formatted type name (e.g., "Interior Design")
   */
  export function formatTypeName(typeName: string) {
    if (!typeName || typeof typeName !== 'string') return '';
    
    // Replace dashes with spaces and split into words
    const words = typeName.replace(/-/g, ' ').split(' ');
    
    // Capitalize each word
    return words
      .map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
      .join(' ');
  }