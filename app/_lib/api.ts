const API_URL = "/api";
const TOKEN_KEY = "staynest-token";

export type UserProfile = {
  uid: string;
  fullName: string;
  email: string;
  contactNo: string;
  location: string;
  about: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
};

export function getToken() {
  return typeof window === "undefined"
    ? null
    : window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Cannot connect to the StayNest server. Please try again.",
    );
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    throw new Error(body?.message ?? "Request failed");
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
