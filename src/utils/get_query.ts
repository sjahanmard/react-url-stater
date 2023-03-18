export function getQuery(queryName: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search)?.get(queryName);
}
