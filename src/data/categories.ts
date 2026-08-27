import type { Category } from "@/types/product";

export const categories: Category[] = [
  {
    id: "1",
    nome: "Sala de Estar",
    slug: "sala-de-estar",
    imagem: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop",
    descricao: "Sofás, racks, estantes e mais",
  },
  {
    id: "2",
    nome: "Quarto",
    slug: "quarto",
    imagem: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400&auto=format&fit=crop",
    descricao: "Camas, guarda-roupas, colchões",
  },
  {
    id: "3",
    nome: "Cozinha",
    slug: "cozinha",
    imagem: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&auto=format&fit=crop",
    descricao: "Armários, mesas e cadeiras",
  },
  {
    id: "4",
    nome: "Eletrodomésticos",
    slug: "eletrodomesticos",
    imagem: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop",
    descricao: "Geladeiras, fogões, micro-ondas",
  },
  {
    id: "5",
    nome: "TVs",
    slug: "tvs",
    imagem: "https://images.unsplash.com/photo-1593359677879-a4bb92f367d8?q=80&w=400&auto=format&fit=crop",
    descricao: "Smart TVs de 32 a 85 polegadas",
  },
  {
    id: "6",
    nome: "Colchões",
    slug: "colchoes",
    imagem: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=400&auto=format&fit=crop",
    descricao: "Conforto para seu descanso",
  },
  {
    id: "7",
    nome: "Cadeiras",
    slug: "cadeiras",
    imagem: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=400&auto=format&fit=crop",
    descricao: "Cadeiras e poltronas",
  },
  {
    id: "8",
    nome: "Mesas",
    slug: "mesas",
    imagem: "https://images.unsplash.com/photo-1533090484-07cc44088d55?q=80&w=400&auto=format&fit=crop",
    descricao: "Mesas de jantar, centro e escritório",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
