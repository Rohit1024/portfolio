import fs from "node:fs"
import path from "node:path"
import { element, type OgImageOptions, type OgRenderInput } from "@alfanjauhari/astro-og-images"

let cachedFontBuffer: Buffer | null = null

function getFontBuffer(): Buffer {
  if (!cachedFontBuffer) {
    const fontPath = path.join(
      process.cwd(),
      "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2"
    )
    cachedFontBuffer = fs.readFileSync(fontPath)
  }
  return cachedFontBuffer
}

function findBlogThumbnail(slug: string): string | null {
  const contentDir = path.join(process.cwd(), "src/content/blog", slug)
  const candidateFiles = [
    "thumbnail.png",
    "thumbnail.jpg",
    "thumbnail.jpeg",
    "thumbnail.webp",
  ]

  for (const filename of candidateFiles) {
    const filePath = path.join(contentDir, filename)
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filename).toLowerCase()
      const mime =
        ext === ".png"
          ? "image/png"
          : ext === ".webp"
            ? "image/webp"
            : "image/jpeg"
      const buffer = fs.readFileSync(filePath)
      return `data:${mime};base64,${buffer.toString("base64")}`
    }
  }
  return null
}

export function renderOgCard(input: OgRenderInput) {
  const cleanPath = input.pathname.replace(/^\/+|\/+$/g, "")
  const isBlogPost =
    cleanPath.startsWith("blog/") &&
    !cleanPath.match(/^blog\/\d+$/) &&
    cleanPath !== "blog"

  if (isBlogPost) {
    const slug = cleanPath.replace(/^blog\//, "")
    const thumbnailDataUri = findBlogThumbnail(slug)

    if (thumbnailDataUri) {
      // 2-Column Blog Post Card with Embedded Thumbnail
      return element(
        "div",
        {
          tw: "flex h-full w-full flex-col justify-between bg-[#09090b] p-12 text-white border-[12px] border-[#18181b]",
        },
        element(
          "div",
          { tw: "flex h-full w-full flex-row items-center justify-between" },
          element(
            "div",
            { tw: "flex flex-col justify-between h-full max-w-[560px]" },
            element(
              "div",
              { tw: "flex flex-col" },
              element(
                "div",
                { tw: "flex items-center mb-4" },
                element(
                  "span",
                  {
                    tw: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-sm font-semibold rounded-md tracking-wider uppercase",
                  },
                  "Blog Post"
                )
              ),
              element(
                "h1",
                {
                  tw: "text-4xl font-bold leading-tight text-zinc-100 tracking-tight mb-4",
                },
                input.title
              ),
              input.description
                ? element(
                    "p",
                    {
                      tw: "text-xl text-zinc-400 leading-normal line-clamp-3",
                    },
                    input.description
                  )
                : null
            ),
            element(
              "div",
              {
                tw: "flex items-center text-base text-zinc-400 border-t border-zinc-800 pt-4",
              },
              element(
                "span",
                { tw: "font-semibold text-zinc-200 mr-2" },
                "Rohit Kharche"
              ),
              element("span", { tw: "text-zinc-600 mx-2" }, "•"),
              element(
                "span",
                { tw: "text-zinc-400" },
                "rohitkharche.web.app"
              )
            )
          ),
          element(
            "div",
            {
              tw: "flex h-[380px] w-[460px] rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-2xl bg-zinc-900",
            },
            element("img", {
              src: thumbnailDataUri,
              tw: "w-full h-full object-cover",
            })
          )
        )
      )
    }
  }

  // Branded Card for Site Pages & Posts without thumbnail
  const isHome = cleanPath === "" || cleanPath === "index"
  const tagLabel = isHome
    ? "Portfolio"
    : cleanPath.startsWith("notes")
      ? "Notes"
      : cleanPath.startsWith("tags")
        ? "Tag"
        : cleanPath.startsWith("categories")
          ? "Category"
          : cleanPath.startsWith("authors")
            ? "Author"
            : cleanPath.startsWith("about")
              ? "About"
              : "Rohit Kharche"

  return element(
    "div",
    {
      tw: "flex h-full w-full flex-col justify-between bg-[#09090b] p-16 text-white border-[12px] border-[#18181b]",
    },
    element(
      "div",
      { tw: "flex items-center justify-between" },
      element(
        "span",
        {
          tw: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-sm font-semibold rounded-md tracking-wider uppercase",
        },
        tagLabel
      ),
      element(
        "span",
        { tw: "text-zinc-400 text-sm font-medium" },
        "rohitkharche.web.app"
      )
    ),
    element(
      "div",
      { tw: "flex flex-col my-auto max-w-[920px]" },
      element(
        "h1",
        {
          tw: "text-5xl font-bold leading-tight text-zinc-100 tracking-tight mb-4",
        },
        input.title
      ),
      input.description
        ? element(
            "p",
            { tw: "text-2xl text-zinc-400 leading-relaxed line-clamp-3" },
            input.description
          )
        : null
    ),
    element(
      "div",
      {
        tw: "flex items-center justify-between border-t border-zinc-800 pt-6 text-base text-zinc-400",
      },
      element(
        "span",
        { tw: "text-zinc-300 font-medium" },
        "Full-Stack DevOps Engineer"
      ),
      element(
        "span",
        { tw: "text-zinc-500" },
        "GCP • Java Microservices • CI/CD • IaC"
      )
    )
  )
}

export function getOgImagesConfig(): OgImageOptions {
  return {
    format: "png",
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Geist",
        data: getFontBuffer(),
        weight: 700,
        style: "normal",
      },
    ],
    render: renderOgCard,
  }
}
