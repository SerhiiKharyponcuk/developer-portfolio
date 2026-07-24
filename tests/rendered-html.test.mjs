import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Serhii's production portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Serhii Kharyponchuk/);
  assert.match(html, /Frontend &amp; Full Stack JavaScript Developer/);
  assert.match(html, /I build complete web applications/);
  assert.match(html, /Waves Arcade/);
  assert.match(html, /secure server-side score validation/);
  assert.match(html, /Registration &amp; authentication/);
  assert.match(html, /Cloudflare Turnstile/);
  assert.match(html, /github\.com\/SerhiiKharyponcuk\/waves-arcade/);
  assert.match(html, /waves-arcade\.vercel\.app/);
  assert.match(html, /waves-login\.webp/);
  assert.match(html, /waves-gameplay\.webp/);
  assert.match(html, /Undying Metro Shop/);
  assert.match(html, /Yacht Adventures/);
  assert.match(html, /Britlex/);
  assert.match(html, /IP Information Website/);
  assert.match(html, /undying-metro-shop\.webp/);
  assert.match(html, /ip-information\.webp/);
  assert.match(html, /yacht-adventures\.webp/);
  assert.match(html, /britlex\.webp/);
  assert.match(html, /serhiikharyponcuk\.github\.io\/undying-metro-shop/);
  assert.match(html, /serhiikharyponcuk\.github\.io\/yacht-adventures-team-project/);
  assert.match(html, /serhiikharyponcuk\.github\.io\/britlex-team-project/);
  assert.match(html, /github\.com\/SerhiiKharyponcuk/);
  assert.match(html, /kharyponchuksergej@gmail\.com/);
  assert.match(html, /mailto:kharyponchuksergej@gmail\.com/);
  assert.match(html, /Frontend Development Certificate/);
  assert.match(html, /GoITeens Academy/);
  assert.match(html, /December 2025/);
  assert.match(html, /frontend-development-goiteens\.webp/);
  assert.match(html, /frontend-development-goiteens-english\.webp/);
  assert.match(html, /Official certificate/);
  assert.match(html, /English edition/);
  assert.match(html, /Ukrainian original/);
  assert.match(html, /application\/ld\+json/);
  const legacyName = ["Al", "ex M", "organ"].join("");
  assert.doesNotMatch(html, new RegExp(`${legacyName}|seven years|7 years`, "i"));
  const placeholderEmail = ["your.email", "example.com"].join("@");
  const unavailableProfile = ["Link", "edIn"].join("");
  const removedAboutCta = ["build something", "useful"].join(" ");
  assert.doesNotMatch(html, new RegExp(`${placeholderEmail}|${unavailableProfile}|${removedAboutCta}`, "i"));
});
