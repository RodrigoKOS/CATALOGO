import Link from "next/link";
import type { Category } from "@/types/product";

const icons: Record<string, React.ReactNode> = {
  "sala-jantar": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 10h18M7 10V7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3"/><path d="M7 14a2 2 0 0 0-2 2v4h14v-4a2 2 0 0 0-2-2H7Z"/><path d="M9 20v-2M15 20v-2"/></svg>
  ),
  quarto: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 10h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7Z"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/><path d="M12 14h.01"/></svg>
  ),
  cozinha: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"/><path d="M7 8V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/><path d="M14 8V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/></svg>
  ),
  escritorio: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="7" width="18" height="10" rx="1"/><path d="M7 17v3M17 17v3M7 20h10"/><path d="M12 7v10"/></svg>
  ),
  "area-de-servico": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2"/></svg>
  ),
};

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white p-6 hover:shadow-md hover:border-zinc-300 transition-all text-center"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white group-hover:bg-[#ff2c2d] transition-colors">
        {icons[category.slug] ?? icons["sala-jantar"]}
      </span>
      <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-[#ff2c2d]">{category.nome}</h3>
    </Link>
  );
}
