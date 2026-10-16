---
name: build-marketplace-portal
description: Build a GitHub Pages portal for browsing the Copilot plugin marketplace.
agent: agent
---

# Build a Copilot Plugin Marketplace Portal

Build a static web portal that lets users browse the Copilot CLI plugins in this repository. Deploy it with GitHub Pages.

## Before making changes

1. Read the repository instructions, `README.md`, and `CONTRIBUTING.md`.
2. Read `.github/plugin/marketplace.json` and every `plugin.json` it references.
3. Inspect each plugin's `README.md`, `skills/`, `com.github.copilot/agents/`, and `mcp.json`, if they exist.
4. Check the existing scripts, workflows, tooling, and tests. Follow the project's existing patterns.

## Data source

- Treat `.github/plugin/marketplace.json` as the source of truth for the plugin list.
- Use each plugin's `source` path to find its `plugin.json`, then add that plugin's metadata and components to the catalog.
- Generate a static `catalog.json` at build time. Do not hard-code plugin data in the UI.
- Do not depend on the browser reading files from `.github/` at runtime. GitHub Pages builds can omit dot-directories.
- If a manifest is missing or invalid, fail the build with a clear error.

## Portal requirements

- Add a header with the marketplace name, description, version, and a link to the repository.
- Show a responsive grid of plugin cards with each plugin's name, description, version, author, license, and keywords.
- Add search by name, description, and keyword.
- Add filters for keywords and component types, such as skills, agents, and MCP servers.
- Add a detail view for each plugin that includes:
  - Its README content, rendered safely.
  - The skills, agents, and MCP servers it contains.
  - Copyable install commands:
    ```bash
    copilot plugin marketplace add OWNER/REPOSITORY
    copilot plugin install PLUGIN_NAME@MARKETPLACE_NAME
    ```
- Derive `OWNER/REPOSITORY` and `MARKETPLACE_NAME` from repository data. Do not hard-code them.
- Add a "Getting started" section that explains how to add the marketplace and verify installed plugins.
- Show helpful empty, no-results, and error states.

## Technical constraints

- Keep the site static and compatible with GitHub Pages. Do not add a backend.
- Use plain HTML, CSS, and JavaScript unless the repository already uses a frontend framework.
- Keep dependencies to a minimum.
- Make all asset and data URLs work under a repository subpath, such as `/REPOSITORY/`.
- Treat manifest and README content as untrusted. Escape or sanitize rendered content, and do not use unsanitized `innerHTML`.
- Do not include secrets, tokens, analytics, or tracking.

## Accessibility and design

- Use semantic HTML and add a skip link.
- Give every control an accessible label and keep focus visible.
- Make all interactions keyboard-accessible, including search, filters, details, and copy buttons.
- Announce changes in search results and copy confirmations to screen readers.
- Meet WCAG 2.1 AA contrast requirements.
- Support light and dark themes with `prefers-color-scheme`, and respect `prefers-reduced-motion`.
- Make the layout responsive from mobile to desktop.

## Deployment

- Add a GitHub Actions workflow that:
  - Runs on pushes to the default branch and on `workflow_dispatch`.
  - Validates the manifests and generates `catalog.json`.
  - Builds the site and deploys it with `actions/upload-pages-artifact` and `actions/deploy-pages`.
  - Uses minimal permissions: `contents: read`, `pages: write`, and `id-token: write`.
- Validate manifests and build the site on pull requests, but deploy only from the default branch.
- Document local preview, build, and deployment steps in `README.md`. Include the required setting: **Settings → Pages → Source → GitHub Actions**.

## Testing

- Add or update tests if test infrastructure exists. Cover catalog generation, invalid manifests, search, and filtering.
- If no test infrastructure exists, add a lightweight validation script for the manifests and generated catalog.

## Verify and report

Run the relevant available checks and build the site locally. In your final response, summarize the changes, list the files you changed, report the check results, and note any manual setup that is still required.
