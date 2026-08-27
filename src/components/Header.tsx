"use client";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-[#ff2c2d] backdrop-blur border-b border-zinc-200">
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
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-100">
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
             <img src="/whatsapp.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
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
