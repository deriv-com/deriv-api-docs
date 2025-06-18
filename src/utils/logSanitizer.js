/**
 * Sanitize a log message to prevent log injection.
 * - Converts non-string inputs to strings.
 * - Replaces newlines and carriage returns with spaces.
 * - Escapes quotes and backslashes.
 * @param {any} message
 * @returns {string} sanitized message
 */
export function sanitizeLogMessage(message) {
  if (typeof message !== 'string') {
    message = String(message);
  }
  return message
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ');
}
