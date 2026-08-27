"use client";
import { useState, useEffect } from "react";
import { products as initialProducts } from "@/data/products";
import { categories } from "@/data/categories";
import type { Product } from "@/types/product";

const STORAGE_KEY = "movelar_admin_products";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch {}
    }
    if (sessionStorage.getItem("admin_authed") === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (products !== initialProducts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  const handleLogin = () => {
    if (pass === "admin123") {
      setAuthed(true);
      sessionStorage.setItem("admin_authed", "1");
    } else alert("Senha incorreta. Dica: admin123 (você pode trocar depois)");
  };

  const openNew = () => {
    setEditing(null);
    setForm({ categoria: categories[0].slug, disponivel: true, maisBuscado: false, recemChegado: false, imagens: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"] });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm(p);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.nome || !form.categoria || !form.descricao) {
      alert("Preencha nome, categoria e descrição");
      return;
    }
    const slug = form.slug || slugify(form.nome!);
    const product: Product = {
      id: editing?.id || Date.now().toString(),
      nome: form.nome!,
      slug,
      categoria: form.categoria!,
      marca: form.marca,
      descricao: form.descricao!,
      preco: form.preco ? Number(form.preco) : undefined,
      precoPromocional: form.precoPromocional ? Number(form.precoPromocional) : undefined,
      imagens: form.imagens && form.imagens.length ? form.imagens! : ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"],
      dimensoes: form.dimensoes,
      cores: form.cores,
      especificacoes: form.especificacoes,
      disponivel: true,
      maisBuscado: !!form.maisBuscado,
      recemChegado: !!form.recemChegado,
      destaque: !!form.destaque,
    };

    if (editing) setProducts((prev) => prev.map((x) => (x.id === editing.id ? product : x)));
    else setProducts((prev) => [product, ...prev]);

    setShowForm(false);
    setForm({});
  };

  const handleDelete = (id: string) => {
    if (!confirm("Remover este produto?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const exportJson = JSON.stringify(products, null, 2);

  const copyExport = async () => {
    await navigator.clipboard.writeText(exportJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6">
          <h1 className="text-lg font-bold">Painel Admin - MoveLar</h1>
          <p className="text-sm text-zinc-500 mt-1">Digite a senha para acessar. Padrão: <code className="bg-zinc-100 px-1 rounded">admin123</code></p>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Senha"
            className="mt-4 w-full rounded-full border border-zinc-300 px-4 py-2.5 text-sm focus:border-zinc-900 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button onClick={handleLogin} className="mt-3 w-full rounded-full bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800">Entrar</button>
          <p className="mt-3 text-xs text-zinc-400">Troque a senha depois em src/app/admin/page.tsx: linha do pass === "admin123"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-10 bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Painel de Produtos</h1>
            <p className="text-xs text-zinc-500">{products.length} produtos • Edição visual sem código</p>
          </div>
          <div className="flex gap-2">
            <button onClick={openNew} className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">+ Novo produto</button>
            <button onClick={copyExport} className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50">{copied ? "Copiado!" : "Copiar JSON"}</button>
            <button onClick={() => { sessionStorage.removeItem("admin_authed"); setAuthed(false); }} className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm">Sair</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <p className="font-semibold text-amber-900">Como salvar no site oficial (GitHub):</p>
          <ol className="list-decimal ml-5 mt-2 space-y-1 text-amber-800">
            <li>Clique em <b>Copiar JSON</b> acima</li>
            <li>Vá no GitHub &gt; <code>src/data/products.ts</code> &gt; lápis &gt; apague tudo entre <code>[</code> e <code>]</code> e cole o JSON copiado</li>
            <li>Volte o cabeçalho: <code>import type &#123; Product &#125; from "@/types/product"; export const products: Product[] = </code> + JSON colado + <code>;</code></li>
            <li>Clique <b>Commit changes</b>. A Vercel atualiza em 1 min. <br /><span className="text-xs">Dica: use também o botão "Baixar JSON" abaixo para backup.</span></li>
          </ol>
          <div className="mt-3 flex gap-2">
            <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(exportJson)}`} download="products.json" className="rounded-full bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-700">Baixar JSON</a>
            <button onClick={() => { if (confirm("Restaurar dados originais?")) { localStorage.removeItem(STORAGE_KEY); setProducts(initialProducts); } }} className="rounded-full border border-amber-300 bg-white px-4 py-1.5 text-xs font-semibold">Restaurar original</button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.id} className="flex gap-3 rounded-2xl border border-zinc-200 bg-white p-3">
              <img src={p.imagens[0]} alt="" className="h-20 w-20 rounded-xl object-cover bg-zinc-100" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-500 uppercase">{p.categoria}</p>
                <p className="text-sm font-semibold truncate">{p.nome}</p>
                <p className="text-xs text-zinc-500 truncate">{p.descricao.slice(0, 60)}...</p>
                <p className="text-sm font-bold mt-1">{p.precoPromocional ? `R$ ${p.precoPromocional}` : p.preco ? `R$ ${p.preco}` : "Consulte"}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => openEdit(p)} className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold hover:bg-zinc-50">Editar</button>
                <button onClick={() => handleDelete(p.id)} className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-100">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 max-h-[90vh] overflow-auto">
            <h2 className="text-lg font-bold">{editing ? "Editar produto" : "Novo produto"}</h2>

            <div className="mt-4 grid gap-3">
              <label className="text-sm font-medium">Nome *<input value={form.nome || ""} onChange={(e) => setForm({ ...form, nome: e.target.value, slug: slugify(e.target.value) })} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" placeholder="Ex: Sofá Retrátil 3 Lugares" /></label>
              <label className="text-sm font-medium">Slug (URL) <input value={form.slug || ""} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" placeholder="sofa-retratil-3-lugares" /></label>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm font-medium">Categoria *<select value={form.categoria || ""} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm">{categories.map((c) => <option key={c.slug} value={c.slug}>{c.nome}</option>)}</select></label>
                <label className="text-sm font-medium">Marca <input value={form.marca || ""} onChange={(e) => setForm({ ...form, marca: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" placeholder="MoveLar" /></label>
              </div>

              <label className="text-sm font-medium">Descrição *<textarea value={form.descricao || ""} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></label>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm font-medium">Preço (R$) <input type="number" value={form.preco || ""} onChange={(e) => setForm({ ...form, preco: e.target.value as unknown as number })} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></label>
                <label className="text-sm font-medium">Preço promocional <input type="number" value={form.precoPromocional || ""} onChange={(e) => setForm({ ...form, precoPromocional: e.target.value as unknown as number })} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></label>
              </div>

              <label className="text-sm font-medium">Imagem URL *<input value={form.imagens?.[0] || ""} onChange={(e) => setForm({ ...form, imagens: [e.target.value] })} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" placeholder="https://... ou /produtos/foto.jpg" /></label>
              {form.imagens?.[0] && <img src={form.imagens[0]} alt="preview" className="h-32 w-full object-cover rounded-xl border" />}

              <label className="text-sm font-medium">Dimensões <input value={form.dimensoes || ""} onChange={(e) => setForm({ ...form, dimensoes: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" placeholder="2,00m x 1,00m x 0,90m" /></label>

              <div className="flex gap-4 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.maisBuscado} onChange={(e) => setForm({ ...form, maisBuscado: e.target.checked })} /> Mais buscado</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.recemChegado} onChange={(e) => setForm({ ...form, recemChegado: e.target.checked })} /> Recém-chegado</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.destaque} onChange={(e) => setForm({ ...form, destaque: e.target.checked })} /> Destaque</label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="rounded-full border border-zinc-200 px-5 py-2 text-sm font-semibold">Cancelar</button>
              <button onClick={handleSave} className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
