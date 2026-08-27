"use client";
import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ imagens, nome }: { imagens: string[]; nome: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="space-y-3">
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        onClick={() => setZoom(!zoom)}
        role="button"
        tabIndex={0}
        aria-label={zoom ? "Fechar zoom" : "Ampliar imagem"}
        onKeyDown={(e) => e.key === "Enter" && setZoom(!zoom)}
      >
        <Image
          src={imagens[active]}
          alt={`${nome} - imagem ${active + 1}`}
          fill
          priority
          sizes="(max-width:768px)100vw, 50vw"
          className={`object-cover transition-transform duration-300 ${zoom ? "scale-150" : "scale-100"}`}
        />
      </div>

      {imagens.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
          {imagens.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ver imagem ${i + 1}`}
              aria-current={i === active}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 snap-start ${i === active ? "border-zinc-900" : "border-transparent"}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="80px" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
