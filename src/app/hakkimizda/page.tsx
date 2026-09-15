import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Bursa Koltuk Yıkama olarak yılların tecrübesiyle Bursa'nın tüm ilçelerine profesyonel temizlik hizmeti sunuyoruz.",
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-4 max-w-5xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-navy dark:text-white">Hakkımızda</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
            <p className="mb-6">
              Bursa Koltuk Yıkama olarak, Bursa ve çevresindeki müşterilerimize yıllardır en kaliteli ve güvenilir temizlik hizmetini sunmaktan gurur duyuyoruz. Evlerinizde ve iş yerlerinizde sağlıklı, hijyenik ve ferah yaşam alanları yaratmak en büyük gayemizdir.
            </p>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl glass border border-white/30 h-[280px] md:h-[380px] relative">
          <Image
            src="/images/hero.jpg"
            alt="Bursa Koltuk Yıkama ekibi çalışma anı"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
        <h2 className="text-2xl font-bold mt-2 mb-4 text-navy dark:text-white">Vizyonumuz</h2>
        <p className="mb-6">
          Temizlik sektöründe yenilikçi teknolojileri ve çevre dostu ürünleri kullanarak, Bursa&apos;nın en çok tercih edilen ve güvenilen koltuk yıkama firması olmak.
        </p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-navy dark:text-white">Neden Biz?</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Uzman Ekip:</strong> Alanında eğitimli ve deneyimli profesyonellerle çalışıyoruz.</li>
          <li><strong>Son Teknoloji Makineler:</strong> Derinlemesine temizlik ve yüksek vakum gücü sağlayan sanayi tipi cihazlar kullanıyoruz.</li>
          <li><strong>Çevre ve İnsan Dostu:</strong> Kullandığımız tüm temizlik ürünleri anti-alerjik ve sağlığa zararsızdır.</li>
          <li><strong>%100 Memnuniyet Garantisi:</strong> İşlem bitiminde siz onay verene kadar işimizi tamamlamış saymıyoruz.</li>
        </ul>
      </div>
    </div>
  );
}
