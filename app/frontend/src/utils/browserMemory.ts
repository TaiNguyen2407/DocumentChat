/*This function is created for fetching data from local storage */
export function fetchFromBrowserMemory(key: string) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    throw Error("User Fetch error");
  }
}

/*This function is created for posting data from local storage */
export function saveToBrowserMemory(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    throw Error("User token save error");
  }
}

/*This function is created for removing data from local storage */
export function removeFromBrowserMemory(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    throw Error ("Error in user removal from local storage")
  }
  
}
