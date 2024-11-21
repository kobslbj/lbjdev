import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from '@astrojs/partytown'
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), preact(),partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  }),],
  site: "https://kobslbj.dev",
  markdown: {
    remarkPlugins: ['remark-gfm'],
    extendDefaultPlugins: true,
    shikiConfig: {
      theme: 'dark-plus'
    }
  }
});