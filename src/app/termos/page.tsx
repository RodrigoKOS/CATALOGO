import type { Metadata } from "next";
export const metadata: Metadata = { title: "Termos de Uso" };
export default function TermosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Termos de Uso</h1>
      <p className="mt-4 text-sm leading-6 text-zinc-600">Página de demonstração. Preços, disponibilidade e condições de frete/montagem grátis devem ser confirmados diretamente com um vendedor via WhatsApp. Conteúdo de exemplo.</p>
    </div>
  );
}
