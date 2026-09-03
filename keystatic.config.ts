import type { ReactElement } from "react"
import { config, fields, collection } from "@keystatic/core"
import { wrapper, mark } from "@keystatic/core/content-components"

const Callout = wrapper({
  label: "Callout",
  schema: {
    variant: fields.select({
      label: "Variant",
      options: [
        { label: "Note", value: "note" },
        { label: "Tip", value: "tip" },
        { label: "Warning", value: "warning" },
        { label: "Danger", value: "danger" },
        { label: "Important", value: "important" },
        { label: "Definition", value: "definition" },
        { label: "Theorem", value: "theorem" },
        { label: "Lemma", value: "lemma" },
        { label: "Proof", value: "proof" },
        { label: "Corollary", value: "corollary" },
        { label: "Proposition", value: "proposition" },
        { label: "Axiom", value: "axiom" },
        { label: "Conjecture", value: "conjecture" },
        { label: "Notation", value: "notation" },
        { label: "Remark", value: "remark" },
        { label: "Intuition", value: "intuition" },
        { label: "Recall", value: "recall" },
        { label: "Explanation", value: "explanation" },
        { label: "Example", value: "example" },
        { label: "Exercise", value: "exercise" },
        { label: "Problem", value: "problem" },
        { label: "Answer", value: "answer" },
        { label: "Solution", value: "solution" },
        { label: "Summary", value: "summary" },
        { label: "Fact", value: "fact" },
        { label: "Custom", value: "custom" },
      ],
      defaultValue: "note",
    }),
    title: fields.text({ label: "Title" }),
    type: fields.text({ label: "Type (Legacy)" }),
    defaultOpen: fields.checkbox({
      label: "Default Open",
      defaultValue: true,
    }),
  },
})

const Tabs = wrapper({
  label: "Tabs",
  schema: {
    defaultValue: fields.text({ label: "Default Value" }),
  },
})

const TabsList = wrapper({
  label: "Tabs List",
  schema: {},
})

const TabsTrigger = mark({
  label: "Tabs Trigger",
  icon: undefined as unknown as ReactElement,
  tag: "span",
  schema: {
    value: fields.text({ label: "Value" }),
  },
})

const TabsContent = wrapper({
  label: "Tabs Content",
  schema: {
    value: fields.text({ label: "Value" }),
  },
})

const storageKind =
  (import.meta.env.PUBLIC_KEYSTATIC_STORAGE_KIND as "github" | "local") ||
  (import.meta.env.PROD ? "github" : "local")

export default config({
  storage:
    storageKind === "github"
      ? {
          kind: "github",
          repo: "Rohit1024/portfolio",
        }
      : {
          kind: "local",
        },
  ui: {
    brand: {
      name: "Rohit Kharche Portfolio",
    },
    navigation: {
      Content: ["blog", "notes", "projects"],
      Settings: ["authors"],
    },
  },
  collections: {
    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "src/content/blog/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        date: fields.date({ label: "Date" }),
        order: fields.integer({ label: "Order" }),
        draft: fields.checkbox({ label: "Draft", defaultValue: false }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        category: fields.text({ label: "Category" }),
        subcategory: fields.text({ label: "Subcategory" }),
        image: fields.image({
          label: "Thumbnail Image",
          publicPath: "./",
        }),
        authors: fields.array(
          fields.relationship({
            label: "Author",
            collection: "authors",
          }),
          {
            label: "Authors",
            itemLabel: (props) => props.value ?? "Author",
          }
        ),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              publicPath: "./",
            },
          },
          components: {
            Callout,
            Tabs,
            TabsList,
            TabsTrigger,
            TabsContent,
          },
        }),
      },
    }),
    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "src/content/authors/*",
      format: { contentField: "content" },
      schema: {
        name: fields.slug({
          name: { label: "Name" },
          slug: {
            generate: (val) => val.toLowerCase().replace(/[^a-z0-9]/g, ""),
          },
        }),
        pronouns: fields.text({ label: "Pronouns" }),
        avatar: fields.text({ label: "Avatar URL or Path" }),
        bio: fields.text({ label: "Bio", multiline: true }),
        mail: fields.text({ label: "Email" }),
        website: fields.url({ label: "Website" }),
        twitter: fields.url({ label: "Twitter" }),
        github: fields.url({ label: "GitHub" }),
        linkedin: fields.url({ label: "LinkedIn" }),
        discord: fields.url({ label: "Discord" }),
        content: fields.emptyContent({ extension: "md" }),
      },
    }),
    notes: collection({
      label: "Notes",
      slugField: "title",
      path: "src/content/notes/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        date: fields.date({ label: "Date" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({ label: "Draft", defaultValue: false }),
        content: fields.mdx({
          label: "Content",
          extension: "md",
        }),
      },
    }),
    projects: collection({
      label: "Projects",
      slugField: "name",
      path: "src/content/projects/*",
      format: { contentField: "content" },
      schema: {
        name: fields.slug({ name: { label: "Project Name" } }),
        description: fields.text({ label: "Description", multiline: true }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        link: fields.url({ label: "Project Link" }),
        startDate: fields.date({ label: "Start Date" }),
        endDate: fields.date({ label: "End Date" }),
        image: fields.text({ label: "Image URL or Path" }),
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
  },
})
