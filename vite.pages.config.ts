import react from "@vitejs/plugin-react";
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const pagesRoot = resolve(projectRoot, "github-pages");
const outputRoot = resolve(projectRoot, "dist-pages");

function copyPagesMetadata(): Plugin {
  return {
    name: "copy-pages-metadata",
    async closeBundle() {
      await mkdir(outputRoot, { recursive: true });
      await Promise.all(
        ["robots.txt", "sitemap.xml", ".nojekyll"].map((file) =>
          copyFile(resolve(pagesRoot, file), resolve(outputRoot, file)),
        ),
      );
    },
  };
}

export default defineConfig({
  root: pagesRoot,
  base: "/developer-portfolio/",
  publicDir: resolve(projectRoot, "public"),
  plugins: [react(), copyPagesMetadata()],
  build: {
    outDir: outputRoot,
    emptyOutDir: true,
    sourcemap: false,
  },
});
