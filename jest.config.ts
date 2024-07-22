/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  clearMocks: false,
  resetMocks: false,
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  setupFiles: ["jest-localstorage-mock"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.[jt]s?(x)",
    "<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)",
  ],
  transform: {
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "babel-jest",
    "^.+\\.[tj]sx?$": "babel-jest",
  },
};

export default createJestConfig(config);
