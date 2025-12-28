/**
 * Format date string to human-readable format
 * Handles both "Month DD, YYYY" and "YYYY-MM-DD" formats
 */
export function formatDate(dateString: string): string {
  // If already in readable format (e.g., "June 26, 2025"), return as is
  if (dateString.match(/^[A-Za-z]+\s+\d{1,2},\s+\d{4}$/)) {
    return dateString;
  }

  // If in ISO format (YYYY-MM-DD), convert to readable format
  try {
    const date = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone shift
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString; // Return original if parsing fails
  }
}
