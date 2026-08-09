interface CanSendEmailOptions {
  serverSecret?: string;
  configuredSecret?: string;
}

export function canSendEmail({ serverSecret, configuredSecret }: CanSendEmailOptions): boolean {
  if (!serverSecret || !configuredSecret) return false;
  return serverSecret === configuredSecret;
}
