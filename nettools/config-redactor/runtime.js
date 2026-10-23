// Strict address validation for the browser port. No DNS or network calls.
export function isIP(text) {
  if (typeof text !== 'string') return 0;
  const ipv4 = value => /^(?:0|[1-9]\d{0,2})(?:\.(?:0|[1-9]\d{0,2})){3}$/.test(value) &&
    value.split('.').every(part => Number(part) <= 255);
  if (ipv4(text)) return 4;
  let value = text;
  if (value.includes('%')) {
    const parts = value.split('%');
    if (parts.length !== 2 || !/^[0-9A-Za-z_.:-]+$/.test(parts[1])) return 0;
    value = parts[0];
  }
  if (!value.includes(':')) return 0;
  if (value.includes('.')) {
    const last = value.lastIndexOf(':');
    if (!ipv4(value.slice(last + 1))) return 0;
    value = value.slice(0, last + 1) + '0:0';
  }
  const halves = value.split('::');
  if (halves.length > 2) return 0;
  const groups = halves.flatMap(part => part ? part.split(':') : []);
  if (!groups.every(part => /^[0-9a-f]{1,4}$/i.test(part))) return 0;
  return (halves.length === 2 ? groups.length < 8 : groups.length === 8) ? 6 : 0;
}
