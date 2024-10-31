import { Timestamp } from "firebase/firestore"; // Import Timestamp from Firestore

/**
 * Formats a Firestore Timestamp or JavaScript Date to a string in the format "Month Day, Year at hh:mm AM/PM".
 * @param timestamp - The Firestore Timestamp or JavaScript Date to format.
 * @returns A formatted date string.
 */
export function formatCreatedAt(timestamp: Timestamp | Date): string {
  // Convert Firestore Timestamp to JavaScript Date if necessary
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", // Full month name
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 12-hour format
  };

  // Format the date using Intl.DateTimeFormat
  return date.toLocaleString("en-US", options);
}
