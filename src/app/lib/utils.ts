// src/lib/utils.ts

// Utility function for conditionally joining class names
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}
