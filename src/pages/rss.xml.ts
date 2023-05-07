import rss, { RSSOptions } from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteMeta } from "@lib/constants";
import type { AstroUserConfig } from "astro";

const { siteTitle, siteDesc } = siteMeta;

export async function get(context: RSSOptions) {
  const blog = await getCollection("blog");
  return rss({
    title: siteTitle,
    description: siteDesc,
    site: context.site,
    items: blog.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}`,
    })),
  });
}
