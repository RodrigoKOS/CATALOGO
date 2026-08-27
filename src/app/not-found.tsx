import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
      <p className="text-sm font-semibold text-orange-600">Erro 404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">Página não encontrada</h1>
      <p className="mt-3 text-sm text-zinc-500">A página que você procura não existe ou foi movida.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white">Voltar ao início</Link>
        <Link href="/produtos" className="rounded-full border border-zinc-200 px-6 py-2.5 text-sm font-semibold">Ver produtos</Link>
      </div>
    </div>
  );
}
