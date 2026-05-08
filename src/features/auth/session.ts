import { createServerFn } from "@tanstack/react-start";

import type { SessionUser } from "./session-model";

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const [{ getRequest }, { auth }] = await Promise.all([
    import("@tanstack/react-start/server"),
    import("#/lib/auth"),
  ]);

  const session = await auth.api.getSession({
    headers: getRequest().headers,
  });

  if (!session?.user) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
  } satisfies SessionUser;
});
