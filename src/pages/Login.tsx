import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/errors";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login({ email, password });
      navigate("/perfil");
    } catch (err) {
      setError(
        getErrorMessage(err, "Não foi possível entrar. Tente novamente.", {
          401: "E-mail ou senha incorretos.",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar minimal />
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-24 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          Bem-vinda de volta
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-wide text-ink">
          Entrar
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          <FormField
            label="E-mail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormField
            label="Senha"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 rounded-full bg-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-gold disabled:opacity-50"
          >
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-8 text-sm text-ink/60">
          Ainda não tem conta?{" "}
          <Link to="/registro" className="font-medium text-ink underline underline-offset-4">
            Cadastre-se
          </Link>
        </p>
      </section>
      <Footer minimal />
    </>
  );
}
