import { useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { handleAnchorClick, scrollToTop } from "../utils/smoothScroll";
import { useAuth } from "../context/AuthContext";

const LINKS = [
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Sobre", href: "#sobre" },
];

interface NavbarProps {
  /** Usada em páginas sem as seções âncora (ex: "Em breve"): esconde os links de navegação in-page. */
  minimal?: boolean;
}

const Navbar = ({ minimal = false }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="flex items-center gap-3" onClick={handleLogoClick}>
          <img src="/img/Logo.png" alt="Logo UniqueS" className="h-8 w-auto" />
          <span className="font-display text-2xl tracking-wide text-ink">UniqueS</span>
        </Link>

        {!minimal && (
          <nav className="hidden items-center gap-10 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-xs font-medium uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div className={`items-center gap-4 ${minimal ? "flex" : "hidden md:flex"}`}>
          {user?.role === "ADMIN" && (
            <Link
              to="/admin"
              className="text-xs font-medium uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-ink"
            >
              Admin
            </Link>
          )}
          {user?.questionnaire && (
            <Link
              to="/resultados"
              className="text-xs font-medium uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-ink"
            >
              Minha Rotina
            </Link>
          )}
          <Link
            to={user ? "/perfil" : "/login"}
            className="text-xs font-medium uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-ink"
          >
            {user ? user.name.split(" ")[0] : "Entrar"}
          </Link>
          <Link
            to="/questionario"
            className="rounded-full border border-ink px-6 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Fazer o Quiz
            {user?.questionnaire ? "Refazer Quiz" : "Fazer o Quiz"}
          </Link>
        </div>

        {!minimal && (
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="flex flex-col gap-1.5 md:hidden"
          >
            <span className="h-px w-6 bg-ink" />
            <span className="h-px w-6 bg-ink" />
          </button>
        )}
      </div>

      {!minimal && open && (
        <div className="flex flex-col gap-1 border-t border-ink/10 bg-cream px-6 py-6 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                setOpen(false);
                handleAnchorClick(e, link.href);
              }}
              className="py-3 text-xs font-medium uppercase tracking-[0.18em] text-ink/70"
            >
              {link.label}
            </a>
          ))}
          {user?.role === "ADMIN" && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="py-3 text-xs font-medium uppercase tracking-[0.18em] text-ink/70"
            >
              Admin
            </Link>
          )}
          {user?.questionnaire && (
            <Link
              to="/resultados"
              onClick={() => setOpen(false)}
              className="py-3 text-xs font-medium uppercase tracking-[0.18em] text-ink/70"
            >
              Minha Rotina
            </Link>
          )}
          <Link
            to={user ? "/perfil" : "/login"}
            onClick={() => setOpen(false)}
            className="py-3 text-xs font-medium uppercase tracking-[0.18em] text-ink/70"
          >
            {user ? user.name.split(" ")[0] : "Entrar"}
          </Link>
          <Link
            to="/questionario"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full border border-ink px-6 py-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-ink"
          >
            Fazer o Quiz
            {user?.questionnaire ? "Refazer Quiz" : "Fazer o Quiz"}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
