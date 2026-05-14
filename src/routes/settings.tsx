import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Trash2, KeyRound, Link } from "lucide-react";
import type { Passkey } from "@better-auth/passkey";

import { getCurrentUser } from "#/features/auth/session";
import { getProtectedRouteRedirect } from "#/features/auth/session-model";
import { getProviderLabel } from "#/features/auth/settings-model";
import { authClient } from "#/lib/auth-client";
import { Button } from "#/components/ui/button";

interface AccountInfo {
  id: string;
  providerId: string;
  accountId: string;
}

export const Route = createFileRoute("/settings")({
  beforeLoad: async () => {
    const user = await getCurrentUser();
    const redirectTo = getProtectedRouteRedirect(user);

    if (redirectTo || !user) {
      throw redirect({ to: redirectTo ?? "/login" });
    }

    return { user };
  },
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = Route.useRouteContext();
  const { data: passkeys } = authClient.useListPasskeys();
  const [accounts, setAccounts] = useState<AccountInfo[]>([]);
  const [deletingPasskey, setDeletingPasskey] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    void (async () => {
      const { data } = await authClient.listAccounts();
      if (data) setAccounts(data);
    })();
  }, []);

  async function handleDeletePasskey(passkeyId: string) {
    setDeletingPasskey(passkeyId);
    try {
      await authClient.passkey.deletePasskey({ id: passkeyId });
    } finally {
      setDeletingPasskey(null);
    }
  }

  async function handleDeleteAccount() {
    await authClient.deleteUser({});
    window.location.href = "/";
  }

  return (
    <main className="stark-gradient min-h-[calc(100vh-4rem)] px-4 py-10 md:px-8">
      <section className="container mx-auto flex max-w-2xl flex-col gap-8">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Settings</p>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Account</h1>
        </div>

        {/* Identity */}
        <SettingsCard title="Profile">
          <Row label="Email" value={user.email} />
          {user.name && <Row label="Name" value={user.name} />}
        </SettingsCard>

        {/* Linked providers */}
        <SettingsCard title="Linked providers">
          {accounts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <ul className="space-y-2">
              {accounts.map(acct => (
                <li key={acct.id} className="flex items-center gap-2">
                  <Link className="size-4 text-muted-foreground" />
                  <span className="text-sm">{getProviderLabel(acct.providerId)}</span>
                </li>
              ))}
            </ul>
          )}
        </SettingsCard>

        {/* Passkeys */}
        <SettingsCard title="Passkeys">
          {!passkeys || passkeys.length === 0 ? (
            <p className="text-sm text-muted-foreground">No passkeys registered.</p>
          ) : (
            <ul className="space-y-2">
              {passkeys.map((pk: Passkey) => (
                <li key={pk.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <KeyRound className="size-4 text-muted-foreground" />
                    <span className="text-sm">{pk.name ?? "Passkey"}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={deletingPasskey === pk.id}
                    onClick={() => void handleDeletePasskey(pk.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => void authClient.passkey.addPasskey()}
          >
            <KeyRound className="size-4 mr-2" />
            Add passkey
          </Button>
        </SettingsCard>

        {/* Danger zone */}
        <SettingsCard title="Danger zone" className="border-destructive/40">
          {confirmDelete ? (
            <div className="space-y-3">
              <p className="text-sm text-destructive">
                This permanently deletes your account and all data. This cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm" onClick={() => void handleDeleteAccount()}>
                  Yes, delete my account
                </Button>
                <Button variant="outline" size="sm" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-destructive border-destructive/40 hover:bg-destructive/10"
              onClick={() => setConfirmDelete(true)}
            >
              <Trash2 className="size-4 mr-2" />
              Delete account
            </Button>
          )}
        </SettingsCard>
      </section>
    </main>
  );
}

function SettingsCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-card/80 p-6 shadow-sm space-y-4 ${className ?? ""}`}
    >
      <h2 className="text-base font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
