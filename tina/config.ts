import { categories } from "../src/lib/constants";
import { defineConfig } from "tinacms";

const tinacmsCategories = categories.map((category) => {
  return {
    label: category.categoryName,
    value: category.categorySlug,
  };
});

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog記事",
        path: "src/content/blog",
        format: "mdx",
        ui: {
          filename: {
            readonly: false,
            slugify(values) {
              return `${values?.slug}`;
            },
          },
        },
        defaultItem: () => {
          return {
            pubDate: new Date().toISOString(),
          };
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "タイトル",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "スラッグ",
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "投稿日",
            ui: {
              dateFormat: "YYYY-MM-DD",
            },
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "画像",
          },
          {
            type: "string",
            name: "category",
            label: "カテゴリー",
            list: true,
            options: tinacmsCategories,
          },
          {
            type: "rich-text",
            name: "body",
            label: "記事本文",
            isBody: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "説明",
            ui: {
              component: "textarea",
            },
            required: true,
          },
        ],
      },
    ],
  },
});
