import { describe, expect, test } from "vitest";

import type { NoteRow } from "#/features/notes/notes-model";
import { validateNoteTitle, notesBelongToUser } from "#/features/notes/notes-model";

describe("validateNoteTitle", () => {
  test("accepts a non-empty title", () => {
    expect(validateNoteTitle("Buy groceries")).toBeNull();
  });

  test("rejects an empty string", () => {
    expect(validateNoteTitle("")).toBe("Title is required");
  });

  test("rejects a whitespace-only title", () => {
    expect(validateNoteTitle("   ")).toBe("Title is required");
  });

  test("rejects a title over 255 characters", () => {
    expect(validateNoteTitle("a".repeat(256))).toBe("Title must be 255 characters or fewer");
  });

  test("accepts a title of exactly 255 characters", () => {
    expect(validateNoteTitle("a".repeat(255))).toBeNull();
  });
});

describe("notesBelongToUser", () => {
  const note: NoteRow = { id: 1, title: "test", userId: "user-1", createdAt: new Date() };

  test("allows owner to access their note", () => {
    expect(notesBelongToUser([note], "user-1")).toBe(true);
  });

  test("rejects access from a different user", () => {
    expect(notesBelongToUser([note], "user-2")).toBe(false);
  });

  test("empty list is vacuously true", () => {
    expect(notesBelongToUser([], "user-1")).toBe(true);
  });
});
