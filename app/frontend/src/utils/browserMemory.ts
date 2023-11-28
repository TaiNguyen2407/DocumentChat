export function fetchFromBrowserMemory(key: string) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    throw Error("User Fetch error");
  }
}

export function saveToBrowserMemory(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    throw Error("User token save error");
  }
}

export function removeFromBrowserMemory(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    throw Error ("Error in user removal from local storage")
  }
  
}
