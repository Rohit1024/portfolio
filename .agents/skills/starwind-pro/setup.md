# Starwind Pro Setup

Starwind Pro's public block surface is Astro. Current setup requires Node 22.12+, an Astro project,
and Starwind UI configuration.

Before setup, confirm:

- Node 22.12+ and an Astro project with Tailwind CSS 4;
- the package runner and project root;
- whether `starwind.config.json` already exists; and
- `.env.local` can remain ignored and unprinted.

## New Or Uninitialized Project

Run from the project root:

```bash
npx starwind@latest init --framework astro --pro
```

Use the package runner established by local files. Add `--defaults` only when noninteractive defaults
are intended.

## Existing Starwind Project

```bash
npx starwind@latest setup
npx starwind@latest setup --yes
npx starwind@latest setup --package-manager pnpm
```

`setup` and `setup --pro` currently perform the same Pro task. Setup ensures initialization,
writes Pro authorization settings to `starwind.config.json`, creates or updates `.env.local`, and
ensures that environment file is ignored by Git.

A project may still have `@starwind-pro` registry settings in legacy `components.json`. Setup can
import them when current config has no Pro settings. If both files differ, `starwind.config.json`
is authoritative.

## Configuration Shape

Prefer the CLI. If manual review is needed, the relevant V3 shape is inside
`starwind.config.json`:

```json
{
  "$schema": "https://starwind.dev/config-schema.v2.json",
  "version": 2,
  "framework": "astro",
  "pro": {
    "registry": {
      "url": "https://pro.starwind.dev/r/{name}",
      "headers": {
        "Authorization": "Bearer ${STARWIND_LICENSE_KEY}"
      }
    }
  }
}
```

Keep the value itself in the project-root `.env.local`:

```bash
STARWIND_LICENSE_KEY=replace_with_your_license_key
```

Free blocks do not require paid authorization. Keep the placeholder/config expansion intact; never
replace it with the real key in JSON or committed source.

## Secrets Checklist

- `.env.local` is ignored by Git.
- The key never appears in source, terminal transcripts, prompts, screenshots, commits, or handoff.
- The official registry sends the key through the Authorization header.
- Troubleshooting confirms presence and variable spelling without printing its value.

## Troubleshooting

For authorization failures:

1. Confirm `.env.local` is at the project root and ignored.
2. Confirm the variable name is exactly `STARWIND_LICENSE_KEY`.
3. Ask the user to verify access/status without sharing the key.
4. Search for a free alternative when premium access is unavailable.

For install failures:

1. Confirm project root, Astro target, package runner, and Node version.
2. Confirm `starwind.config.json` is current and contains Pro configuration.
3. Run `npx starwind@latest setup` when configuration is missing.
4. Repeat current Pro search and use the returned install command exactly.

Setup is complete when config contains the intended Pro authorization reference, the ignored
environment file exists where required, and a current free or authorized block request resolves
without exposing a secret.
