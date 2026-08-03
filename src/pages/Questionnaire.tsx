import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getRecommendations } from "../services/products";
import { getErrorMessage } from "../utils/errors";

const SKIN_TYPE_OPTIONS = [
  { value: "oleosa", label: "Oleosa" },
  { value: "seca", label: "Seca" },
  { value: "mista", label: "Mista" },
  { value: "normal", label: "Normal" },
  { value: "sensivel", label: "Sensível" },
];

const CONCERN_STEPS = [
  {
    question: "Você sente oleosidade ou espinhas com frequência?",
    options: [
      { value: "acne", label: "Acne" },
      { value: "poros dilatados", label: "Poros dilatados" },
    ],
  },
  {
    question: "Percebe manchas ou sinais de envelhecimento na sua pele?",
    options: [
      { value: "manchas", label: "Manchas" },
      { value: "envelhecimento", label: "Sinais de envelhecimento" },
    ],
  },
  {
    question: "Sua pele tem textura irregular, com relevo ou aspereza?",
    options: [{ value: "textura irregular", label: "Textura irregular" }],
  },
];

const TOTAL_STEPS = 1 + CONCERN_STEPS.length;

const optionButtonClassName = (selected: boolean) =>
  `cursor-pointer rounded-full border px-4 py-2.5 text-center text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
    selected ? "border-ink bg-ink text-cream" : "border-ink/15 text-ink/70 hover:border-ink"
  }`;

export default function Questionnaire() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [skinType, setSkinType] = useState<string | null>(null);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const toggleConcern = (value: string) => {
    setConcerns((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const isLastStep = step === TOTAL_STEPS - 1;

  const handleBack = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = async () => {
    setError(null);

    if (!isLastStep) {
      setStep((prev) => prev + 1);
      return;
    }

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

        <div className="mt-8 flex items-center gap-4">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full bg-gold transition-all"
              style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          <span className="shrink-0 text-xs text-ink/40">
            {step + 1} / {TOTAL_STEPS}
          </span>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          {step === 0 ? (
            <fieldset>
              <legend className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
                Qual é o seu tipo de pele?
              </legend>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SKIN_TYPE_OPTIONS.map((option) => (
                  <label key={option.value} className={optionButtonClassName(skinType === option.value)}>
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
          ) : (
            (() => {
              const concernStep = CONCERN_STEPS[step - 1];
              return (
                <fieldset>
                  <legend className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
                    {concernStep.question}
                  </legend>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {concernStep.options.map((option) => (
                      <label key={option.value} className={optionButtonClassName(concerns.includes(option.value))}>
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
              );
            })()
          )}

          {error && <p className="text-sm text-red-700">{error}</p>}

          <div className="mt-4 flex items-center gap-4">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="rounded-full border border-ink/15 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
              >
                Voltar
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={submitting}
              className="rounded-full bg-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-gold disabled:opacity-50"
            >
              {isLastStep ? (submitting ? "Montando sua rotina..." : "Ver minha rotina") : "Continuar"}
            </button>
          </div>
        </div>
      </section>
      <Footer minimal />
    </>
  );
}
