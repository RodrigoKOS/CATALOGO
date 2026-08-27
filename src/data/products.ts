import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    "id": "1787865893449",
    "nome": "Cadeira cadeira",
    "slug": "cadeira-cadeira",
    "categoria": "sala-de-estar",
    "descricao": "cadeira cadeira cadeiracadeira cadeira cadeiracadeira cadeira cadeiracadeira cadeira cadeiracadeira cadeira cadeiracadeira cadeira cadeiracadeira cadeira cadeiracadeira cadeira cadeiracadeira cadeira cadeiracadeira cadeira cadeira",
    "imagens": [
      "https://cdn.vendizap.com/vendizap-produtos/b7b00a60470598d3e8c0c07af7a014dc.webp"
    ],
    "disponivel": true,
    "maisBuscado": false,
    "recemChegado": false,
    "destaque": false
  },
  // ... cole o resto dos 12 produtos que você já copiou aqui dentro
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.categoria === slug);
}
export function getMaisBuscados() {
  return products.filter((p) => p.maisBuscado);
}
export function getRecemChegados() {
  return products.filter((p) => p.recemChegado);
}
export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.categoria === product.categoria && p.id !== product.id)
    .slice(0, limit);
}
export function searchProducts(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.nome.toLowerCase().includes(q) ||
      p.categoria.toLowerCase().includes(q) ||
      (p.marca && p.marca.toLowerCase().includes(q)) ||
      p.descricao.toLowerCase().includes(q)
  );
}
