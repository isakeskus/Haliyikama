import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { CtaButtons } from "@/components/cta-buttons";
import { Reveal } from "@/components/ui/reveal";
import { blogPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Yazı Bulunamadı" };
  return {
    title: `${post.title} | Bursa Koltuk Yıkama Blog`,
    description: post.content.substring(0, 150) + "...",
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageTransition>
      <article className="container mx-auto max-w-3xl px-4 pb-24 pt-32 md:pb-32 md:pt-44">
        <Link href="/blog" className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-aqua">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Blog&apos;a Dön
        </Link>

        <div className="relative mb-10 h-64 overflow-hidden rounded-[2.5rem] border border-white/10 md:h-80">
          <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-transparent" aria-hidden="true" />
        </div>

        <header className="mb-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-aqua">{post.date}</p>
          <h1 className="text-3xl font-semibold leading-[1.1] text-white sm:text-5xl">{post.title}</h1>
        </header>

        <p className="text-lg leading-[1.9] text-white/75">{post.content}</p>

        <Reveal>
          <div className="glass mt-14 rounded-[2rem] p-8 text-center md:p-12">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Koltuklarınız profesyonel ellere emanet!</h2>
            <p className="mx-auto mt-3 max-w-md text-white/60">Bursa&apos;nın tüm ilçelerine aynı gün ücretsiz servis imkanı.</p>
            <div className="mt-8">
              <CtaButtons phoneLabel="Hemen Fiyat Al" />
            </div>
          </div>
        </Reveal>
      </article>
    </PageTransition>
  );
}
