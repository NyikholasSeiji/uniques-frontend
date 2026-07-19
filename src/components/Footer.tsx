import { Link } from "react-router-dom";
import { handleAnchorClick } from "../utils/smoothScroll";

interface FooterProps {
  /** Usada em páginas sem as seções âncora (ex: "Em breve"): esconde os links de navegação in-page. */
  minimal?: boolean;
}

const Footer = ({ minimal = false }: FooterProps) => (
  <footer className="border-t border-ink/10 bg-cream">
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <span className="font-display text-2xl tracking-wide text-ink">UniqueS</span>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            Cuidado de pele individualizado, pensado para durar. Sem fórmulas
            genéricas — apenas o que a sua pele realmente precisa.
          </p>
        </div>

        <div className="flex gap-16">
          {!minimal && (
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
                Navegação
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink/70">
                <li>
                  <a href="#como-funciona" onClick={(e) => handleAnchorClick(e, "#como-funciona")} className="hover:text-ink">Como Funciona</a>
                </li>
                <li>
                  <a href="#beneficios" onClick={(e) => handleAnchorClick(e, "#beneficios")} className="hover:text-ink">Benefícios</a>
                </li>
                <li>
                  <a href="#sobre" onClick={(e) => handleAnchorClick(e, "#sobre")} className="hover:text-ink">Sobre</a>
                </li>
              </ul>
            </div>
          )}

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
              Comece
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink/70">
              <li>
                <Link to="/questionario" className="hover:text-ink">Fazer o Quiz</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-ink/40 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} UniqueS. Todos os direitos reservados.</p>
        <p className="uppercase tracking-[0.18em]">Cuidado de pele, sob medida</p>
      </div>
    </div>
  </footer>
);

export default Footer;
