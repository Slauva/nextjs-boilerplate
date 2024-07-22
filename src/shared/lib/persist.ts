import * as cookies from "cookies-next";
import { proxy, subscribe } from "valtio";

export interface Persist {
  prefix: string;
  get<T extends any>(key: string): T | null;
  remove(key: string): void;
  set<T extends any>(key: string, value: T): void;
}

export class LocalPersist implements Persist {
  prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  get<T extends any>(key: string): T | null {
    if (typeof window === "undefined") return null;

    const value = localStorage.getItem(`${this.prefix}-${key}`);
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch (e) {
      return value as unknown as T;
    }
  }
  set<T extends any>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(`${this.prefix}-${key}`, JSON.stringify(value));
  }
  remove(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(`${this.prefix}-${key}`);
  }
}

export class SessionPersist implements Persist {
  prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  get<T extends any>(key: string): T | null {
    if (typeof window === "undefined") return null;

    const value = sessionStorage.getItem(`${this.prefix}-${key}`);
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch (e) {
      return value as unknown as T;
    }
  }
  set<T extends any>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(`${this.prefix}-${key}`, JSON.stringify(value));
  }
  remove(key: string): void {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(`${this.prefix}-${key}`);
  }
}

export class CookiePersist implements Persist {
  prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  get<T extends any>(key: string): T | null {
    if (typeof window === "undefined") return null;

    const value = cookies.getCookie(`${this.prefix}-${key}`);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch (e) {
      return value as unknown as T;
    }
  }
  set<T extends any>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    cookies.setCookie(`${this.prefix}-${key}`, value);
  }
  remove(key: string): void {
    if (typeof window === "undefined") return;
    cookies.deleteCookie(`${this.prefix}-${key}`);
  }
}

type PersistOptions = {
  key: string;
  storage: "local" | "session" | "cookie";
};

export function withProxyPersist<T extends object>(
  store: T,
  options?: Partial<PersistOptions>,
) {
  // Set storage
  let storage: Persist = {} as Persist;

  switch (options?.storage) {
    case "local":
      storage = new LocalPersist("persist");
      break;
    case "session":
      storage = new SessionPersist("persist");
      break;
    case "cookie":
      storage = new CookiePersist("persist");
      break;
    default:
      storage = new LocalPersist("persist");
      break;
  }

  const prevStore = storage.get<T>(options?.key ?? "store");

  const proxyObject = proxy({ ...store, ...prevStore });

  subscribe(proxyObject, () => {
    storage.set(options?.key ?? "store", proxyObject);
  });

  return proxyObject;
}
