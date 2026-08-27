"use client";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-200">
      {/* top bar */}
      <div className="bg-zinc-900 text-zinc-100 text-xs text-center py-1.5 px-4">
        <span className="hidden sm:inline">Frete e montagem grátis — consulte cidades participantes • </span>
        <a href={`tel:${siteConfig.phone}`} className="underline-offset-2 hover:underline">
          {siteConfig.phone}
        </a>
        <span className="mx-2">•</span>
        <span>{siteConfig.hours}</span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
         <img src="/logo.png" alt="Sua Loja" className="h-9 w-auto" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-700">
            <Link href="/" className="hover:text-zinc-900">Início</Link>
            <Link href="/categorias" className="hover:text-zinc-900">Categorias</Link>
            <Link href="/produtos" className="hover:text-zinc-900">Produtos</Link>
            <Link href="/produtos?filtro=ofertas" className="hover:text-zinc-900">Ofertas</Link>
          </nav>

          {/* Search */}
          <form
            action="/buscar"
            method="GET"
            className="hidden md:flex flex-1 max-w-md items-center"
            role="search"
            aria-label="Buscar produtos"
          >
            <div className="relative w-full">
              <input
                type="search"
                name="q"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por produto, marca ou categoria..."
                className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2.5 pl-4 pr-10 text-sm placeholder:text-zinc-400 focus:bg-white focus:border-zinc-900 focus:outline-none"
                aria-label="Buscar produtos"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 rounded-full bg-zinc-900 px-3 text-white hover:bg-zinc-800"
                aria-label="Pesquisar"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
              </button>
            </div>
          </form>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <a
              href={getWhatsAppLink(`Olá! Gostaria de falar com um vendedor da ${siteConfig.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#20bd5a] transition-colors"
              aria-label="Falar no WhatsApp"
              onClick={() => {
                // analytics placeholder
                if (typeof window !== "undefined") {
                  const w = window as unknown as { dataLayer?: unknown[] };
                  w.dataLayer?.push({ event: "whatsapp_click", location: "header" });
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.54 2 2.07 6.46 2.07 11.94a9.88 9.88 0 0 0 1.34 4.96L2 22l5.26-1.38a9.8 9.8 0 0 0 4.77 1.22h.01c5.49 0 9.96-4.46 9.96-9.95a9.78 9.78 0 0 0-2.95-6.98Zm-7.02 15.1h-.01a8.16 8.16 0 0 1-4.15-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.3 8.3 0 0 1-1.27-4.22c0-4.6 3.74-8.34 8.35-8.34 2.23 0 4.32.87 5.89 2.44a8.28 8.28 0 0 1 2.45 5.89c0 4.6-3.74 8.33-8.33 8.33Zm6.82-8.91c-.37-.19-2.2-1.09-2.54-1.21-.34-.12-.59-.19-.84.19-.24.37-.96 1.21-1.18 1.46-.22.25-.45.28-.82.09-.37-.19-1.56-.58-2.97-1.84-1.1-.98-1.84-2.19-2.06-2.56-.22-.37-.02-.57.17-.76.17-.17.37-.45.56-.67.18-.22.24-.37.37-.62.12-.25.06-.47-.03-.65-.09-.19-.84-2.02-1.15-2.77-.3-.72-.61-.62-.84-.63l-.72-.01c-.25 0-.65.09-.99.47-.34.37-1.3 1.27-1.3 3.1s1.33 3.6 1.52 3.85c.18.25 2.62 4 6.35 5.61.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.11 2.2-.9 2.51-1.77.31-.87.31-1.62.22-1.77-.09-.15-.34-.24-.71-.43Z"/></svg>
              WhatsApp
            </a>

            {/* mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white"
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form action="/buscar" method="GET" className="md:hidden pb-3" role="search">
          <div className="relative">
            <input
              name="q"
              type="search"
              placeholder="Buscar produtos..."
              className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2.5 pl-4 pr-10 text-sm focus:bg-white focus:border-zinc-900 focus:outline-none"
              aria-label="Buscar produtos"
            />
            <button type="submit" className="absolute right-1 top-1 bottom-1 rounded-full bg-zinc-900 px-3 text-white" aria-label="Pesquisar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
            </button>
          </div>
        </form>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden border-t border-zinc-200 bg-white">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1 text-sm font-medium">
            <Link onClick={() => setOpen(false)} href="/" className="rounded-lg px-3 py-2.5 hover:bg-zinc-50">Início</Link>
            <Link onClick={() => setOpen(false)} href="/categorias" className="rounded-lg px-3 py-2.5 hover:bg-zinc-50">Categorias</Link>
            <Link onClick={() => setOpen(false)} href="/produtos" className="rounded-lg px-3 py-2.5 hover:bg-zinc-50">Produtos</Link>
            <Link onClick={() => setOpen(false)} href="/produtos?filtro=ofertas" className="rounded-lg px-3 py-2.5 hover:bg-zinc-50">Ofertas</Link>
            <a
              href={getWhatsAppLink(`Olá! Gostaria de falar com um vendedor.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-white"
            >
              Falar no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
