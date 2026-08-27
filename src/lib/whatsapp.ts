import { siteConfig } from "@/config/site";

export function getWhatsAppLink(message: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  const text = encodeURIComponent(message);
  return `${base}?text=${text}`;
}

export function whatsappForProduct(nome: string) {
  return getWhatsAppLink(
    `Olá! Tenho interesse no produto *${nome}*. Gostaria de saber mais informações.`
  );
}

export function whatsappGeral() {
  return getWhatsAppLink(
    `Olá! Gostaria de mais informações sobre os produtos da ${siteConfig.name}.`
  );
}
