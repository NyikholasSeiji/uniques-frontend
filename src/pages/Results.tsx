import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getMyQuestionnaire } from "../services/users";
import type { Product } from "../types/product";
import type { QuestionnaireData, QuestionnaireResponse } from "../types/user";

interface ResultsState {
  products: Product[];
  skinType?: string | null;
  concerns?: string[];
  questionnaire?: QuestionnaireData;
}

const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Results() {
  const location = useLocation();
  const state = location.state as ResultsState | null;

  const [loading, setLoading] = useState(!state && !!localStorage.getItem("token"));
  const [savedData, setSavedData] = useState<QuestionnaireResponse | null>(null);

  useEffect(() => {
    if (state) return;
    if (!localStorage.getItem("token")) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getMyQuestionnaire()
      .then((data) => {
        if (data.questionnaire) {
          setSavedData(data);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar questionário salvo:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [state]);

  if (loading) {
    return (
      <>
        <Navbar minimal />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink/20 border-t-ink" />
        </div>
        <Footer minimal />
      </>
    );
  }

  const hasData = state !== null || savedData?.questionnaire != null;

  if (!hasData) {
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

  const products = state?.products ?? savedData?.recommendations ?? [];
  const questionnaire =
    state?.questionnaire ??
    savedData?.questionnaire ??
    (state?.skinType || state?.concerns?.length
      ? {
          skinType: state.skinType ?? undefined,
          concerns: state.concerns ?? [],
        }
      : undefined);

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

        {questionnaire && (
          <div className="mt-8 rounded-2xl border border-ink/10 bg-sand/30 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
                  Preferências da sua pele
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {questionnaire.skinType && (
                    <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium capitalize text-cream">
                      {questionnaire.skinType}
                    </span>
                  )}
                  {questionnaire.concerns?.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-ink/20 bg-cream/70 px-3 py-1 text-xs uppercase tracking-wide text-ink/80"
                    >
                      {c}
                    </span>
                  ))}
                  {questionnaire.maxPrice ? (
                    <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-ink/80">
                      Até {formatPrice(questionnaire.maxPrice)}
                    </span>
                  ) : null}
                  {questionnaire.categories?.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-ink/15 bg-cream/60 px-2.5 py-1 text-xs text-ink/70"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to="/questionario"
                className="self-start sm:self-center shrink-0 rounded-full border border-ink px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                Refazer Quiz
              </Link>
            </div>
          </div>
        )}

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
