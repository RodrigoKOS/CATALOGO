export function BenefitsBar() {
  return (
    <section aria-label="Benefícios" className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="flex gap-3 items-start">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-lg">🚚</span>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Frete Grátis</h3>
            <p className="text-xs text-zinc-500 leading-4 mt-1">Entrega grátis para cidades participantes. Consulte condições.</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-lg">🔧</span>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Montagem Grátis</h3>
            <p className="text-xs text-zinc-500 leading-4 mt-1">Equipe especializada sem custo adicional.</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-lg">📍</span>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Consulte Cidades</h3>
            <p className="text-xs text-zinc-500 leading-4 mt-1">Cobertura regional ampla. Fale com um vendedor.</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCF8C6] text-lg">💬</span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-zinc-900">Fale com um Vendedor</h3>
            <a href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20saber%20sobre%20frete%20e%20montagem%20gr%C3%A1tis." target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex text-xs font-semibold text-[#25D366] hover:underline">Chamar no WhatsApp →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
