import type { Metadata } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Todos os produtos",
  description: "Confira o catálogo completo de móveis e eletrodomésticos da MoveLar. Sofás, camas, TVs, colchões e mais com frete e montagem grátis.",
  alternates: { canonical: `${siteConfig.url}/produtos` },
};

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string; categoria?: string }>;
}) {
  const params = await searchParams;
  let filtered = [...products];
  let titulo = "Todos os produtos";
  let descricao = `${products.length} produtos encontrados`;

  if (params.filtro === "ofertas") {
    filtered = filtered.filter((p) => p.precoPromocional);
    titulo = "Ofertas da semana";
    descricao = `${filtered.length} produtos em oferta`;
  } else if (params.categoria) {
    filtered = filtered.filter((p) => p.categoria === params.categoria);
    const cat = categories.find((c) => c.slug === params.categoria);
    titulo = cat ? cat.nome : "Produtos";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: titulo }]} />
      <div className="mt-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">{titulo}</h1>
        <p className="mt-2 text-sm text-zinc-500">{descricao} • Entrega e montagem grátis nas cidades participantes</p>
      </div>

      {/* Filtros por categoria */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
        <a
          href="/produtos"
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border ${!params.filtro && !params.categoria ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200 hover:bg-zinc-50"}`}
        >
          Todos
        </a>
        <a
          href="/produtos?filtro=ofertas"
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border ${params.filtro === "ofertas" ? "bg-orange-600 text-white border-orange-600" : "bg-white border-zinc-200 hover:bg-zinc-50"}`}
        >
          Ofertas
        </a>
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`/produtos?categoria=${c.slug}`}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border ${params.categoria === c.slug ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200 hover:bg-zinc-50"}`}
          >
            {c.nome}
          </a>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-zinc-500">Nenhum produto encontrado neste filtro.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
