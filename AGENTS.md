# Project Context & Agent Instructions

## Project Overview
This is a personal website and résumé for ChiefD425, built as a static site using Eleventy (11ty) and hosted on GitHub Pages.

## Tech Stack
- **Generator:** [Eleventy (11ty)](https://www.11ty.dev/)
- **Languages:** HTML (Nunjucks templates `.njk`), CSS, JavaScript
- **Deployment:** GitHub Actions (deploys to GitHub Pages)
- **Package Manager:** npm

## Key Commands
- **Install Dependencies:** `npm install`
- **Development Server:** `npm start` (runs `npx @11ty/eleventy --serve`)
- **Build for Production:** `npm run build` (runs `npx @11ty/eleventy`)

## Project Structure
- `_data/`: Global data files
- `_includes/`: Templates and partials
- `content/` or root `.njk` files: Page content
- `.eleventy.js`: Main configuration file
- `.github/workflows/deploy.yml`: CI/CD configuration

## Current Status
- **Last Updated:** 2025-11-18
- **State:** Stable. Dependencies installed. Build verified.
- **Next Goals:** [User to fill in as needed]

## Agent Guidelines
- When starting a session, read this file to understand the project context.
- Update the "Current Status" section after significant changes.
- Maintain the "Key Commands" if scripts change.
