import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await register({ name, email, password });
      navigate("/perfil");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError("Este e-mail já está cadastrado.");
      } else {
        setError("Não foi possível criar sua conta. Tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar minimal />
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-24 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          Comece agora
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-wide text-ink">
          Criar conta
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">
              Nome
            </span>
            <input
              type="text"
              required
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">
              E-mail
            </span>
            <input
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">
              Senha
            </span>
            <input
              type="password"
              required
              minLength={8}
              maxLength={72}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
            <span className="text-xs text-ink/40">Mínimo de 8 caracteres.</span>
          </label>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 rounded-full bg-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-gold disabled:opacity-50"
          >
            {submitting ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-8 text-sm text-ink/60">
          Já tem conta?{" "}
          <Link to="/login" className="font-medium text-ink underline underline-offset-4">
            Entrar
          </Link>
        </p>
      </section>
      <Footer minimal />
    </>
  );
}
