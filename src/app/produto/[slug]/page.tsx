import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import { whatsappForProduct } from "@/lib/whatsapp";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  // categoria usada apenas para SEO se necessário
  return {
    title: product.nome,
    description: product.descricao.slice(0, 155),
    alternates: { canonical: `${siteConfig.url}/produto/${product.slug}` },
    openGraph: {
      title: product.nome,
      description: product.descricao,
      url: `${siteConfig.url}/produto/${product.slug}`,
      images: [{ url: product.imagens[0], alt: product.nome }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.nome,
      description: product.descricao,
      images: [product.imagens[0]],
    },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const cat = getCategoryBySlug(product.categoria);
  const related = getRelatedProducts(product);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nome,
    description: product.descricao,
    image: product.imagens,
    brand: product.marca ? { "@type": "Brand", name: product.marca } : undefined,
    category: cat?.nome,
    sku: product.id,
    offers: product.preco
      ? {
          "@type": "Offer",
          priceCurrency: "BRL",
          price: product.precoPromocional ?? product.preco,
          availability: product.disponivel ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: `${siteConfig.url}/produto/${product.slug}`,
        }
      : undefined,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: cat?.nome ?? product.categoria, href: `/categoria/${product.categoria}` },
          { label: product.nome },
        ]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <div className="mt-6 grid lg:grid-cols-2 gap-8 lg:gap-10">
        {/* Galeria */}
        <ProductGallery imagens={product.imagens} nome={product.nome} />

        {/* Info */}
        <div>
          {cat && (
            <Link href={`/categoria/${cat.slug}`} className="text-xs font-semibold uppercase tracking-wide text-orange-600 hover:text-orange-700">
              {cat.nome}
            </Link>
          )}
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">{product.nome}</h1>
          {product.marca && <p className="mt-1 text-sm text-zinc-500">Marca: <span className="font-medium text-zinc-700">{product.marca}</span></p>}

          {/* preco */}
          <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
            {product.precoPromocional ? (
              <>
                <p className="text-xs text-zinc-500 line-through">{formatPrice(product.preco)}</p>
                <p className="text-2xl font-bold text-zinc-900">{formatPrice(product.precoPromocional)}</p>
                <p className="text-xs font-semibold text-green-600 mt-1">Economize {formatPrice((product.preco ?? 0) - product.precoPromocional)}</p>
              </>
            ) : product.preco ? (
              <p className="text-2xl font-bold text-zinc-900">{formatPrice(product.preco)}</p>
            ) : (
              <p className="text-base font-semibold text-zinc-700">Consulte preço com vendedor</p>
            )}
            <p className="text-xs text-zinc-500 mt-2">Em até 12x sem juros no cartão • Frete e montagem grátis (consulte cidades)</p>

            <a
              href={whatsappForProduct(product.nome)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#20bd5a] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.54 2 2.07 6.46 2.07 11.94a9.88 9.88 0 0 0 1.34 4.96L2 22l5.26-1.38a9.8 9.8 0 0 0 4.77 1.22h.01c5.49 0 9.96-4.46 9.96-9.95a9.78 9.78 0 0 0-2.95-6.98Zm-7.02 15.1h-.01a8.16 8.16 0 0 1-4.15-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.3 8.3 0 0 1-1.27-4.22c0-4.6 3.74-8.34 8.35-8.34 2.23 0 4.32.87 5.89 2.44a8.28 8.28 0 0 1 2.45 5.89c0 4.6-3.74 8.33-8.33 8.33Zm6.82-8.91c-.37-.19-2.2-1.09-2.54-1.21-.34-.12-.59-.19-.84.19-.24.37-.96 1.21-1.18 1.46-.22.25-.45.28-.82.09-.37-.19-1.56-.58-2.97-1.84-1.1-.98-1.84-2.19-2.06-2.56-.22-.37-.02-.57.17-.76.17-.17.37-.45.56-.67.18-.22.24-.37.37-.62.12-.25.06-.47-.03-.65-.09-.19-.84-2.02-1.15-2.77-.3-.72-.61-.62-.84-.63l-.72-.01c-.25 0-.65.09-.99.47-.34.37-1.3 1.27-1.3 3.1s1.33 3.6 1.52 3.85c.18.25 2.62 4 6.35 5.61.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.11 2.2-.9 2.51-1.77.31-.87.31-1.62.22-1.77-.09-.15-.34-.24-.71-.43Z"/></svg>
              Falar com um vendedor no WhatsApp
            </a>
            <p className="mt-2 text-center text-xs text-zinc-500">Atendimento rápido • Resposta em minutos</p>
          </div>

          {/* infos extras */}
          <div className="mt-6 space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">Descrição</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{product.descricao}</p>
            </div>

            {product.dimensoes && (
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Dimensões</h3>
                <p className="mt-1 text-sm text-zinc-600">{product.dimensoes}</p>
              </div>
            )}

            {product.cores && (
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Cores disponíveis</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.cores.map((c) => (
                    <span key={c} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium">{c}</span>
                  ))}
                </div>
              </div>
            )}

            {product.especificacoes && (
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Especificações técnicas</h3>
                <dl className="mt-2 divide-y divide-zinc-200 rounded-xl border border-zinc-200 overflow-hidden">
                  {Object.entries(product.especificacoes).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 bg-white px-4 py-2.5 text-sm">
                      <dt className="font-medium text-zinc-700">{k}</dt>
                      <dd className="text-zinc-600 text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="flex gap-2 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-700 border border-green-200">✓ Frete grátis</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700 border border-blue-200">✓ Montagem grátis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="mt-12 sm:mt-16">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900">Você também pode gostar</h2>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
