import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { PageHero } from "@/components/page-hero";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import { blogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog & Faydalı Bilgiler",
  description: "Koltuk temizliği, leke çıkarma yöntemleri ve ev hijyeni hakkında faydalı bilgiler içeren blog yazılarımız.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <PageTransition>
      <PageHero
        kicker="Blog"
        title="Blog &"
        accent="Faydalı Bilgiler"
        description="Temizlik, hijyen ve leke çıkarma sırları hakkında uzman ekibimiz tarafından hazırlanan yazılar."
      />

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 2) * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <TiltCard className="flex h-full flex-col overflow-hidden" max={4}>
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      style={{ objectPosition: i % 2 ? "70% 50%" : "30% 50%" }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" aria-hidden="true" />
                    <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-ink/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-aqua backdrop-blur">
                      {post.date}
                    </span>
                  </div>
                  <div className="flex grow flex-col p-7">
                    <h2 className="text-2xl font-semibold leading-snug text-white transition-colors group-hover:text-aqua">{post.title}</h2>
                    <p className="mt-3 grow text-white/60">{post.excerpt}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-aqua">
                      Devamını Oku
                      <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
