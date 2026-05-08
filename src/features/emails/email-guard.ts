interface CanSendEmailOptions {
  userId?: string;
  serverSecret?: string;
  configuredSecret?: string;
}

export function canSendEmail({
  userId,
  serverSecret,
  configuredSecret,
}: CanSendEmailOptions): boolean {
  if (userId) return true;
  if (!serverSecret || !configuredSecret) return false;
  return serverSecret === configuredSecret;
}
