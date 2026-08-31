---
name: writing-blog
description: Write, structure, unslop, and verify blog posts for this portfolio. Use when creating or updating blog posts, or when user invokes /writing-blog.
---

# Writing Blog Posts

Standardized workflow for drafting, editing, and verifying technical blog posts in this portfolio.

## Workflow

### 1. File & Frontmatter
Create `src/content/blog/<slug>/index.mdx` alongside `thumbnail.png`:

```yaml
---
title: 'Sentence case title stating the technical solution'
description: 'Concrete one-sentence summary of the fix.'
date: YYYY-MM-DD
tags: ['gcp', 'cloud-build', 'cicd']
category: gcp
subcategory: gke
image: './thumbnail.png'
authors: ['rohitkharche']
---
```

Import MDX components directly after frontmatter:
```mdx
import Callout from '@/components/Callout.astro'
```

### 2. Post Structure & Visuals
Follow the portfolio's standard layout:
- **Hook & Root Cause**: Open with the architectural limitation, error code, or why default approaches fail.
- **Mermaid Diagram**: Include `flowchart TD` or `graph TD` diagrams for traffic routing, pipelines, and auth flows. Always quote labels containing special characters (`["Label (Detail)"]`).
- **Implementation Steps**: Number main headings sequentially (`## 1. ...`, `## 2. ...`) with production-ready configs (`yaml`, `bash`, `dockerfile`).
- **Callouts**: Highlight edge cases using `<Callout variant="note|important|warning" title="...">...</Callout>`.
- **Summary Matrix**: Close with a comparison table or component checklist.

### 3. Unslop
Apply [`unslop`](../unslop/SKILL.md) in full:
- Cut AI tells: no em dashes (`—`), no en dashes (`–`), no hyphen-as-dash (`--`), no colon overuse, no emojis in headings, sentence case headings only, straight quotes (`'`/`"`).
- Tone: active voice, direct developer perspective, concrete error codes, and CLI flags.

### 4. Build & Verification
1. **Static Checks**:
   ```bash
   bun run typecheck && bun run lint
   ```
2. **Build & OG Image**:
   ```bash
   bun run build
   ```
   Confirm `dist/blog/<slug>/index.png` is generated with the embedded `thumbnail.png` and linked in `dist/blog/<slug>/index.html`.
3. **Visual Preview**:
   Run `bun run dev` and check `http://localhost:1234/blog/<slug>` for diagram spacing, code highlighting, and lightbox functionality.
