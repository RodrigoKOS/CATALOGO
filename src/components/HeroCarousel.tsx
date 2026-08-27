"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { banners } from "@/data/banners";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % banners.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + banners.length) % banners.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  // swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart == null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 50) prev();
    if (diff < -50) next();
    setTouchStart(null);
  };

  return (
    <section aria-label="Produtos recém-chegados" className="relative overflow-hidden rounded-none sm:rounded-2xl bg-zinc-900">
      <div
        className="relative h-[420px] sm:h-[460px] lg:h-[480px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {banners.map((b, i) => (
          <div
            key={b.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-hidden={i !== index}
          >
            <Image
              src={b.imagem}
              alt={b.titulo}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
                <div className="max-w-xl">
                  <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">RECÉM-CHEGADOS</p>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl text-balance">{b.titulo}</h2>
                  <p className="mt-3 text-sm sm:text-base text-zinc-200 line-clamp-2">{b.descricao}</p>
                  <Link href={b.href} className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors">
                    {b.cta} <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* arrows */}
        <button onClick={prev} aria-label="Slide anterior" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 hover:bg-white hidden sm:inline-flex">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={next} aria-label="Próximo slide" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 hover:bg-white hidden sm:inline-flex">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        {/* indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir para slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${i === index ? "w-7 bg-white" : "w-2 bg-white/60 hover:bg-white"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
