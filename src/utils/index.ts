import User from "@/models/user";

export function toUser(key: string = "token"): User | undefined {
  const token = getFromLocal(key);

  const [, payload] = token.split(".");

  return toJson(atob(payload));
}

export function parseToken(token: string) {
  const [header, payload, signature] = token.split(".");

  return {
    header,
    payload,
    signature,
  };
}

export function toJson<T>(str: string, def = undefined): T | undefined {
  try {
    return JSON.parse(str) as T;
  } catch (error) {
    return def;
  }
}

export function setToLocal(key: string, value: any): boolean {
  if (typeof value !== "string") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }
  localStorage.setItem(key, value);
  return true;
}

export function getFromLocal(key: string): string {
  return localStorage.getItem(key) || "";
}

export function removeFromLocal(key: string): void {
  localStorage.removeItem(key);
}

export function formRequired(message: string = "this field is required") {
  return (value?: string) => !!value || message;
}

export function formMin(
  len: number,
  message: string = "this field is required"
) {
  return (value: string | any[]) => value?.length >= len || message;
}

export function formMax(
  len: number,
  message: string = "this field is required"
) {
  return (value: string | any[]) => value?.length <= len || message;
}
