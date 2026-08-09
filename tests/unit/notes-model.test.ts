import { describe, expect, test } from "vitest";

import { validateNoteTitle } from "#/features/notes/notes-model";

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
