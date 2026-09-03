import { config, fields, collection } from "@keystatic/core"
import { wrapper } from "@keystatic/core/content-components"

const Callout = wrapper({
  label: "Callout",
  schema: {
    type: fields.select({
      label: "Type",
      options: [
        { label: "Default", value: "default" },
        { label: "Info", value: "info" },
        { label: "Warning", value: "warning" },
        { label: "Success", value: "success" },
        { label: "Error", value: "error" },
      ],
      defaultValue: "default",
    }),
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
          },
        }),
      },
    }),
    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "src/content/authors/*",
      format: { data: "yaml" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        pronouns: fields.text({ label: "Pronouns" }),
        avatar: fields.text({ label: "Avatar URL or Path" }),
        bio: fields.text({ label: "Bio", multiline: true }),
        mail: fields.text({ label: "Email" }),
        website: fields.url({ label: "Website" }),
        twitter: fields.url({ label: "Twitter" }),
        github: fields.url({ label: "GitHub" }),
        linkedin: fields.url({ label: "LinkedIn" }),
        discord: fields.url({ label: "Discord" }),
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
