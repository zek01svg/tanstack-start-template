import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "#/features/auth/components/login-form";

// Mock TanStack Router hooks and components
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useNavigate: () => vi.fn<() => void>(),
}));

// Mock better-auth client
vi.mock("#/lib/auth-client", () => ({
  authClient: {
    signIn: {
      passkey: vi
        .fn<() => Promise<{ data: null; error: null }>>()
        .mockResolvedValue({ data: null, error: null }),
      social: vi
        .fn<() => Promise<{ data: null; error: null }>>()
        .mockResolvedValue({ data: null, error: null }),
    },
    emailOtp: {
      sendVerificationOtp: vi
        .fn<() => Promise<{ data: null; error: null }>>()
        .mockResolvedValue({ data: null, error: null }),
    },
  },
}));

// Mock PublicKeyCredential for jsdom environment
if (typeof globalThis.PublicKeyCredential === "undefined") {
  // @ts-ignore
  globalThis.PublicKeyCredential = {
    isConditionalMediationAvailable: vi.fn<() => Promise<boolean>>().mockResolvedValue(false),
  };
}

describe("LoginForm component", () => {
  it("renders email input and submission controls", () => {
    render(<LoginForm />);

    expect(screen.getByText("Welcome back")).toBeTruthy();
    expect(screen.getByLabelText(/email/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /continue with email/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /sign in with passkey/i })).toBeTruthy();
  });

  it("shows validation error for invalid email on submit", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "not-an-email" } });

    const form = emailInput.closest("form");
    expect(form).toBeTruthy();
    fireEvent.submit(form as HTMLFormElement);

    await waitFor(() => {
      expect(emailInput.getAttribute("aria-invalid")).toBe("true");
      expect(screen.getByRole("alert")).toBeTruthy();
    });
  });

  it("calls sendVerificationOtp with valid email", async () => {
    const { authClient } = await import("#/lib/auth-client");
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "test@example.com");

    const submitButton = screen.getByRole("button", { name: /continue with email/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(authClient.emailOtp.sendVerificationOtp).toHaveBeenCalledWith({
        email: "test@example.com",
        type: "sign-in",
      });
    });
  });
});
