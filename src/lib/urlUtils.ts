export function builCallbackUrl(path: string, callbackUrl?: string | null) {
  if (!callbackUrl) return path;
  return `${path}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}
