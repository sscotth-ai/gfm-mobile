import { format, formatDistanceToNow } from "date-fns";

/**
 * Format a number as US-dollar currency.
 * Whole numbers omit decimals ("$1,234"), fractional keep two ("$1,234.56").
 */
export function formatCurrency(amount: number): string {
  return amount % 1 === 0
    ? amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    : amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
}

export function formatCompactCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  });
}

/**
 * "2 hours ago" style relative timestamp.
 */
export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

/**
 * Format a number with comma separators: 1234 → "1,234".
 */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Long-form date: "March 14, 2026".
 */
export function formatDate(dateString: string): string {
  return format(new Date(dateString), "MMMM d, yyyy");
}
