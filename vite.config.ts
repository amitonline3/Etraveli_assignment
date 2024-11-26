import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    ...configDefaults,
    globals: true, // To use global variables like `describe`, `it`
    environment: "jsdom", // To set the test environment to jsdom for DOM testing
    setupFiles: "./src/setupTests.ts", // Setup file for testing library configuration
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
