import type { Metadata } from "next";
export const metadata: Metadata = { title: "Política de Privacidade" };
export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Política de Privacidade</h1>
      <p className="mt-4 text-sm leading-6 text-zinc-600">Esta é uma página de demonstração. Substitua por sua política real de privacidade antes de publicar. Não coletamos dados pessoais sem consentimento. Ao clicar em WhatsApp você será redirecionado para o aplicativo.</p>
    </div>
  );
}
