import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Product } from "../types/product";

interface ResultsState {
  products: Product[];
  skinType: string | null;
  concerns: string[];
}

const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Results() {
  const location = useLocation();
  const state = location.state as ResultsState | null;

  if (!state) {
    return (
      <>
        <Navbar minimal />
        <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center lg:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Resultados
          </p>
          <h1 className="mt-6 font-display text-4xl font-medium leading-tight tracking-wide text-ink sm:text-5xl">
            Faça o quiz para ver sua rotina
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/60">
            Responda ao nosso quiz rápido para receber recomendações de produtos feitas para a sua pele.
          </p>
          <Link
            to="/questionario"
            className="mt-10 rounded-full bg-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-gold"
          >
            Fazer o Quiz
          </Link>
        </section>
        <Footer minimal />
      </>
    );
  }

  const { products } = state;

  return (
    <>
      <Navbar minimal />
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          Resultados
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-wide text-ink sm:text-5xl">
          Sua rotina personalizada
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/60">
          {products.length > 0
            ? "Selecionamos os produtos com melhor combinação para o que você respondeu."
            : "Não encontramos produtos para essa combinação ainda."}
        </p>

        {products.length > 0 ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col rounded-2xl bg-sand/60 p-6">
                {product.category && (
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                    {product.category}
                  </span>
                )}
                <h2 className="mt-3 font-display text-xl font-medium tracking-wide text-ink">
                  {product.name}
                </h2>
                {product.description && (
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {product.description}
                  </p>
                )}
                <p className="mt-4 text-sm font-medium text-ink">{formatPrice(product.price)}</p>
                {!!product.skinConditions?.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.skinConditions.map((condition) => (
                      <span
                        key={condition}
                        className="rounded-full border border-ink/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-ink/60"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Link
            to="/questionario"
            className="mt-10 inline-block rounded-full border border-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Refazer o Quiz
          </Link>
        )}
      </section>
      <Footer minimal />
    </>
  );
}
