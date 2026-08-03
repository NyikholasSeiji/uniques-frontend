import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getRecommendations } from "../services/products";
import { getErrorMessage } from "../utils/errors";

const SKIN_TYPES = [
  { value: "oleosa", label: "Oleosa" },
  { value: "seca", label: "Seca" },
  { value: "mista", label: "Mista" },
  { value: "normal", label: "Normal" },
  { value: "sensivel", label: "Sensível" },
];

const CONCERNS = [
  { value: "acne", label: "Acne" },
  { value: "poros dilatados", label: "Poros dilatados" },
  { value: "manchas", label: "Manchas" },
  { value: "envelhecimento", label: "Sinais de envelhecimento" },
  { value: "textura irregular", label: "Textura irregular" },
];

export default function Questionnaire() {
  const navigate = useNavigate();

  const [skinType, setSkinType] = useState<string | null>(null);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const toggleConcern = (value: string) => {
    setConcerns((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (concerns.length === 0) {
      setError("Selecione ao menos uma preocupação com a sua pele.");
      return;
    }

    setSubmitting(true);

    try {
      const products = await getRecommendations({
        skinType: skinType ?? undefined,
        concerns,
      });
      navigate("/resultados", { state: { products, skinType, concerns } });
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível gerar sua rotina. Tente novamente."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar minimal />
      <section className="mx-auto max-w-2xl px-6 py-24 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">Quiz</p>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-wide text-ink sm:text-5xl">
          Conte sobre a sua pele
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/60">
          Leva menos de um minuto. Use as respostas para montar uma rotina sob medida para você.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-12">
          <fieldset>
            <legend className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
              Qual é o seu tipo de pele?
            </legend>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {SKIN_TYPES.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-full border px-4 py-2.5 text-center text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                    skinType === option.value
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/15 text-ink/70 hover:border-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name="skinType"
                    value={option.value}
                    checked={skinType === option.value}
                    onChange={() => setSkinType(option.value)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
              Quais são suas principais preocupações?
            </legend>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CONCERNS.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-full border px-4 py-2.5 text-center text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                    concerns.includes(option.value)
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/15 text-ink/70 hover:border-ink"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={concerns.includes(option.value)}
                    onChange={() => toggleConcern(option.value)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="self-start rounded-full bg-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-gold disabled:opacity-50"
          >
            {submitting ? "Montando sua rotina..." : "Ver minha rotina"}
          </button>
        </form>
      </section>
      <Footer minimal />
    </>
  );
}
