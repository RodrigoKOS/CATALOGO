import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { whatsappForProduct } from "@/lib/whatsapp";
import { getCategoryBySlug } from "@/data/categories";

export function ProductCard({ product }: { product: Product }) {
  const cat = getCategoryBySlug(product.categoria);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white hover:shadow-lg hover:border-zinc-300 transition-all">
      <Link href={`/produto/${product.slug}`} className="relative aspect-[4/3] overflow-hidden bg-zinc-100 block">
        <Image
          src={product.imagens[0]}
          alt={product.nome}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.precoPromocional && (
          <span className="absolute left-3 top-3 rounded-full bg-orange-600 px-2.5 py-1 text-xs font-bold text-white shadow">OFERTA</span>
        )}
        {product.recemChegado && !product.precoPromocional && (
          <span className="absolute left-3 top-3 rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-bold text-white">NOVO</span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{cat?.nome ?? product.categoria}</p>
        <Link href={`/produto/${product.slug}`} className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-zinc-900 hover:text-orange-600">
          {product.nome}
        </Link>
        {product.marca && <p className="text-xs text-zinc-500 mt-0.5">{product.marca}</p>}

        <div className="mt-3">
          {product.precoPromocional ? (
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-zinc-900">{formatPrice(product.precoPromocional)}</span>
              <span className="text-xs line-through text-zinc-400">{formatPrice(product.preco)}</span>
            </div>
          ) : product.preco ? (
            <span className="text-base font-bold text-zinc-900">{formatPrice(product.preco)}</span>
          ) : (
            <span className="text-sm font-medium text-zinc-600">Consulte preço</span>
          )}
          {product.preco && <p className="text-xs text-zinc-500">ou em até 12x sem juros</p>}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={`/produto/${product.slug}`}
            className="inline-flex items-center justify-center rounded-full border border-zinc-900 px-3 py-2.5 text-xs font-semibold text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            Ver produto
          </Link>
          <a
            href={whatsappForProduct(product.nome)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#20bd5a] transition-colors"
            aria-label={`Falar no WhatsApp sobre ${product.nome}`}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
