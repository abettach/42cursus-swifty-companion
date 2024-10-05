import React from "react";
import { API, createEndpoint } from "..";
import * as SecureStore from "expo-secure-store";

interface IRefreshTokenProps {
  refresh_token: string;
}

const transformResponse = (data: any) => {
  const { access_token, created_at, expires_in, refresh_token } = data;

  return {
    access_token,
    created_at,
    expires_in,
    refresh_token,
    expires_at: new Date().getTime() + expires_in * 1000,
  };
};

const refreshToken = async (props: IRefreshTokenProps) => {
  const { refresh_token } = props;

  try {
    const response = await fetch(createEndpoint(API.refreshToken), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token,
      }),
    });
    console.log("response.ok==>", response.ok);
    if (response.ok) {
      const data = await response.json();

      console.log("data==>", data);

      await SecureStore.deleteItemAsync("session");
      await SecureStore.setItemAsync("session", JSON.stringify(data));

      return {
        status: 1,
        data: transformResponse(data),
      };
    }
    return {
      status: 0,
      errorMessage: "ERROR",
      data: null,
    };
  } catch {}
};

export default refreshToken;
