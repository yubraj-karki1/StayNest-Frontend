const API_URL = "/api";
const OWNER_TOKEN_KEY = "staynest-owner-token";

export type OwnerProfile = {
  uid: string;
  fullName: string;
  email: string;
  contactNo: string;
  location: string;
  about: string;
  role: "owner";
  createdAt: string;
  updatedAt: string;
};

export function getOwnerToken() {
  return typeof window === "undefined"
    ? null
    : window.localStorage.getItem(OWNER_TOKEN_KEY);
}

export function setOwnerToken(token: string) {
  window.localStorage.setItem(OWNER_TOKEN_KEY, token);
}

export function clearOwnerToken() {
  window.localStorage.removeItem(OWNER_TOKEN_KEY);
}

export async function ownerApiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getOwnerToken();
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body && !(options.body instanceof FormData)
          ? { "Content-Type": "application/json" }
          : {}),
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
      | { message?: string; issues?: { path: (string | number)[]; message: string }[] }
      | null;
    const issue = body?.issues?.[0];
    const message = issue
      ? `${issue.path.join(".") || "Value"}: ${issue.message}`
      : (body?.message ?? "Request failed");
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
