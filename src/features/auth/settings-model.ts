const PROVIDER_LABELS: Record<string, string> = {
  google: "Google",
  "email-otp": "Email OTP",
  credential: "Password",
};

export function getProviderLabel(providerId: string): string {
  return PROVIDER_LABELS[providerId] ?? providerId.charAt(0).toUpperCase() + providerId.slice(1);
}

export function isPasswordProvider(providerId: string): boolean {
  return providerId === "credential";
}
