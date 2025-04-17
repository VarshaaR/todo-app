import dayjs, { Dayjs } from "dayjs";

/**
 * Converts a date string to epoch milliseconds.
 * @param dateStr - A valid date string.
 * @returns The epoch time in milliseconds.
 */
export function toEpoch(dateStr: Dayjs | string): number {
  return dayjs(dateStr).valueOf();
}

/**
 * Formats an epoch time into a readable date string like "Saturday, 19 Apr 2025".
 * @param epoch - The epoch time in milliseconds.
 * @returns A formatted date string.
 */
export function formatDate(epoch: number): string {
  return dayjs(epoch).format("dddd, DD MMM YYYY");
}
