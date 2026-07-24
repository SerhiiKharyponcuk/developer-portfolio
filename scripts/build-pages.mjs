import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build, createServer } from "vite";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configFile = resolve(projectRoot, "vite.pages.config.ts");
const outputFile = resolve(projectRoot, "dist-pages", "index.html");

await build({ configFile });

const server = await createServer({
  configFile,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { render } = await server.ssrLoadModule("/entry-server.tsx");
  const appHtml = render();
  const template = await readFile(outputFile, "utf8");
  const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  await writeFile(outputFile, html);
} finally {
  await server.close();
}
