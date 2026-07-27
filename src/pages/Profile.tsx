import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { changePassword, deleteUser, updateUser } from "../services/users";
import { getErrorMessage } from "../utils/errors";

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? "");
  const [skinConditions, setSkinConditions] = useState(user?.skinConditions.join(", ") ?? "");
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [savingPassword, setSavingPassword] = useState(false);

  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSkinConditions(user.skinConditions.join(", "));
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProfileMessage(null);
    setProfileError(null);
    setSavingProfile(true);

    try {
      const updated = await updateUser(user.id, {
        name,
        skinConditions: skinConditions
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });
      setUser(updated);
      setProfileMessage("Perfil atualizado com sucesso.");
    } catch (err) {
      setProfileError(getErrorMessage(err, "Não foi possível atualizar seu perfil. Tente novamente."));
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    setPasswordError(null);

    if (newPassword !== confirmNewPassword) {
      setPasswordError("As senhas não coincidem.");
      return;
    }

    setSavingPassword(true);

    try {
      await changePassword(user.id, { currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordMessage("Senha alterada com sucesso.");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setPasswordError("Senha atual incorreta.");
      } else {
        setPasswordError(getErrorMessage(err, "Não foi possível alterar sua senha. Tente novamente."));
      }
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
    );
    if (!confirmed) return;

    setDeleteError(null);
    try {
      await deleteUser(user.id);
      logout();
      navigate("/");
    } catch (err) {
      setDeleteError(getErrorMessage(err, "Não foi possível excluir sua conta. Tente novamente."));
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar minimal />
      <section className="mx-auto max-w-2xl px-6 py-24 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          Minha conta
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-wide text-ink">
          Olá, {user.name}
        </h1>
        <p className="mt-2 text-sm text-ink/60">{user.email}</p>

        <form onSubmit={handleProfileSubmit} className="mt-12 flex flex-col gap-5">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
            Dados pessoais
          </h2>

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
              Condições de pele
            </span>
            <input
              type="text"
              placeholder="Ex: oleosidade, sensibilidade"
              value={skinConditions}
              onChange={(e) => setSkinConditions(e.target.value)}
              className="rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
            <span className="text-xs text-ink/40">Separe por vírgulas.</span>
          </label>

          {profileMessage && <p className="text-sm text-ink/70">{profileMessage}</p>}
          {profileError && <p className="text-sm text-red-700">{profileError}</p>}

          <button
            type="submit"
            disabled={savingProfile}
            className="mt-2 self-start rounded-full bg-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-gold disabled:opacity-50"
          >
            {savingProfile ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>

        <form onSubmit={handlePasswordSubmit} className="mt-16 flex flex-col gap-5 border-t border-ink/10 pt-10">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
            Alterar senha
          </h2>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">
              Senha atual
            </span>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">
              Nova senha
            </span>
            <input
              type="password"
              required
              minLength={8}
              maxLength={72}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">
              Confirmar nova senha
            </span>
            <input
              type="password"
              required
              minLength={8}
              maxLength={72}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
          </label>

          {passwordMessage && <p className="text-sm text-ink/70">{passwordMessage}</p>}
          {passwordError && <p className="text-sm text-red-700">{passwordError}</p>}

          <button
            type="submit"
            disabled={savingPassword}
            className="mt-2 self-start rounded-full border border-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-cream disabled:opacity-50"
          >
            {savingPassword ? "Alterando..." : "Alterar senha"}
          </button>
        </form>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60 underline underline-offset-4 hover:text-ink"
          >
            Sair da conta
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="text-xs font-medium uppercase tracking-[0.18em] text-red-700 underline underline-offset-4 hover:text-red-800"
          >
            Excluir conta
          </button>
        </div>
        {deleteError && <p className="mt-4 text-sm text-red-700">{deleteError}</p>}
      </section>
      <Footer minimal />
    </>
  );
}
