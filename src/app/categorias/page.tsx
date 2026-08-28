import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/CategoryCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Categorias",
  description: "Navegue por todas as categorias da MoveLar: sala, quarto, cozinha, eletrodomésticos, TVs e mais.",
  alternates: { canonical: `${siteConfig.url}/categorias` },
};

export default function CategoriasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Categorias" }]} />
      <h1 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">Todas as categorias</h1>
      <p className="mt-2 text-sm text-zinc-500">Escolha uma categoria e encontre o produto ideal</p>
     <div className="mt-6 flex flex-wrap justify-center gap-4">
  {categories.map((c) => (
    <div key={c.slug} className="w-[calc(50%-8px)] sm:w-[180px]">
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </div>
  );
}
