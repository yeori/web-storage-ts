import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "ts-web-storage",
      fileName: "ts-web-storage",
      formats: ["es", "umd"],
    },
  },
  plugins: [dts({ outDir: "dist", insertTypesEntry: false })],
});
