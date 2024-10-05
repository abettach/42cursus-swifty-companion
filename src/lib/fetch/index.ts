import React from "react";
import * as SecureStore from "expo-secure-store";
import refreshToken from "@/api/RefreshToken";

export interface CustomsFetchOptions {
  headers?: {
    Authorization?: string;
    "Content-Type"?: string;
  };
}

export type FetchOptionsType = RequestInit & CustomsFetchOptions;

const handleTokenExpired = async ({ refresh_token }) => {
  try {
    const response = await refreshToken({ refresh_token });

    return response;
  } catch (error) {
    console.error("handleTokenExpired error==>", error);
  }
};

export const fetchWithDefaultOption = async (
  url: string,
  options?: FetchOptionsType
) => {
  const _options: FetchOptionsType = { ...options };

  const session = await SecureStore.getItemAsync("session");

  if (session) {
    const _jsonSession = JSON.parse(session);

    const { access_token, expires_at, refresh_token } = _jsonSession;

    if (new Date().getTime() < expires_at) {
      _options.headers = {
        ..._options.headers,
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };
    } else {
      console.log("accessTokenExpired");
      const respoonse = await handleTokenExpired({ refresh_token });
      if (respoonse.status === 1) {
        const { access_token } = respoonse.data;

        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        };
      }
    }
  }

  return fetch(url, _options);
};

export default fetchWithDefaultOption;
