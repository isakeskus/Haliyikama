export type District = {
  slug: string;
  name: string;
  blurb: string;
  neighborhoods?: string[];
};

// Bursa'nın 17 ilçesi. Slug formatı: "{ilce}-koltuk-yikama" -> /nilufer-koltuk-yikama
export const districts: District[] = [
  {
    slug: "nilufer-koltuk-yikama",
    name: "Nilüfer",
    blurb:
      "Nilüfer'in sitelerinde ve müstakil evlerinde yoğun talep gören koltuk, yatak ve halı yıkama hizmetimizi aynı gün randevu ile yerinizde sunuyoruz.",
    neighborhoods: ["Beşevler", "Ihsaniye", "Ertuğrul", "Konak", "Görükle", "Özlüce"],
  },
  {
    slug: "osmangazi-koltuk-yikama",
    name: "Osmangazi",
    blurb:
      "Merkez ofisimizin de bulunduğu Osmangazi'de tüm mahallelere hızlı ulaşım imkanımız sayesinde aynı gün koltuk ve yatak yıkama hizmeti veriyoruz.",
    neighborhoods: ["Soğanlı", "Demirtaş", "Hüseyinalanı", "Emek", "Fethiye", "Yunuseli"],
  },
  {
    slug: "yildirim-koltuk-yikama",
    name: "Yıldırım",
    blurb:
      "Yıldırım'ın yoğun nüfuslu mahallelerinde profesyonel ekipmanlarımızla evinizde veya iş yerinizde buharlı koltuk ve halı yıkama hizmeti sağlıyoruz.",
    neighborhoods: ["Mimar Sinan", "Değirmenlicavuş", "Kazımkarabekir", "Ulus", "Arabayatağı"],
  },
  {
    slug: "gemlik-koltuk-yikama",
    name: "Gemlik",
    blurb:
      "Gemlik ve çevresindeki evlere, sitelere ve işyerlerine gezici ekibimizle giderek yerinde profesyonel koltuk ve yatak temizliği yapıyoruz.",
  },
  {
    slug: "inegol-koltuk-yikama",
    name: "İnegöl",
    blurb:
      "Mobilya sektörünün kalbi İnegöl'de kaliteli kumaşlara uygun, dokuya zarar vermeyen özel solüsyonlarla koltuk ve sandalye yıkama hizmeti sunuyoruz.",
  },
  {
    slug: "mudanya-koltuk-yikama",
    name: "Mudanya",
    blurb:
      "Mudanya sahil şeridi ve iç mahallelerdeki evlere randevulu olarak giderek koltuk, yatak ve araç koltuğu yıkama hizmeti veriyoruz.",
  },
  {
    slug: "gursu-koltuk-yikama",
    name: "Gürsu",
    blurb:
      "Gürsu'daki evler ve işyerleri için sanayi tipi vakumlu makinelerimizle derinlemesine, hızlı kuruyan koltuk yıkama hizmeti sağlıyoruz.",
  },
  {
    slug: "kestel-koltuk-yikama",
    name: "Kestel",
    blurb:
      "Kestel genelinde aynı gün servis imkanımızla koltuk takımlarınızı, yataklarınızı ve sandalyelerinizi yerinizde profesyonelce yıkıyoruz.",
  },
  {
    slug: "orhangazi-koltuk-yikama",
    name: "Orhangazi",
    blurb:
      "Orhangazi'deki müşterilerimize planlı randevu sistemiyle ulaşarak buharlı ve vakumlu koltuk-yatak yıkama hizmeti sunuyoruz.",
  },
  {
    slug: "mustafakemalpasa-koltuk-yikama",
    name: "Mustafakemalpaşa",
    blurb:
      "Mustafakemalpaşa'daki evlere ve işyerlerine giderek anti-alerjik ürünlerle güvenli, derinlemesine koltuk ve yatak temizliği yapıyoruz.",
  },
  {
    slug: "karacabey-koltuk-yikama",
    name: "Karacabey",
    blurb:
      "Karacabey'de randevulu gezici hizmetimizle koltuk, yatak, sandalye ve araç koltuğu yıkama işlemlerini yerinizde tamamlıyoruz.",
  },
  {
    slug: "iznik-koltuk-yikama",
    name: "İznik",
    blurb:
      "İznik'teki evler ve tatil evleri için hızlı kuruyan, kokusuz ve çocuk dostu ürünlerle profesyonel koltuk yıkama hizmeti veriyoruz.",
  },
  {
    slug: "orhaneli-koltuk-yikama",
    name: "Orhaneli",
    blurb:
      "Orhaneli'ye planlı seferlerimizle giderek koltuk ve yatak takımlarınızı sanayi tipi makinelerle derinlemesine temizliyoruz.",
  },
  {
    slug: "harmancik-koltuk-yikama",
    name: "Harmancık",
    blurb:
      "Harmancık'taki müşterilerimize randevu üzerine ulaşarak profesyonel koltuk ve yatak yıkama hizmeti sunuyoruz.",
  },
  {
    slug: "buyukorhan-koltuk-yikama",
    name: "Büyükorhan",
    blurb:
      "Büyükorhan'da yerinde koltuk, yatak ve sandalye yıkama hizmetimizden randevu alarak faydalanabilirsiniz.",
  },
  {
    slug: "keles-koltuk-yikama",
    name: "Keles",
    blurb:
      "Keles ve köylerine planlı gezici servisimizle giderek koltuk ve yatak takımlarınızı yerinde yıkıyoruz.",
  },
  {
    slug: "yenisehir-koltuk-yikama",
    name: "Yenişehir",
    blurb:
      "Yenişehir'deki evlere ve işyerlerine aynı gün randevu imkanıyla giderek profesyonel koltuk ve halı yıkama hizmeti veriyoruz.",
  },
];

export function getDistrictBySlug(slug: string): District | undefined {
  return districts.find((d) => d.slug === slug);
}
