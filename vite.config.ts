import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "web-storage-ts",
      fileName: "web-storage-ts",
      formats: ["es", "umd"],
    },
  },
});
