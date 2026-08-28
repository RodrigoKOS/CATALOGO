import type { Category } from "@/types/product";

export const categories: Category[] = [
  {
    id: "1",
    nome: "Sala/Jantar",
    slug: "sala-jantar",
    icone: "sala-jantar",
    descricao: "Mesas, cadeiras, racks e sofás",
  },
  {
    id: "2",
    nome: "Quarto",
    slug: "quarto",
    icone: "quarto",
    descricao: "Camas, guarda-roupas, colchões",
  },
  {
    id: "3",
    nome: "Cozinha",
    slug: "cozinha",
    icone: "cozinha",
    descricao: "Armários e cozinhas compactas",
  },
  {
    id: "4",
    nome: "Escritório",
    slug: "escritorio",
    icone: "escritorio",
    descricao: "Mesas, cadeiras e estantes",
  },
  {
    id: "5",
    nome: "Área de Serviço",
    slug: "area-de-servico",
    icone: "area-de-servico",
    descricao: "Lavanderia e organização",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
