export function isValidUrlProtocol(url: string): boolean {
  const validProtocols = ['http:', 'https:'] as const

  if (typeof url !== 'string') return false

  if (!url.trim()) return false

  return validProtocols.some(protocol => url.toLowerCase().startsWith(protocol))
}
