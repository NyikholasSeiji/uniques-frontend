import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/errors";
import { parseSkinConditions } from "../utils/skinConditions";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [skinConditions, setSkinConditions] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setSubmitting(true);

    try {
      await register({
        name,
        email,
        password,
        skinConditions: parseSkinConditions(skinConditions),
      });
      navigate("/perfil");
    } catch (err) {
      setError(
        getErrorMessage(err, "Não foi possível criar sua conta. Tente novamente.", {
          409: "Este e-mail já está cadastrado.",
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
          Comece agora
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-wide text-ink">
          Criar conta
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          <FormField
            label="Nome"
            required
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormField
            label="E-mail"
            type="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormField
            label="Senha"
            type="password"
            required
            minLength={8}
            maxLength={72}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hint="Mínimo de 8 caracteres."
          />

          <FormField
            label="Confirmar senha"
            type="password"
            required
            minLength={8}
            maxLength={72}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <FormField
            label="Condições de pele (opcional)"
            placeholder="Ex: oleosidade, sensibilidade"
            value={skinConditions}
            onChange={(e) => setSkinConditions(e.target.value)}
            hint="Separe por vírgulas. Você pode preencher depois no seu perfil."
          />

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
