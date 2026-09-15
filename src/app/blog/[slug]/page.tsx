import { Button } from "@/components/ui/button";
import { Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PHONE_TEL } from "@/lib/services";

// Bu veri tabanından gelecek veriyi simüle ediyor
const blogData: Record<string, { title: string, content: string, date: string }> = {
  "koltuk-kac-ayda-bir-yikanmali": {
    title: "Koltuk Kaç Ayda Bir Yıkanmalı?",
    date: "15 Ekim 2023",
    content: "Evimizdeki koltuklar, gün içinde en çok temas ettiğimiz yüzeylerdir. Uzmanlara göre, ortalama kullanıma sahip bir evde koltukların yılda en az 2 kez profesyonel makinelerle yıkanması gerekmektedir. Evcil hayvanınız varsa veya küçük çocuğunuz varsa bu süre 3 veya 4 aya kadar düşebilir. Yüzeysel silme işlemi kirleri sadece kumaşın altına iter, bu nedenle vakumlu makinelerle derinlemesine temizlik şarttır."
  },
  "evde-koltuk-temizligi": {
    title: "Evde Koltuk Temizliği Nasıl Yapılır?",
    date: "22 Ekim 2023",
    content: "Profesyonel yardım alamadığınız acil durumlarda, koltuğunuza dökülen bir lekeye nasıl müdahale etmelisiniz? İlk kural, lekeyi ovalamamak ve sadece tampon hareketlerle emdirmektir. Kimyasal ağır çözücüler yerine, beyaz sirke ve arap sabunu gibi doğal yöntemler kumaşınızın ömrünü uzatır. Ancak unutmayın, en etkili yöntem her zaman profesyonel vakumlu temizliktir."
  },
  "buharli-koltuk-yikama": {
    title: "Buharlı Koltuk Yıkama Nedir?",
    date: "5 Kasım 2023",
    content: "Buharlı yıkama, yüksek sıcaklıktaki buharın kumaşın derinliklerine nüfuz ederek mayt, bakteri ve inatçı kirleri çözmesini sağlayan bir teknolojidir. Klasik yıkamaya göre daha az su kullanıldığı için kuruma süresi daha kısadır ve sıcaklık sayesinde ekstra bir dezenfeksiyon sağlanır. Özellikle alerjisi olan bireyler için buharlı yıkama şiddetle tavsiye edilir."
  },
  "en-zor-lekeler": {
    title: "En Zor Lekeler Nasıl Çıkar?",
    date: "12 Kasım 2023",
    content: "Çay, kahve, tükenmez kalem veya kan lekesi... Bu lekeler kumaşa hızlıca işler. Kahve lekesine karbonatlı su, mürekkep lekesine ise alkol bazlı hafif çözücüler ile müdahale edilebilir. Ancak yanlış bir müdahale lekeyi kalıcı hale getirebilir. Risk almamak ve kumaşınızın rengini soldurmamak için Bursa Koltuk Yıkama profesyonellerinden destek alabilirsiniz."
  }
};

export function generateStaticParams() {
  return Object.keys(blogData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogData[slug];
  if (!post) return { title: "Yazı Bulunamadı" };
  return {
    title: `${post.title} | Bursa Koltuk Yıkama Blog`,
    description: post.content.substring(0, 150) + "...",
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogData[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-28 pb-16 lg:pt-40 lg:pb-32 container mx-auto px-4 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center text-turquoise hover:underline mb-8 font-medium">
        <ArrowLeft size={16} className="mr-2" /> Blog&apos;a Dön
      </Link>

      <article className="glass-card rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-turquoise rounded-full blur-[100px] opacity-10 pointer-events-none" />

        <header className="mb-10">
          <p className="text-turquoise font-medium mb-4">{post.date}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-navy dark:text-white leading-tight mb-6">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-lg dark:prose-invert prose-headings:text-navy dark:prose-headings:text-white prose-p:text-foreground/80 max-w-none mb-12">
          <p className="leading-relaxed text-lg">{post.content}</p>
        </div>

        <div className="border-t border-foreground/10 pt-8 mt-12">
          <div className="bg-navy rounded-2xl p-6 text-center text-white">
            <h3 className="text-xl font-bold mb-2">Koltuklarınız Profesyonel Ellere Emanet!</h3>
            <p className="text-white/80 mb-6">Bursa&apos;nın tüm ilçelerine aynı gün ücretsiz servis imkanı.</p>
            <Button size="lg" className="gap-2" asChild>
              <a href={`tel:${PHONE_TEL}`}>
                <Phone size={20} /> Hemen Fiyat Al
              </a>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
