import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Blog & Faydalı Bilgiler",
  description: "Koltuk temizliği, leke çıkarma yöntemleri ve ev hijyeni hakkında faydalı bilgiler içeren blog yazılarımız.",
};

const blogPosts = [
  { slug: "koltuk-kac-ayda-bir-yikanmali", title: "Koltuk Kaç Ayda Bir Yıkanmalı?", excerpt: "Evimizdeki koltukların görünmeyen tehlikeleri ve ideal yıkama periyotları hakkında bilmeniz gereken her şey." },
  { slug: "evde-koltuk-temizligi", title: "Evde Koltuk Temizliği Nasıl Yapılır?", excerpt: "Profesyonel yardım almadan önce evde kendi imkanlarınızla yapabileceğiniz güvenli koltuk silme yöntemleri." },
  { slug: "buharli-koltuk-yikama", title: "Buharlı Koltuk Yıkama Nedir?", excerpt: "Buhar gücüyle derinlemesine temizliğin avantajları ve neden tercih edilmesi gerektiği." },
  { slug: "en-zor-lekeler", title: "En Zor Lekeler Nasıl Çıkar?", excerpt: "Çay, kahve, tükenmez kalem gibi inatçı lekelerle başa çıkmanın pratik ve etkili yolları." },
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-navy dark:text-white">Blog & Faydalı Bilgiler</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Temizlik, hijyen ve leke çıkarma sırları hakkında uzman ekibimiz tarafından hazırlanan yazılar.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
            <Card className="h-full group-hover:border-turquoise/50 transition-colors">
              <div className="h-48 bg-foreground/5 rounded-t-3xl flex items-center justify-center text-foreground/40 font-medium">
                Görsel Yer Tutucu
              </div>
              <CardHeader>
                <CardTitle className="text-2xl group-hover:text-turquoise transition-colors">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{post.excerpt}</p>
                <span className="inline-block mt-4 text-turquoise font-semibold">Devamını Oku &rarr;</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
