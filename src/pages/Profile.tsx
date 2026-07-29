import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { changePassword, deleteUser, updateUser } from "../services/users";
import { getErrorMessage } from "../utils/errors";
import { parseSkinConditions } from "../utils/skinConditions";
import type { User } from "../types/user";

type FormStatus = { type: "success" | "error"; text: string } | null;

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // key={user.id}: reinicializa o estado local do formulário se o usuário logado mudar.
  return <ProfileContent key={user.id} user={user} />;
}

function ProfileContent({ user }: { user: User }) {
  const { setUser, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [skinConditions, setSkinConditions] = useState(user.skinConditions.join(", "));
  const [profileStatus, setProfileStatus] = useState<FormStatus>(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<FormStatus>(null);
  const [savingPassword, setSavingPassword] = useState(false);

  const [deleteError, setDeleteError] = useState<string | null>(null);

  const profileUnchanged =
    name.trim() === user.name && skinConditions === user.skinConditions.join(", ");

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProfileStatus(null);
    setSavingProfile(true);

    try {
      const updated = await updateUser(user.id, {
        name,
        skinConditions: parseSkinConditions(skinConditions),
      });
      setUser(updated);
      setProfileStatus({ type: "success", text: "Perfil atualizado com sucesso." });
    } catch (err) {
      setProfileStatus({
        type: "error",
        text: getErrorMessage(err, "Não foi possível atualizar seu perfil. Tente novamente."),
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmNewPassword) {
      setPasswordStatus({ type: "error", text: "As senhas não coincidem." });
      return;
    }

    setSavingPassword(true);

    try {
      await changePassword(user.id, { currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordStatus({ type: "success", text: "Senha alterada com sucesso." });
    } catch (err) {
      setPasswordStatus({
        type: "error",
        text: getErrorMessage(err, "Não foi possível alterar sua senha. Tente novamente.", {
          400: "Senha atual incorreta.",
        }),
      });
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
        <div className="mt-2 flex items-center gap-3">
          <p className="text-sm text-ink/60">{user.email}</p>
          <span className="rounded-full bg-sand px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink/60">
            {user.role === "ADMIN" ? "Administradora" : "Cliente"}
          </span>
        </div>

        <form onSubmit={handleProfileSubmit} className="mt-12 flex flex-col gap-5">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
            Dados pessoais
          </h2>

          <FormField
            label="Nome"
            required
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormField
            label="Condições de pele"
            placeholder="Ex: oleosidade, sensibilidade"
            value={skinConditions}
            onChange={(e) => setSkinConditions(e.target.value)}
            hint="Separe por vírgulas."
          />

          {profileStatus && (
            <p className={`text-sm ${profileStatus.type === "error" ? "text-red-700" : "text-ink/70"}`}>
              {profileStatus.text}
            </p>
          )}

          <button
            type="submit"
            disabled={savingProfile || profileUnchanged}
            className="mt-2 self-start rounded-full bg-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-gold disabled:opacity-50"
          >
            {savingProfile ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>

        <form onSubmit={handlePasswordSubmit} className="mt-16 flex flex-col gap-5 border-t border-ink/10 pt-10">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
            Alterar senha
          </h2>

          <FormField
            label="Senha atual"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <FormField
            label="Nova senha"
            type="password"
            required
            minLength={8}
            maxLength={72}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <FormField
            label="Confirmar nova senha"
            type="password"
            required
            minLength={8}
            maxLength={72}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          {passwordStatus && (
            <p className={`text-sm ${passwordStatus.type === "error" ? "text-red-700" : "text-ink/70"}`}>
              {passwordStatus.text}
            </p>
          )}

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
