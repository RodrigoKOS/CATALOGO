export const siteConfig = {
  name: "MoveLar",
  shortName: "MoveLar",
  description:
    "Catálogo online de móveis e eletrodomésticos com frete e montagem grátis. Encontre sofás, camas, guarda-roupas, TVs e muito mais.",
  url: "https://www.movelarexemplo.com.br",
  whatsappNumber: "5511999999999", // apenas números com DDI+DDD — centralizado
  whatsappDisplay: "(11) 99999-9999",
  email: "contato@movelarexemplo.com.br",
  phone: "(11) 99999-9999",
  address: "Rua Exemplo, 123 – Centro, São Paulo – SP",
  hours: "Seg a Sáb: 08h às 18h",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  // analytics — preencher depois
  gtmId: "",
  gaId: "",
} as const;

export const WHATSAPP_NUMBER = siteConfig.whatsappNumber;
