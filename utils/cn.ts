/**
 * Class Name Utility
 * Combines multiple class names and filters out falsy values
 */

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
