import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import icon from "astro-icon"
import mermaid from "astro-mermaid"

import expressiveCode from "astro-expressive-code"
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark"
import rehypeExternalLinks from "rehype-external-links"
import rehypeKatex from "rehype-katex"

import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"

import tailwindcss from "@tailwindcss/vite"

import { remarkPlugins } from "./plugins"

export default defineConfig({
  site: "https://rohitkharche.web.app",
  integrations: [
    mermaid({
      autoTheme: true,
      enableLog: false,
    }),
    expressiveCode({
      themes: ["github-light", "github-dark"],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `[data-theme="${theme.name.split("-")[1]}"]`,
      defaultProps: {
        wrap: false,
        collapseStyle: "collapsible-auto",
        overridesByLang: {
          "ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh":
            {
              showLineNumbers: false,
            },
        },
      },
      styleOverrides: {
        codeFontSize: "0.8rem",
        codeLineHeight: "1.6",
        borderRadius: "0.6rem",
        borderWidth: "1px",
        borderColor: "var(--border)",
        codeFontFamily: "var(--font-mono)",
        uiFontFamily: "var(--font-sans)",
        frames: {
          frameBoxShadowCssValue:
            "0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 6px -1px rgb(0 0 0 / 0.04)",
          editorActiveTabIndicatorBottomColor: "var(--primary)",
          editorActiveTabIndicatorTopColor: "transparent",
          editorActiveTabForeground: "var(--foreground)",
          editorActiveTabBackground: "var(--background)",
          editorTabBarBackground:
            "color-mix(in oklab, var(--secondary) 40%, transparent)",
          editorTabBarBorderBottomColor: "var(--border)",
        },
        lineNumbers: {
          foreground: "var(--muted-foreground)",
        },
      },
    }),
    mdx(),
    react(),
    sitemap(),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: ["nofollow", "noreferrer", "noopener"],
          },
        ],
        rehypeHeadingIds,
        rehypeKatex,
      ],
      remarkPlugins,
    }),
  },
})
