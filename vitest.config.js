import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "src",
    environment: "node",
    name: "Hermes",
    env: {},
  },
});