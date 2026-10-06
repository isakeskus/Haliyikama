export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "koltuk-kac-ayda-bir-yikanmali",
    title: "Koltuk Kaç Ayda Bir Yıkanmalı?",
    date: "15 Ekim 2023",
    excerpt: "Evimizdeki koltukların görünmeyen tehlikeleri ve ideal yıkama periyotları hakkında bilmeniz gereken her şey.",
    content:
      "Evimizdeki koltuklar, gün içinde en çok temas ettiğimiz yüzeylerdir. Uzmanlara göre, ortalama kullanıma sahip bir evde koltukların yılda en az 2 kez profesyonel makinelerle yıkanması gerekmektedir. Evcil hayvanınız varsa veya küçük çocuğunuz varsa bu süre 3 veya 4 aya kadar düşebilir. Yüzeysel silme işlemi kirleri sadece kumaşın altına iter, bu nedenle vakumlu makinelerle derinlemesine temizlik şarttır.",
    image: "/images/detail.jpg",
  },
  {
    slug: "evde-koltuk-temizligi",
    title: "Evde Koltuk Temizliği Nasıl Yapılır?",
    date: "22 Ekim 2023",
    excerpt: "Profesyonel yardım almadan önce evde kendi imkanlarınızla yapabileceğiniz güvenli koltuk silme yöntemleri.",
    content:
      "Profesyonel yardım alamadığınız acil durumlarda, koltuğunuza dökülen bir lekeye nasıl müdahale etmelisiniz? İlk kural, lekeyi ovalamamak ve sadece tampon hareketlerle emdirmektir. Kimyasal ağır çözücüler yerine, beyaz sirke ve arap sabunu gibi doğal yöntemler kumaşınızın ömrünü uzatır. Ancak unutmayın, en etkili yöntem her zaman profesyonel vakumlu temizliktir.",
    image: "/images/hero.jpg",
  },
  {
    slug: "buharli-koltuk-yikama",
    title: "Buharlı Koltuk Yıkama Nedir?",
    date: "5 Kasım 2023",
    excerpt: "Buhar gücüyle derinlemesine temizliğin avantajları ve neden tercih edilmesi gerektiği.",
    content:
      "Buharlı yıkama, yüksek sıcaklıktaki buharın kumaşın derinliklerine nüfuz ederek mayt, bakteri ve inatçı kirleri çözmesini sağlayan bir teknolojidir. Klasik yıkamaya göre daha az su kullanıldığı için kuruma süresi daha kısadır ve sıcaklık sayesinde ekstra bir dezenfeksiyon sağlanır. Özellikle alerjisi olan bireyler için buharlı yıkama şiddetle tavsiye edilir.",
    image: "/images/detail.jpg",
  },
  {
    slug: "en-zor-lekeler",
    title: "En Zor Lekeler Nasıl Çıkar?",
    date: "12 Kasım 2023",
    excerpt: "Çay, kahve, tükenmez kalem gibi inatçı lekelerle başa çıkmanın pratik ve etkili yolları.",
    content:
      "Çay, kahve, tükenmez kalem veya kan lekesi... Bu lekeler kumaşa hızlıca işler. Kahve lekesine karbonatlı su, mürekkep lekesine ise alkol bazlı hafif çözücüler ile müdahale edilebilir. Ancak yanlış bir müdahale lekeyi kalıcı hale getirebilir. Risk almamak ve kumaşınızın rengini soldurmamak için Bursa Koltuk Yıkama profesyonellerinden destek alabilirsiniz.",
    image: "/images/hero.jpg",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
