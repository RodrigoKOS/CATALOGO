import type { Metadata } from "next";
import { searchProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Busque por produtos, categorias e marcas na MoveLar.",
  alternates: { canonical: `${siteConfig.url}/buscar` },
};

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? searchProducts(query) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: `Busca${query ? `: ${query}` : ""}` }]} />

      <div className="mt-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          {query ? `Resultados para "${query}"` : "Buscar produtos"}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {query ? `${results.length} produto(s) encontrado(s)` : "Digite o nome, marca ou categoria"}
        </p>
      </div>

      {/* campo busca */}
      <form action="/buscar" method="GET" className="mt-6 max-w-xl" role="search">
        <div className="relative">
          <input
            name="q"
            defaultValue={query}
            placeholder="Ex: sofá retrátil, geladeira, TV 50..."
            className="w-full rounded-full border border-zinc-300 bg-white py-3 pl-4 pr-12 text-sm focus:border-zinc-900 focus:outline-none"
            aria-label="Buscar produtos"
          />
          <button type="submit" className="absolute right-1 top-1 bottom-1 rounded-full bg-zinc-900 px-4 text-white text-sm font-semibold">Buscar</button>
        </div>
      </form>

      {query && results.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 p-10 text-center">
          <p className="font-medium text-zinc-900">Não encontramos produtos para essa busca.</p>
          <p className="mt-2 text-sm text-zinc-500">Tente pesquisar por outro termo, como &quot;sofá&quot;, &quot;colchão&quot; ou &quot;TV&quot;.</p>
          <a href="/produtos" className="mt-6 inline-flex rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white">Ver todos os produtos</a>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
