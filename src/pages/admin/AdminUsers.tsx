import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { deleteUser, getAllUsers, updateUserRole } from "../../services/users";
import { getErrorMessage } from "../../utils/errors";
import type { User } from "../../types/user";

export default function AdminUsers() {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch((err) => setListError(getErrorMessage(err, "Não foi possível carregar os usuários.")))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleRole = async (targetUser: User) => {
    const nextRole = targetUser.role === "ADMIN" ? "USER" : "ADMIN";
    setListError(null);
    setPendingId(targetUser.id);

    try {
      const updated = await updateUserRole(targetUser.id, nextRole);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch (err) {
      setListError(getErrorMessage(err, "Não foi possível alterar o cargo desse usuário."));
    } finally {
      setPendingId(null);
    }
  };

  const handleDelete = async (targetUser: User) => {
    const confirmed = window.confirm(`Tem certeza que deseja excluir a conta de ${targetUser.name}?`);
    if (!confirmed) return;

    setListError(null);
    setPendingId(targetUser.id);

    try {
      await deleteUser(targetUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
    } catch (err) {
      setListError(getErrorMessage(err, "Não foi possível excluir esse usuário."));
    } finally {
      setPendingId(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-ink/60">Carregando...</p>;
  }

  return (
    <div>
      <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
        Usuárias cadastradas
      </h2>

      {listError && <p className="mt-4 text-sm text-red-700">{listError}</p>}

      <div className="mt-6 flex flex-col gap-3">
        {users.map((targetUser) => {
          const isSelf = targetUser.id === currentUser?.id;
          const isPending = pendingId === targetUser.id;

          return (
            <div
              key={targetUser.id}
              className="flex flex-col gap-3 rounded-2xl bg-sand/60 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-ink">
                  {targetUser.name} {isSelf && <span className="text-xs text-ink/40">(você)</span>}
                </p>
                <p className="text-xs text-ink/60">{targetUser.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded-full bg-cream px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink/60">
                  {targetUser.role === "ADMIN" ? "Administradora" : "Cliente"}
                </span>
                <button
                  type="button"
                  disabled={isSelf || isPending}
                  onClick={() => handleToggleRole(targetUser)}
                  className="text-xs font-medium uppercase tracking-[0.18em] text-ink/70 underline underline-offset-4 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {targetUser.role === "ADMIN" ? "Tornar cliente" : "Tornar admin"}
                </button>
                <button
                  type="button"
                  disabled={isSelf || isPending}
                  onClick={() => handleDelete(targetUser)}
                  className="text-xs font-medium uppercase tracking-[0.18em] text-red-700 underline underline-offset-4 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Excluir
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
