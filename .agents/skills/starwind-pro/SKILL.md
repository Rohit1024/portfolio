---
name: starwind-pro
description: Discover, install, and adapt Starwind Pro blocks in Astro projects. Use to search Pro blocks, configure V3 Pro access, distinguish free and paid availability, install exact commands returned by current tools, or avoid assuming license access.
allowed-tools: Bash(npx starwind@latest *), Bash(pnpx starwind@latest *), Bash(pnpm dlx starwind@latest *), Bash(yarn dlx starwind@latest *)
---

# Starwind Pro

Starwind Pro builds on Starwind UI v3. Its public blocks remain Astro components installed into the
application and customized locally.

## Rules

- Confirm an Astro target before selecting a Pro block.
- Treat `starwind.config.json` as the V3 authority for framework, component destination, registry,
  Tailwind, and Pro authorization settings.
- Initialize missing Starwind UI with `starwind init --framework astro --pro`; use
  `starwind setup` for an existing project.
- Search current MCP, CLI, or Pro metadata before naming a block.
- Use the exact returned install command; retain declared component dependencies.
- Preserve the block's responsive layout, container queries, motion and reduced-motion behavior,
  accessibility, and light/dark theme contract while replacing demo content.
- Distinguish free from premium blocks. Premium blocks require access; availability is metadata.
- Keep `STARWIND_LICENSE_KEY` in `.env.local` or a secret manager and out of code, logs, chat, and
  handoff text.

## Context

Before recommending or installing a block, inspect:

1. `package.json`, lockfiles, `astro.config.*`, and the route/layout being changed.
2. `starwind.config.json`, configured component directory, installed records, and local exports.
3. The active Starwind CSS file from config and existing theme conventions.
4. `.gitignore` when setup may create or update `.env.local`.

A legacy `components.json` can contain old Pro registry settings; current setup can import them, but
`starwind.config.json` wins if the two differ.

## Find, Install, Adapt

1. For a new project, initialize with `starwind init --framework astro --pro`; for an initialized
   Starwind project, run `starwind setup` once when Pro configuration is missing.
2. Search by intent/category/plan through current MCP `starwind_search` or
   `starwind search <query> --json`.
3. Select a result whose plan and dependencies fit the project.
4. Run its exact install command from the project root.
5. Read every added block and component file.
6. Wire it into the intended Astro route using local aliases.
7. Replace placeholder content, links, data, and imagery while preserving responsive, container
   query, animation, accessibility, and theme behavior.
8. Run relevant format, typecheck, build, and page/browser checks.

The block task is complete when its source and dependencies are installed in configured locations,
placeholder content is resolved, imports build, and access requirements are accurately reported.

## References

- [setup.md](./setup.md): V3 Pro configuration, license boundaries, and troubleshooting
- [blocks.md](./blocks.md): search, install commands, and adaptation
