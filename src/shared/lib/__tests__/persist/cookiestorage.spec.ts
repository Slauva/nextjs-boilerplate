import "jest-localstorage-mock";
import { CookiePersist } from "../../persist";

Object.defineProperty(window.document, "cookie", {
  writable: true,
});

describe("CookieStorage", () => {
  const PREFIX = "persist";
  const storage = new CookiePersist(PREFIX);

  describe("Set and Get items", () => {
    beforeEach(() => {
      // and reset all mocks
      jest.clearAllMocks();
    });

    test("Set/Get number value", () => {
      const KEY = "number";
      const VALUE = 1;

      storage.set(KEY, VALUE);
      expect(storage.get<typeof VALUE>(KEY)).toBe(VALUE);
    });

    test("Set/Get string value", () => {
      const KEY = "string";
      const VALUE = "hello world";

      storage.set(KEY, VALUE);
      expect(storage.get<typeof VALUE>(KEY)).toBe(VALUE);
    });

    test("Set/Get boolean value", () => {
      const KEY = "boolean";
      const VALUE = true;

      storage.set(KEY, VALUE);
      expect(storage.get<typeof VALUE>(KEY)).toBe(VALUE);
    });

    test("Set/Get object value", () => {
      const KEY = "boolean";
      const VALUE = {
        name: "Alice",
        age: 18,
      };

      storage.set(KEY, VALUE);
      expect(storage.get<typeof VALUE>(KEY)).toEqual(VALUE);
    });
    test("Get does not exist value", () => {
      const KEY = "string";
      const VALUE = "hello world";
      expect(storage.get<typeof VALUE>(KEY)).toBe(null);
    });
  });
  describe("Remove items", () => {
    beforeEach(() => {
      // and reset all mocks
      jest.clearAllMocks();
    });

    test("Remove exist value", () => {
      const KEY = "number";
      const VALUE = 1;

      storage.set(KEY, VALUE);
      expect(storage.get<typeof VALUE>(KEY)).toBe(VALUE);
      storage.remove(KEY);
      expect(storage.get<typeof VALUE>(KEY)).toBe(null);
    });

    test("Remove does not exist value", () => {
      const KEY = "number";
      const VALUE = 1;

      storage.remove(KEY);
      expect(storage.get<typeof VALUE>(KEY)).toBe(null);
    });
  });
});
