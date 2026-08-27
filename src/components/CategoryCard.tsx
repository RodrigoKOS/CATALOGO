import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types/product";
import { products } from "@/data/products";

export function CategoryCard({ category }: { category: Category }) {
  const count = products.filter((p) => p.categoria === category.slug).length;
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white hover:shadow-md transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <Image
          src={category.imagem}
          alt={category.nome}
          fill
          sizes="200px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-3 text-center">
        <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-orange-600">{category.nome}</h3>
        <p className="text-xs text-zinc-500 mt-0.5">{count} produtos</p>
      </div>
    </Link>
  );
}
