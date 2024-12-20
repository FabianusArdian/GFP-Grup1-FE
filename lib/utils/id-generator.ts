
/**
 * ID Generator utility for database tables
 * Generates auto-incrementing IDs with prefixes
 */

// ID Prefix constants
export const ID_PREFIX = {
  USER: 'u',
  SELLER: 's', 
  ORDER: 'o',
  ORDER_ITEM: 'oi',
  ORDER_STATUS_HISTORY: 'sh',
  PAYMENT_METHOD: 'pm',
  PRODUCT: 'p',
  PRODUCT_IMAGE: 'pi',
  REVIEW: 'r',
  WISHLIST_ITEM: 'w'
} as const;

// Track last used ID for each prefix
const lastIds: Record<string, number> = {};

/**
 * Generate next ID for a given prefix
 */
export function generateId(prefix: keyof typeof ID_PREFIX): string {
  // Get or initialize counter for this prefix
  const currentId = (lastIds[prefix] || 0) + 1;
  lastIds[prefix] = currentId;
  
  return `${ID_PREFIX[prefix]}${currentId}`;
}

/**
 * Extract numeric part from ID
 */
export function getIdNumber(id: string): number {
  return parseInt(id.replace(/[^0-9]/g, ''));
}

/**
 * Get prefix from ID
 */
export function getIdPrefix(id: string): string {
  return id.replace(/[0-9]/g, '');
}

/**
 * Validate ID format
 */
export function isValidId(id: string, prefix: keyof typeof ID_PREFIX): boolean {
  const pattern = new RegExp(`^${ID_PREFIX[prefix]}\\d+$`);
  return pattern.test(id);
}
