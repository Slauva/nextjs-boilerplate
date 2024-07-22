"use client";

import { useLocalStorage, useSessionStorage } from "usehooks-ts";

export const TOKEN_KEY = "token";

/**
 * Hook to manage the authentication token in the storages.
 * It can use both local and session storage.
 *
 * You should not use the token or hasToken during hydration.
 */
export const useAuthToken = () => {
  const [localToken, setLocalToken] = useLocalStorage<string | null>(
    TOKEN_KEY,
    null,
  );
  const [sessionToken, setSessionToken] = useSessionStorage<string | null>(
    TOKEN_KEY,
    null,
  );
  return {
    token: localToken || sessionToken,
    hasToken: !!localToken || !!sessionToken,
    setToken: (token: string | null, remember: boolean) => {
      if (remember) {
        setLocalToken(token);
      } else {
        setSessionToken(token);
      }
    },
  };
};

/**
 * Function to get the authentication token from the storages.
 * It can use both local and session storage.
 *
 * You should use this only in non-React context.
 */
export const getAuthToken = () => {
  if (
    typeof window === "undefined" ||
    !window.localStorage ||
    !window.sessionStorage
  ) {
    return null;
  }
  // Read the token from the storages in non-React context
  const localToken = localStorage.getItem(TOKEN_KEY);
  if (localToken) {
    // It is a JSON string, so we need to remove the quotes
    return localToken.substring(1, localToken.length - 1);
  }
  const sessionToken = sessionStorage.getItem(TOKEN_KEY);
  if (sessionToken) {
    // It is a JSON string, so we need to remove the quotes
    return sessionToken.substring(1, sessionToken.length - 1);
  }
  return sessionToken;
};

/**
 * Function to reset the authentication token in the storages.
 * It clears both local and session storage.
 *
 * The token should be reset on auth error (check axios.ts and socket/provider.ts).
 * You can call this function to sign out the user.
 */
export const resetAuthToken = () => {
  if (
    typeof window === "undefined" ||
    !window.localStorage ||
    !window.sessionStorage
  ) {
    return;
  }
  // Remove the token from storages
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  // Trigger a storage event to notify usehooks-ts about the change
  window.dispatchEvent(new StorageEvent("local-storage", { key: TOKEN_KEY }));
  window.dispatchEvent(new StorageEvent("session-storage", { key: TOKEN_KEY }));
};
