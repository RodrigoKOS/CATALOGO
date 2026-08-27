"use client";
import { whatsappGeral } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappGeral()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] transition-colors lg:bottom-6 lg:right-6"
    >
      <img src="/whatsapp.png" alt="WhatsApp" className="h-7 w-7" />
  );
}
