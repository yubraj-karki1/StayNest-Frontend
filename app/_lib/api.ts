const API_URL = "/api";
const TOKEN_KEY = "staynest-token";

export type UserProfile = {
  uid: string;
  fullName: string;
  email: string;
  contactNo: string;
  location: string;
  about: string;
  avatarUrl?: string;
  role: "admin" | "owner" | "user";
  createdAt: string;
  updatedAt: string;
};

export type RoomType = "single" | "shared" | "hostel";

export type Room = {
  id: string;
  ownerUid: string;
  owner: string;
  ownerPhone: string;
  status: RoomType;
  title: string;
  area: string;
  price: string;
  rating: string;
  reviews: number;
  facilities: string[];
  description: string;
  images: string[];
};

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  _id: string;
  userUid: string;
  roomId: string;
  roomTitle: string;
  ownerUid: string;
  message: string;
  status: BookingStatus;
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
