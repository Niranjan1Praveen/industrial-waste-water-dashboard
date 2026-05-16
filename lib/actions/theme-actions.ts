"use server";

import { cookies } from "next/headers";

export async function setThemeCookie(theme: string) {
  const cookieStore = await cookies();
  cookieStore.set("theme", theme, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getThemeCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("theme")?.value || "system";
}