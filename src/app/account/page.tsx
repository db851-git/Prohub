"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";

const configured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

export default function AccountPage() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  const supabase = configured ? createClient() : null;

  const loadOrders = useCallback(
    async (uid: string, emailAddr: string) => {
      if (!supabase) return;
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("email", emailAddr)
        .order("created_at", { ascending: false });
      setOrders((data as Order[]) ?? []);
    },
    [supabase]
  );

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) loadOrders(data.user.id, data.user.email ?? "");
      setReady(true);
    });
  }, [supabase, loadOrders]);

  async function onAuth(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    if (!supabase) return;
    if (mode === "register") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) return setMessage(error.message);
      if (data.user) {
        await supabase.from("profiles").upsert({ id: data.user.id, full_name: fullName });
      }
      setMessage("Check your email to confirm your account, then log in.");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return setMessage(error.message);
      setUser(data.user);
      if (data.user) loadOrders(data.user.id, data.user.email ?? "");
    }
  }

  async function logout() {
    await supabase?.auth.signOut();
    setUser(null);
    setOrders([]);
  }

  if (!ready) {
    return <div className="container section">Loading…</div>;
  }

  if (!configured) {
    return (
      <div className="container section max-w-md">
        <h1 className="text-3xl font-bold">Account</h1>
        <div className="mt-6 rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
          Accounts are powered by Supabase Auth. Add your Supabase environment
          variables (see <code>.env.example</code>) to enable login, registration
          and order history.
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="container section">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My account</h1>
            <p className="mt-1 text-muted">{user.email}</p>
          </div>
          <Button variant="outline" onClick={logout}>
            Log out
          </Button>
        </div>

        <h2 className="mb-4 mt-10 font-display text-xl font-semibold">Order history</h2>
        {orders.length === 0 ? (
          <p className="text-muted">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="rounded-2xl border border-border p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">{o.order_number}</span>
                  <span className="text-sm capitalize text-muted">
                    {o.status.replace("_", " ")}
                  </span>
                  <span className="font-semibold">{formatPrice(o.total)}</span>
                </div>
                <ul className="mt-3 text-sm text-muted">
                  {o.order_items?.map((i) => (
                    <li key={i.id}>
                      {i.title} × {i.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container section max-w-md">
      <h1 className="text-3xl font-bold">
        {mode === "login" ? "Log in" : "Create account"}
      </h1>
      <form onSubmit={onAuth} className="mt-6 space-y-4">
        {mode === "register" && (
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {message && <p className="text-sm text-brand">{message}</p>}
        <Button type="submit" className="w-full">
          {mode === "login" ? "Log in" : "Register"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted">
        {mode === "login" ? "New to ProHub? " : "Already have an account? "}
        <button
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setMessage("");
          }}
          className="font-medium text-brand hover:underline"
        >
          {mode === "login" ? "Create an account" : "Log in"}
        </button>
      </p>
    </div>
  );
}
