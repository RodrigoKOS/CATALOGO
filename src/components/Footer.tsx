import Link from "next/link";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold">M</span>
              <span className="font-bold text-xl tracking-tight">Move<span className="text-orange-600">Lar</span></span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-zinc-600 max-w-xs">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-sm text-zinc-600">
              <span className="block">{siteConfig.address}</span>
              <span className="block mt-1">{siteConfig.hours}</span>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Links rápidos</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li><Link href="/" className="hover:text-zinc-900">Início</Link></li>
              <li><Link href="/produtos" className="hover:text-zinc-900">Produtos</Link></li>
              <li><Link href="/categorias" className="hover:text-zinc-900">Categorias</Link></li>
              <li><Link href="/buscar" className="hover:text-zinc-900">Buscar</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Categorias</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              {categories.slice(0,6).map((c) => (
                <li key={c.slug}><Link href={`/categoria/${c.slug}`} className="hover:text-zinc-900">{c.nome}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Contato</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li><a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900">WhatsApp: {siteConfig.whatsappDisplay}</a></li>
              <li><a href={`mailto:${siteConfig.email}`} className="hover:text-zinc-900">{siteConfig.email}</a></li>
              <li className="flex gap-3 pt-2">
                <a href={siteConfig.social.instagram} aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white hover:bg-zinc-900 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                </a>
                <a href={siteConfig.social.facebook} aria-label="Facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white hover:bg-zinc-900 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.76 0-5 2.24-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.55.45-1 1-1Z"/></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados. Dados de demonstração.</p>
          <div className="flex gap-4">
            <Link href="/privacidade" className="hover:text-zinc-700">Privacidade</Link>
            <Link href="/termos" className="hover:text-zinc-700">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
