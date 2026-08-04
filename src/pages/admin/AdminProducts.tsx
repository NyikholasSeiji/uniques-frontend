import { useEffect, useState, type FormEvent } from "react";
import FormField from "../../components/FormField";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../services/products";
import { getErrorMessage } from "../../utils/errors";
import { parseSkinConditions } from "../../utils/skinConditions";
import type { Product, ProductInput } from "../../types/product";

const emptyForm = {
  name: "",
  description: "",
  category: "",
  price: "",
  skinConditions: "",
  ingredients: "",
};

type FormState = typeof emptyForm;

const toFormState = (product: Product): FormState => ({
  name: product.name,
  description: product.description ?? "",
  category: product.category ?? "",
  price: String(product.price),
  skinConditions: (product.skinConditions ?? []).join(", "),
  ingredients: (product.ingredients ?? []).join(", "),
});

const toProductInput = (form: FormState): ProductInput => ({
  name: form.name,
  description: form.description || undefined,
  category: form.category || undefined,
  price: Number(form.price),
  skinConditions: parseSkinConditions(form.skinConditions),
  ingredients: parseSkinConditions(form.ingredients),
});

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setListError(getErrorMessage(err, "Não foi possível carregar os produtos.")))
      .finally(() => setLoading(false));
  }, []);

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setForm(toFormState(product));
    setFormError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError(null);
  };

  const updateField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);

    try {
      const input = toProductInput(form);
      if (editingId) {
        const updated = await updateProduct(editingId, input);
        setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
      } else {
        const created = await createProduct(input);
        setProducts((prev) => [...prev, created]);
      }
      cancelEdit();
    } catch (err) {
      setFormError(getErrorMessage(err, "Não foi possível salvar o produto."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (editingId === id) cancelEdit();
    } catch (err) {
      setListError(getErrorMessage(err, "Não foi possível excluir o produto."));
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
          {editingId ? "Editar produto" : "Novo produto"}
        </h2>

        <FormField label="Nome" required maxLength={200} value={form.name} onChange={updateField("name")} />
        <FormField label="Descrição" value={form.description} onChange={updateField("description")} />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Categoria" value={form.category} onChange={updateField("category")} />
          <FormField
            label="Preço"
            type="number"
            step="0.01"
            min="0"
            required
            value={form.price}
            onChange={updateField("price")}
          />
        </div>

        <FormField
          label="Condições de pele"
          placeholder="Ex: oleosa, acne"
          hint="Separe por vírgulas."
          value={form.skinConditions}
          onChange={updateField("skinConditions")}
        />
        <FormField
          label="Ingredientes"
          placeholder="Ex: niacinamida, retinol"
          hint="Separe por vírgulas."
          value={form.ingredients}
          onChange={updateField("ingredients")}
        />

        {formError && <p className="text-sm text-red-700">{formError}</p>}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="self-start rounded-full bg-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-gold disabled:opacity-50"
          >
            {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Adicionar produto"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60 underline underline-offset-4 hover:text-ink"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="border-t border-ink/10 pt-10">
        <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
          Produtos cadastrados
        </h2>

        {listError && <p className="mt-4 text-sm text-red-700">{listError}</p>}

        {loading ? (
          <p className="mt-6 text-sm text-ink/60">Carregando...</p>
        ) : products.length === 0 ? (
          <p className="mt-6 text-sm text-ink/60">Nenhum produto cadastrado ainda.</p>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-3 rounded-2xl bg-sand/60 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-ink">{product.name}</p>
                  <p className="text-xs text-ink/60">
                    {product.category ?? "Sem categoria"} · R$ {product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => startEdit(product)}
                    className="text-xs font-medium uppercase tracking-[0.18em] text-ink/70 underline underline-offset-4 hover:text-ink"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    className="text-xs font-medium uppercase tracking-[0.18em] text-red-700 underline underline-offset-4 hover:text-red-800"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
