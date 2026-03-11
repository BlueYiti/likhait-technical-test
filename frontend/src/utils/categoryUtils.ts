/**
 * Default emoji for categories
 */
export const DEFAULT_CATEGORY_EMOJI = "📦";

/**
 * Fallback emojis based on common category names
 */
export const CATEGORY_EMOJI_MAP: Record<string, string> = {
  Food: "🍔",
  Transport: "🚗",
  Entertainment: "🎮",
  Utilities: "💡",
  Shopping: "🛍️",
  Health: "🏥",
  Travel: "✈️",
  Housing: "🏠",
  Education: "📚",
};

/**
 * Get emoji for a category
 */
export function getCategoryEmoji(name: string, emoji?: string): string {
  if (emoji) return emoji;

  return CATEGORY_EMOJI_MAP[name] || DEFAULT_CATEGORY_EMOJI;
}

/**
 * Sort categories alphabetically
 */
export function sortCategoriesByName<T extends { name: string }>(
  categories: T[],
): T[] {
  return [...categories].sort((a, b) => a.name.localeCompare(b.name));
}