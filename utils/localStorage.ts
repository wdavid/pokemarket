export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getFromStorage<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue) as T;
      } catch (e) {
        console.error("Error parsing localStorage value", e);
      }
    }
  }
  return null;
}

export function removeFromStorage(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

export function clearStorage(): void {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
}
