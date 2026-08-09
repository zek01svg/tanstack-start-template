export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}

export function getProtectedRouteRedirect(user: SessionUser | null) {
  return user ? null : "/login";
}

export function getAuthRouteRedirect(user: SessionUser | null) {
  return user ? "/dashboard" : null;
}

export function getSessionDisplayName(user: SessionUser) {
  const name = user.name?.trim();
  return name || user.email;
}
