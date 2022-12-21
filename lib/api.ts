import { UserForm } from "@/components/AuthForm";

interface FetcherOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body: any;
  json?: boolean;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const fetcher = async ({ url, method, body, json = true }: FetcherOptions) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    // ...body(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const register = async (user: UserForm) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export const signin = async (user: UserForm) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: false,
  });
};
