# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Astro 4.x, using a combination of Astro components, React, Preact, and Tailwind CSS. The site is deployed at https://kobslbj.dev.

## Development Commands

All commands run from the project root:

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview production build locally
- `npm run astro ...` - Run Astro CLI commands (e.g., `npm run astro add`, `npm run astro check`)

## Architecture

### Content Management

The blog uses **Astro Content Collections** for managing blog posts:

- Blog posts are stored as Markdown files in `src/content/posts/`
- Content schema is defined in `src/content/config.ts` with Zod validation
- Required frontmatter fields: `title` (string), `pubDate` (date), `description` (string), `tags` (array of strings)
- Optional field: `image` (string)
- Posts are rendered through dynamic routing at `src/pages/posts/[...slug].astro`

### Layout System

Two main layouts orchestrate the site structure:

1. **BaseLayout** (`src/layouts/BaseLayout.astro`)
   - Root layout for all pages
   - Contains global `<head>` elements including analytics (Google Analytics + Plausible)
   - Uses Astro View Transitions for SPA-like navigation
   - Includes Header and Footer components
   - Implements responsive container with breakpoint-based margins

2. **MarkdownPostLayout** (`src/layouts/MarkdownPostLayout.astro`)
   - Wraps BaseLayout for blog post rendering
   - Displays post metadata (title, date, tags)
   - Uses Tailwind Typography (`prose prose-invert`) for markdown styling
   - Integrates Giscus comments system (GitHub Discussions-based)

### Page Routes

- `/` - Home page with welcome image overlay
- `/blog` - Blog listing page
- `/about` - About page
- `/posts/[slug]` - Individual blog posts (dynamic)
- `/tags/` - All tags index
- `/tags/[tag]` - Posts filtered by tag (dynamic)

### Integrations

The project uses multiple Astro integrations (configured in `astro.config.mjs`):

- **@astrojs/react** - React component support
- **@astrojs/preact** - Preact component support
- **@astrojs/tailwind** - Tailwind CSS integration
- **@astrojs/partytown** - Web worker-based third-party script optimization (configured for Google Analytics with `dataLayer.push` forwarding)

### Analytics Setup

Two analytics systems run in parallel via `BaseLayout`:

- **Google Analytics** (G-3L2KPBSX6N) - Uses Partytown for performance optimization
- **Plausible Analytics** - Privacy-friendly analytics with custom proxy script
- Both scripts use `is:inline` directive for proper Astro handling

### Styling

- **Tailwind CSS** with custom configuration including NextUI plugin
- Custom font family: Times New Roman
- Custom background gradient: black-to-gray
- Dark mode support enabled via `darkMode: "class"`
- Global styles in `src/styles/global.css`
- Markdown content styled with Tailwind Typography plugin

### Markdown Configuration

- Uses `remark-gfm` plugin for GitHub Flavored Markdown support
- Syntax highlighting with `dark-plus` theme (Shiki)
- Processes `.md` files through content collections

### Comments System

Blog posts include Giscus comments powered by GitHub Discussions (repo: kobslbj/lbjdev).

## Adding New Blog Posts

1. Create a new `.md` file in `src/content/posts/`
2. Include required frontmatter:
   ```yaml
   ---
   title: "Post Title"
   pubDate: 2025-01-15
   description: "Post description"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Posts automatically appear on blog listing and are accessible at `/posts/[filename-slug]`
4. Tags automatically generate tag pages at `/tags/[tag]`
