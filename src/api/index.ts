import { BASE_URL } from "@env";

export const createEndpoint = (path: string) => `${BASE_URL}${path}`;

export const API = {
  login: "/oauth/token",
  users: (str: string) => `/v2/users?search[login]=${str}`,
  userById: (id: string) => `/v2/users/${id}`,
  refreshToken: "/oauth/token",
  coalition: (id: string) => `/v2/users/${id}/coalitions`,
};
