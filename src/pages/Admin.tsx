import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUsers";

type Tab = "products" | "users";

const TABS: { id: Tab; label: string }[] = [
  { id: "products", label: "Produtos" },
  { id: "users", label: "Usuárias" },
];

export default function Admin() {
  const [tab, setTab] = useState<Tab>("products");

  return (
    <>
      <Navbar minimal />
      <section className="mx-auto max-w-3xl px-6 py-24 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          Painel administrativo
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-wide text-ink sm:text-5xl">
          Gerenciar loja
        </h1>

        <div className="mt-10 flex gap-3">
          {TABS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setTab(option.id)}
              className={`rounded-full border px-6 py-2.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                tab === option.id
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/15 text-ink/70 hover:border-ink"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-12">{tab === "products" ? <AdminProducts /> : <AdminUsers />}</div>
      </section>
      <Footer minimal />
    </>
  );
}
