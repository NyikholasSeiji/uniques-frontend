import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ComingSoonProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

const ComingSoon = ({
  eyebrow = "Em breve",
  title = "Estamos preparando esta página",
  description = "Esta funcionalidade ainda está sendo construída. Volte em breve para conferir.",
}: ComingSoonProps) => (
  <>
    <Navbar minimal />
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center lg:px-12">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
        {eyebrow}
      </p>
      <h1 className="mt-6 font-display text-4xl font-medium leading-tight tracking-wide text-ink sm:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/60">
        {description}
      </p>
      <Link
        to="/"
        className="mt-10 rounded-full border border-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-cream"
      >
        Voltar para o início
      </Link>
    </section>
    <Footer minimal />
  </>
);

export default ComingSoon;
