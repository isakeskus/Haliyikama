"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Phone, MessageCircle, CheckCircle2, Droplets, 
  Sparkles, Wind, ShieldCheck, MapPin, Star,
  ChevronDown, ChevronUp
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// --- Data ---
const services = [
  { title: "Koltuk Yıkama", desc: "Derinlemesine temizlik ile koltuklarınız ilk günkü gibi.", icon: <Droplets className="w-8 h-8 text-turquoise" /> },
  { title: "L Köşe Takımı", desc: "Köşe takımlarınız için özel buharlı temizlik.", icon: <Sparkles className="w-8 h-8 text-turquoise" /> },
  { title: "Yatak Yıkama", desc: "Anti-bakteriyel yatak temizliği ile sağlıklı uykular.", icon: <ShieldCheck className="w-8 h-8 text-turquoise" /> },
  { title: "Sandalye Yıkama", desc: "Yemek masası ve ofis sandalyeleri için detaylı temizlik.", icon: <Wind className="w-8 h-8 text-turquoise" /> },
  { title: "Araç Koltuğu", desc: "Aracınızın içi mis gibi koksun, lekeler tarih olsun.", icon: <Sparkles className="w-8 h-8 text-turquoise" /> },
  { title: "Ofis Koltukları", desc: "İş yerinizdeki koltuklar için toplu ve hızlı temizlik.", icon: <CheckCircle2 className="w-8 h-8 text-turquoise" /> },
];

const whyUs = [
  { title: "Profesyonel Makine", desc: "Yüksek vakum gücüne sahip sanayi tipi makineler.", icon: <Droplets className="text-turquoise" /> },
  { title: "Çevre Dostu İlaç", desc: "Doğaya ve insan sağlığına zararsız özel solüsyonlar.", icon: <Sparkles className="text-turquoise" /> },
  { title: "Hızlı Kuruma", desc: "İşlem sonrası çok kısa sürede kullanıma hazır.", icon: <Wind className="text-turquoise" /> },
  { title: "Deneyimli Personel", desc: "Alanında uzman, güler yüzlü ekibimiz.", icon: <CheckCircle2 className="text-turquoise" /> },
  { title: "Uygun Fiyat", desc: "Kaliteli hizmeti en uygun fiyat garantisiyle sunuyoruz.", icon: <Star className="text-turquoise" /> },
  { title: "Müşteri Memnuniyeti", desc: "%100 müşteri memnuniyeti odaklı çalışma prensibi.", icon: <ShieldCheck className="text-turquoise" /> },
];

const faqs = [
  { q: "Koltuk kaç saatte kurur?", a: "Mevsim şartlarına bağlı olarak ortalama 4-6 saat içerisinde tamamen kurur ve kullanıma hazır hale gelir." },
  { q: "Ne kadar sürer?", a: "Standart bir koltuk takımının yıkanması kir durumuna göre yaklaşık 1-1.5 saat sürmektedir." },
  { q: "Leke çıkar mı?", a: "Profesyonel solüsyonlarımız ile inatçı lekelerin %95'ini garantili bir şekilde çıkarıyoruz." },
  { q: "Çocuklara zararlı mı?", a: "Hayır, kullandığımız tüm temizlik ürünleri anti-alerjik ve insan sağlığına zararsızdır." },
  { q: "Evde mi yıkıyorsunuz?", a: "Evet, tüm yıkama işlemlerini yerinde, sizin gözetiminizde evinizde gerçekleştiriyoruz." },
];

// --- Components ---

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 dark:opacity-20 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-turquoise rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-navy rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Bursa'nın Profesyonel <br/><span className="text-turquoise">Koltuk Yıkama</span> Hizmeti
          </h1>
          <p className="text-lg lg:text-xl text-foreground/80 mb-8 max-w-lg">
            Evde yerinde profesyonel koltuk, yatak, sandalye ve araç koltuğu temizliği. Aynı gün servis ile derinlemesine hijyen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg gap-2" asChild>
              <a href="tel:+905523135463">
                <Phone size={24} /> Hemen Ara
              </a>
            </Button>
            <Button variant="whatsapp" size="lg" className="text-lg gap-2" asChild>
              <a href="https://wa.me/905523135463" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={24} /> WhatsApp Teklif Al
              </a>
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl glass border border-white/30"
        >
          <Image 
            src="/images/hero.jpg" 
            alt="Profesyonel Koltuk Yıkama" 
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    { text: "5000+ Mutlu Müşteri", icon: <CheckCircle2 className="w-6 h-6 text-turquoise" /> },
    { text: "Aynı Gün Servis", icon: <CheckCircle2 className="w-6 h-6 text-turquoise" /> },
    { text: "Buharlı Derin Temizlik", icon: <CheckCircle2 className="w-6 h-6 text-turquoise" /> },
    { text: "Leke Garantisi", icon: <CheckCircle2 className="w-6 h-6 text-turquoise" /> },
    { text: "Bursa'nın Her Noktasına Hizmet", icon: <CheckCircle2 className="w-6 h-6 text-turquoise" /> },
  ];

  return (
    <div className="bg-navy py-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-3 text-white font-medium"
            >
              {item.icon}
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Hizmetlerimiz</h2>
          <p className="text-foreground/70 text-lg">Evinizin veya iş yerinizin ihtiyacı olan tüm tekstil yüzeyler için profesyonel çözümler.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col items-start p-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-turquoise/10 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/70 text-base">{service.desc}</p>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/koltuk-yikama">Detaylı Bilgi</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  const steps = [
    { num: "1", title: "Randevu Al", desc: "Bizi arayın veya WhatsApp'tan yazın." },
    { num: "2", title: "Ekibimiz Gelsin", desc: "Belirlenen saatte adresinizdeyiz." },
    { num: "3", title: "Profesyonel Temizlik", desc: "Derinlemesine buharlı yıkama işlemi." },
    { num: "4", title: "Mis Gibi Teslim", desc: "Tertemiz koltuklarınızı hemen kullanın." },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Nasıl Çalışıyoruz?</h2>
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-1/8 right-1/8 h-1 bg-turquoise/20 -z-10" />
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto bg-white dark:bg-navy rounded-full shadow-xl flex items-center justify-center text-3xl font-bold text-turquoise mb-6 border-4 border-background">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-foreground/70">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Neden Bizi Seçmelisiniz?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUs.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl border border-foreground/10 hover:border-turquoise/50 transition-colors bg-white/50 dark:bg-navy/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-turquoise/10 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-foreground/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteFormSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy -z-20" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 lg:p-12 border-0 shadow-2xl relative overflow-hidden text-center">
          {/* Decorative glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-turquoise rounded-full blur-3xl opacity-20 pointer-events-none" />
          
          <h2 className="text-3xl lg:text-4xl font-bold text-navy dark:text-white mb-6">Hemen Fiyat Teklifi Alın</h2>
          <p className="text-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
            Hizmetlerimiz hakkında detaylı bilgi ve evinize özel fiyat teklifi almak için bize WhatsApp üzerinden saniyeler içinde ulaşabilirsiniz.
          </p>
          
          <Button variant="whatsapp" size="lg" className="text-xl h-16 px-8 rounded-full shadow-[0_0_40px_rgba(37,211,102,0.4)] hover:shadow-[0_0_60px_rgba(37,211,102,0.6)]" asChild>
            <a href="https://wa.me/905523135463" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <MessageCircle size={32} />
              WhatsApp'tan Teklif Al
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-foreground/10 rounded-2xl overflow-hidden bg-white/50 dark:bg-navy/10">
              <button
                className="w-full px-6 py-4 flex items-center justify-between font-semibold text-left focus:outline-none"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="text-lg">{faq.q}</span>
                {openIdx === idx ? <ChevronUp className="text-turquoise" /> : <ChevronDown className="text-foreground/50" />}
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIdx === idx ? "auto" : 0, opacity: openIdx === idx ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 text-foreground/70">
                  {faq.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <StepsSection />
      <WhyUsSection />
      <QuoteFormSection />
      <FAQSection />
      
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-foreground/10 z-40">
        <Button size="lg" className="w-full shadow-2xl text-lg font-bold gap-2" asChild>
          <a href="tel:+905523135463">
            <Phone size={24} /> Hemen Ara
          </a>
        </Button>
      </div>
    </div>
  );
}
