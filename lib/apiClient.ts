/**
 * lib/apiClient.ts
 * ------------------
 * Thin fetch wrapper that attaches the current Clerk session token as a
 * Bearer Authorization header, so the backend's Phase 5c
 * middleware/clerk_auth.py can verify per-user roles (viewer/admin).
 *
 * Today this is additive, not required: only /train/* on the backend
 * checks for an admin-role Clerk token (as an OR-alternative to its
 * existing X-Admin-Key gate), and only if CLERK_JWKS_URL is configured
 * server-side. Every other route stays open regardless of this header.
 * Attaching it consistently now means any future route that adds a
 * require_clerk_role() gate "just works" without another frontend change.
 *
 * Usage (inside a client component):
 *   const { getToken } = useAuth();
 *   const res = await authFetch(getToken, `${API_BASE_URL}/preventive/analyze`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:5000";

type GetTokenFn = () => Promise<string | null>;

/**
 * fetch() with the current Clerk session token attached as
 * `Authorization: Bearer <token>` when the user is signed in. Falls back
 * to a plain, unauthenticated fetch if getToken() returns null (signed
 * out) or throws (Clerk not mounted / SSR edge cases) — every route this
 * project exposes today tolerates a missing token, so this never blocks
 * a request from going out.
 */
export async function authFetch(
  getToken: GetTokenFn,
  input: string,
  init: RequestInit = {}
): Promise<Response> {
  let token: string | null = null;
  try {
    token = await getToken();
  } catch {
    token = null;
  }

  const headers = new Headers(init.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, { ...init, headers });
}
