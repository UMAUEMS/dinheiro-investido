import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Star, Check } from "lucide-react";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#fffbf8]">
      {/* ============================================ */}
      {/* HERO SECTION - Minimalista */}
      {/* ============================================ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fff5f0] via-[#fffbf8] to-[#fdf2f8]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f8bbd9]/20 rounded-full blur-[120px]" />
        
        <div className="container relative z-10 mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto - Minimalista */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-[#4a3f3f]">PDFs em </span>
                <span className="bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent">Flipbooks</span>
                <span className="text-[#4a3f3f]"> Incríveis</span>
              </h1>
              
              <p className="text-lg text-[#7a6b6b] mb-8 max-w-md mx-auto lg:mx-0">
                Transforme documentos em experiências interativas em segundos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/auth/register"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] rounded-full shadow-lg shadow-[#b76e79]/25 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  Começar Grátis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-[#b76e79] hover:bg-[#fce4ec]/50 rounded-full transition-all"
                >
                  <Play className="w-5 h-5" />
                  Ver Demo
                </Link>
              </div>

              {/* Social proof compacto */}
              <div className="flex items-center gap-3 mt-10 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {['M', 'J', 'A', 'P'].map((l, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                      {l}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <span className="text-sm text-[#7a6b6b]">+2.000 usuários</span>
              </div>
            </div>

            {/* Imagem Hero */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#f8bbd9]/30 to-[#ffe5d9]/30 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#b76e79]/10">
                <Image
                  src="/images/flipbook-hero.jpg"
                  alt="Flipbook interativo"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SHOWCASE - Grid de Imagens */}
      {/* ============================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4a3f3f] mb-4">
              Crie. Publique. <span className="text-[#b76e79]">Venda.</span>
            </h2>
          </div>

          {/* Grid de imagens */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <Image
                src="/images/flipbook-3d.jpg"
                alt="Flipbook 3D"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#b76e79]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-bold text-xl">Flipbooks 3D</h3>
                  <p className="text-white/80 text-sm">Efeito realista de página</p>
                </div>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <Image
                src="/images/convite-digital.jpg"
                alt="Convites Digitais"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#b76e79]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-bold text-xl">Convites Digitais</h3>
                  <p className="text-white/80 text-sm">Elegantes e interativos</p>
                </div>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
              <Image
                src="/images/mockup-pink.jpg"
                alt="Produtos Digitais"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#b76e79]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-bold text-xl">Produtos Digitais</h3>
                  <p className="text-white/80 text-sm">Venda na sua loja</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* COMO FUNCIONA - Super Simples */}
      {/* ============================================ */}
      <section className="py-20 bg-gradient-to-br from-[#fdf2f8] to-[#fff5f0]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4a3f3f] mb-16">
            3 passos. <span className="text-[#b76e79]">Simples assim.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { num: "1", title: "Envie", desc: "Seu PDF" },
              { num: "2", title: "Personalize", desc: "Cores e estilo" },
              { num: "3", title: "Publique", desc: "E compartilhe" },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-[#4a3f3f]">{step.title}</h3>
                <p className="text-[#7a6b6b]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRODUTOS - Visual */}
      {/* ============================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-[#4a3f3f]">
              Produtos <span className="text-[#b76e79]">Populares</span>
            </h2>
            <Link href="/loja" className="text-[#b76e79] font-semibold hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: "/images/convite-digital.jpg", title: "Pack Convites", price: "R$ 47" },
              { img: "/images/ebook-template.jpg", title: "E-book Template", price: "R$ 29" },
              { img: "/images/mockup-pink.jpg", title: "Mockups Pack", price: "R$ 37" },
              { img: "/images/template-feminine.jpg", title: "Templates Pro", price: "R$ 59" },
            ].map((product, i) => (
              <Link key={i} href={`/produto/${i}`} className="group">
                <div className="rounded-2xl overflow-hidden bg-white border border-[#b76e79]/10 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={product.img}
                      alt={product.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#4a3f3f] group-hover:text-[#b76e79] transition-colors">{product.title}</h3>
                    <p className="text-lg font-bold text-[#b76e79]">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DEPOIMENTOS - Compacto */}
      {/* ============================================ */}
      <section className="py-20 bg-gradient-to-br from-[#fdf2f8] to-[#fff5f0]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#4a3f3f] mb-12">
            O que dizem <span className="text-[#b76e79]">nossos clientes</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Maria S.", text: "Incrível! Meus clientes amaram." },
              { name: "João P.", text: "Faturei R$ 5.000 em um mês!" },
              { name: "Ana C.", text: "Qualidade profissional." },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-[#4a3f3f] mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-semibold text-[#b76e79]">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PREÇOS - Simplificado */}
      {/* ============================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#4a3f3f] mb-4">
            Planos <span className="text-[#b76e79]">simples</span>
          </h2>
          <p className="text-center text-[#7a6b6b] mb-12">Comece grátis, upgrade quando quiser</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Grátis */}
            <div className="bg-white rounded-2xl p-8 border border-[#b76e79]/10">
              <h3 className="text-xl font-bold text-[#4a3f3f] mb-2">Grátis</h3>
              <div className="text-3xl font-bold text-[#4a3f3f] mb-6">R$ 0</div>
              <ul className="space-y-3 mb-8">
                {["3 flipbooks", "Marca d'água"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#7a6b6b]">
                    <Check className="w-5 h-5 text-[#86efac]" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register" className="block w-full py-3 text-center font-semibold text-[#b76e79] border-2 border-[#b76e79]/20 rounded-full hover:bg-[#fce4ec] transition-colors">
                Começar
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] rounded-2xl p-8 text-white shadow-xl scale-105">
              <div className="text-xs font-bold bg-white/20 rounded-full px-3 py-1 inline-block mb-4">POPULAR</div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-3xl font-bold mb-6">R$ 49<span className="text-lg font-normal">/mês</span></div>
              <ul className="space-y-3 mb-8">
                {["Ilimitados", "Sem marca", "Vídeo MP4"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register?plan=pro" className="block w-full py-3 text-center font-semibold bg-white text-[#b76e79] rounded-full hover:bg-white/90 transition-colors">
                Assinar
              </Link>
            </div>

            {/* Business */}
            <div className="bg-white rounded-2xl p-8 border border-[#b76e79]/10">
              <h3 className="text-xl font-bold text-[#4a3f3f] mb-2">Business</h3>
              <div className="text-3xl font-bold text-[#4a3f3f] mb-6">R$ 149<span className="text-lg font-normal text-[#7a6b6b]">/mês</span></div>
              <ul className="space-y-3 mb-8">
                {["Tudo do Pro", "Loja própria", "API"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#7a6b6b]">
                    <Check className="w-5 h-5 text-[#86efac]" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contato" className="block w-full py-3 text-center font-semibold text-[#b76e79] border-2 border-[#b76e79]/20 rounded-full hover:bg-[#fce4ec] transition-colors">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA FINAL - Impactante */}
      {/* ============================================ */}
      <section className="py-24 bg-gradient-to-br from-[#b76e79] to-[#d4a5a5]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-white/80 mb-10 text-lg">
            Crie seu primeiro flipbook grátis agora.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 px-10 py-5 text-lg font-semibold bg-white text-[#b76e79] rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Começar Grátis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
