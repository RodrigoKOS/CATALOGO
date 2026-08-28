export type Product = {
  id: string;
  nome: string;
  slug: string;
  categoria: string; // slug da categoria
  marca?: string;
  descricao: string;
  preco?: number;
  precoPromocional?: number;
  imagens: string[];
  especificacoes?: Record<string, string>;
  dimensoes?: string;
  cores?: string[];
  destaque?: boolean;
  maisBuscado?: boolean;
  recemChegado?: boolean;
  disponivel?: boolean;
  ordem?: number;
};

export type Category = {
  id: string;
  nome: string;
  slug: string;
  imagem?: string;
  icone?: string;
  descricao?: string;
};

export type Banner = {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  cta: string;
  href: string; // /produto/[slug]
};
