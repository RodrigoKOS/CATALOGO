import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: cat.nome,
    description: cat.descricao ?? `Confira os produtos da categoria ${cat.nome} na ${siteConfig.name}. Frete e montagem grátis.`,
    alternates: { canonical: `${siteConfig.url}/categoria/${cat.slug}` },
    openGraph: {
      title: `${cat.nome} | ${siteConfig.name}`,
      description: cat.descricao,
      url: `${siteConfig.url}/categoria/${cat.slug}`,
    },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();
  const produtos = getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Categorias", href: "/categorias" }, { label: cat.nome }]} />

      <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">{cat.nome}</h1>
          <p className="mt-2 text-sm text-zinc-500">{produtos.length} produtos • {cat.descricao}</p>
        </div>
      </div>

      {produtos.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 p-10 text-center">
          <p className="text-zinc-600">Nenhum produto cadastrado nesta categoria ainda.</p>
          <a href="/produtos" className="mt-4 inline-flex rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white">Ver todos os produtos</a>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {produtos.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* links internos SEO */}
      <div className="mt-12 rounded-2xl bg-white border border-zinc-200 p-6">
        <h2 className="text-sm font-semibold text-zinc-900">Outras categorias</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.filter(c=>c.slug!==slug).map(c=>(
            <a key={c.slug} href={`/categoria/${c.slug}`} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium hover:bg-white">{c.nome}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
