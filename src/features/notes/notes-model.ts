export interface NoteRow {
  id: number;
  title: string;
  userId: string;
  createdAt: Date | null;
}

export function validateNoteTitle(title: string): string | null {
  if (!title.trim()) return "Title is required";
  if (title.length > 255) return "Title must be 255 characters or fewer";
  return null;
}

export function notesBelongToUser(notes: NoteRow[], userId: string): boolean {
  return notes.every(note => note.userId === userId);
}
