import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { BenefitsBar } from "@/components/BenefitsBar";
import { categories } from "@/data/categories";
import { getMaisBuscados, products } from "@/data/products";

export default function Home() {
  const maisBuscados = getMaisBuscados().slice(0, 8);
  const ofertas = products.filter(p => p.precoPromocional).slice(0,4);

  return (
    <div className="bg-zinc-50">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 sm:pt-6">
        <HeroCarousel />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-14">
        <section aria-labelledby="categorias-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="categorias-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">Navegue por categorias</h2>
              <p className="mt-1 text-sm text-zinc-500">Encontre o que procura em poucos cliques</p>
            </div>
            <Link href="/categorias" className="hidden sm:inline-flex text-sm font-semibold text-zinc-900 hover:text-orange-600">Ver todas →</Link>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((c) => (
              <div key={c.slug} className="w-[calc(50%-6px)] sm:w-[160px] lg:w-[180px]">
                <CategoryCard category={c} />
              </div>
            ))}
          </div>
          <div className="sm:hidden mt-4 text-center">
            <Link href="/categorias" className="text-sm font-semibold text-zinc-900">Ver todas categorias →</Link>
          </div>
        </section>

        <section aria-labelledby="mais-buscados-heading">
          <div className="flex items-end justify-between">
            <div>
              <h2 id="mais-buscados-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">Produtos mais buscados</h2>
              <p className="mt-1 text-sm text-zinc-500">Os queridinhos dos nossos clientes</p>
            </div>
            <Link href="/produtos" className="hidden sm:inline-flex text-sm font-semibold text-zinc-900 hover:text-orange-600">Ver todos →</Link>
          </div>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {maisBuscados.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <BenefitsBar />

        <section aria-labelledby="ofertas-heading">
          <div className="flex items-end justify-between">
            <h2 id="ofertas-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">Ofertas da semana</h2>
            <Link href="/produtos?filtro=ofertas" className="hidden sm:inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700">Ver ofertas →</Link>
          </div>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {ofertas.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-zinc-900">Móveis e eletrodomésticos com o melhor preço</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Na {`MoveLar`} você encontra sofás, racks, camas, guarda-roupas, colchões, mesas, cadeiras, geladeiras, fogões e smart TVs das melhores marcas. Trabalhamos com produtos selecionados, entrega rápida e montagem gratuita nas cidades participantes. Navegue por categorias, confira os produtos mais buscados e fale diretamente com um vendedor pelo WhatsApp — sem checkout complicado, atendimento humano e ágil para te ajudar a escolher.
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Todos os produtos possuem página individual com fotos, descrição, especificações técnicas e botão direto para WhatsApp. Use a busca para encontrar por nome, marca ou categoria. Exemplo: pesquise por “sofá retrátil”, “geladeira inox” ou “TV 50 polegadas”.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map(c => (
              <Link key={c.slug} href={`/categoria/${c.slug}`} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium hover:bg-white">{c.nome}</Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
