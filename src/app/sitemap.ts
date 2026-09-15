import type { MetadataRoute } from "next";
import { districts } from "@/lib/districts";

const BASE_URL = "https://bursakoltukyikama.com";

const blogSlugs = [
  "koltuk-kac-ayda-bir-yikanmali",
  "evde-koltuk-temizligi",
  "buharli-koltuk-yikama",
  "en-zor-lekeler",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/koltuk-yikama`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/yatak-yikama`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/sandalye-yikama`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/arac-koltugu-yikama`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/hakkimizda`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/iletisim`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const districtRoutes: MetadataRoute.Sitemap = districts.map((d) => ({
    url: `${BASE_URL}/${d.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...districtRoutes, ...blogRoutes];
}
