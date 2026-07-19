import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { handleAnchorClick } from "../utils/smoothScroll";

const STEPS = [
  {
    number: "01",
    title: "Responda ao Quiz",
    description:
      "Perguntas rápidas sobre sua pele, rotina e objetivos — leva menos de três minutos.",
  },
  {
    number: "02",
    title: "Receba seu Diagnóstico",
    description:
      "Nosso sistema analisa suas respostas e monta um perfil único da sua pele.",
  },
  {
    number: "03",
    title: "Sua Rotina, sob medida",
    description:
      "Uma seleção de cuidados pensada exclusivamente para você, sem excessos.",
  },
];

const BENEFITS = [
  {
    title: "Individualizado",
    description: "Nada de fórmulas genéricas. Cada recomendação parte do seu diagnóstico.",
  },
  {
    title: "Baseado em Ciência",
    description: "Ativos e combinações validados, sem modismos ou promessas vazias.",
  },
  {
    title: "Discreto e Simples",
    description: "Uma rotina enxuta, pensada para caber na sua vida sem complicar.",
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(169,136,95,0.25),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start px-6 py-28 lg:px-12 lg:py-40">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Skincare individualizado
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-5xl font-medium leading-[1.1] tracking-wide sm:text-6xl lg:text-7xl">
            Cuidado de pele, sob medida.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/70">
            Um diagnóstico rápido, uma rotina exclusiva. Sem fórmulas genéricas
            — apenas o que a sua pele realmente precisa.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/questionario"
              className="rounded-full bg-cream px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold hover:text-cream"
            >
              Fazer o Quiz Gratuito
            </Link>
            <a
              href="#como-funciona"
              onClick={(e) => handleAnchorClick(e, "#como-funciona")}
              className="rounded-full border border-cream/30 px-8 py-3.5 text-center text-xs font-medium uppercase tracking-[0.18em] text-cream/80 transition-colors hover:border-cream hover:text-cream"
            >
              Como Funciona
            </a>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Processo
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-wide sm:text-5xl">
            Como funciona
          </h2>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {STEPS.map((step) => (
            <div key={step.number} className="border-t border-ink/15 pt-6">
              <span className="font-display text-3xl text-gold">{step.number}</span>
              <h3 className="mt-4 text-lg font-medium tracking-wide text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="bg-sand/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Por que UniqueS
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-wide sm:text-5xl">
              Simplicidade que respeita a sua pele
            </h2>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl bg-cream p-8">
                <h3 className="font-display text-2xl font-medium tracking-wide text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre / CTA final */}
      <section id="sobre" className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="flex flex-col items-start gap-8 rounded-3xl bg-ink px-8 py-16 text-cream sm:px-16">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Comece agora
          </p>
          <h2 className="max-w-xl font-display text-4xl font-medium leading-tight tracking-wide sm:text-5xl">
            Descubra a rotina feita para você.
          </h2>
          <Link
            to="/questionario"
            className="rounded-full bg-cream px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold hover:text-cream"
          >
            Fazer o Quiz Gratuito
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
