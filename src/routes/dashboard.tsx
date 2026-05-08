import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Trash2, Plus, Upload, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";

import { getCurrentUser } from "#/features/auth/session";
import { getProtectedRouteRedirect, getSessionDisplayName } from "#/features/auth/session-model";
import { listNotes, createNote, deleteNote } from "#/features/notes/notes-fns";
import type { NoteRow } from "#/features/notes/notes-model";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const user = await getCurrentUser();
    const redirectTo = getProtectedRouteRedirect(user);

    if (redirectTo || !user) {
      throw redirect({ to: redirectTo ?? "/login" });
    }

    return { user };
  },
  loader: async () => {
    const notes = await listNotes();
    return { notes };
  },
  component: DashboardPage,
});

const columnHelper = createColumnHelper<NoteRow>();

function DashboardPage() {
  const { user } = Route.useRouteContext();
  const { notes: initialNotes } = Route.useLoaderData();
  const navigate = Route.useNavigate();

  const [notes, setNotes] = useState(initialNotes);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const columns = [
    columnHelper.accessor("title", {
      header: "Note",
      cell: info => <span className="text-sm">{info.getValue()}</span>,
    }),
    columnHelper.accessor("createdAt", {
      header: "Created",
      cell: info => {
        const date = info.getValue();
        return (
          <span className="text-xs text-muted-foreground">
            {date ? new Date(date).toLocaleDateString() : "—"}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: info => (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={async () => {
            await deleteNote({ data: { id: info.row.original.id } });
            setNotes(prev => prev.filter(n => n.id !== info.row.original.id));
          }}
        >
          <Trash2 className="size-4" />
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: notes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  async function handleCreateNote(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);
    try {
      const note = await createNote({ data: { title: newTitle } });
      setNotes(prev => [note, ...prev]);
      setNewTitle("");
      await navigate({ to: "/dashboard" });
    } finally {
      setCreating(false);
    }
  }

  return (
    <main className="stark-gradient min-h-[calc(100vh-4rem)] px-4 py-10 md:px-8">
      <section className="container mx-auto flex max-w-4xl flex-col gap-8">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            Welcome, {getSessionDisplayName(user)}
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            This protected route demonstrates the template's complete authenticated app loop,
            including server functions and a real data table.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardMetric label="Session" value="Active" />
          <DashboardMetric label="Email" value={user.email} />
          <DashboardMetric label="Notes" value={String(notes.length)} />
        </div>

        <div className="rounded-lg border border-border bg-card/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Notes</h2>
          </div>

          <form onSubmit={handleCreateNote} className="flex gap-2">
            <Input
              placeholder="New note title…"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={creating || !newTitle.trim()} size="sm">
              <Plus className="size-4 mr-1" />
              Add
            </Button>
          </form>

          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No notes yet. Add one above.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  {table.getHeaderGroups().map(hg => (
                    <tr key={hg.id} className="border-b border-border">
                      {hg.headers.map(header => (
                        <th
                          key={header.id}
                          className="text-left py-2 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="border-b border-border/50 hover:bg-muted/30">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="py-2 pr-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <FileUploadCard />

        <div className="flex gap-4">
          <a
            href="/settings"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Account settings →
          </a>
        </div>
      </section>
    </main>
  );
}

function FileUploadCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [uploadedKey, setUploadedKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error ?? "Failed to get upload URL");
      }

      const { url, key } = await res.json();

      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      setUploadedKey(key);
      setStatus("done");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Upload failed");
      setStatus("error");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card/80 p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">File upload</h2>
      <p className="text-sm text-muted-foreground">
        Demonstrates presigned PUT upload via MinIO. Images and PDFs up to 10 MB.
      </p>

      {status === "done" && uploadedKey ? (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle className="size-4" />
          Uploaded: <code className="text-xs break-all">{uploadedKey}</code>
        </div>
      ) : status === "error" ? (
        <p className="text-sm text-destructive">{errorMsg}</p>
      ) : null}

      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf,text/plain"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={status === "uploading"}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="size-4 mr-2" />
          {status === "uploading" ? "Uploading…" : "Choose file"}
        </Button>
      </div>
    </div>
  );
}

function DashboardMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card/80 p-4 shadow-sm">
      <p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
      <p className="mt-2 truncate text-lg font-semibold">{value}</p>
    </div>
  );
}
