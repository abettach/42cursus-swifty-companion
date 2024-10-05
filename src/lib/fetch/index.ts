import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";

export interface CustomsFetchOptions {
  headers?: {
    Authorization?: string;
    "Content-Type"?: string;
  };
}

export type FetchOptionsType = RequestInit & CustomsFetchOptions;

export const fetchWithDefaultOption = async (
  url: string,
  options?: FetchOptionsType
) => {
  const _options: FetchOptionsType = { ...options };

  const session = await SecureStore.getItemAsync("session");

  if (session) {
    const _jsonSession = JSON.parse(session);

    const { access_token, expires_at } = _jsonSession;

    if (new Date().getTime() < expires_at) {
      _options.headers = {
        ..._options.headers,
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };
    } else {
      await SecureStore.deleteItemAsync("session");
      Updates.reloadAsync();
    }
  }

  return fetch(url, _options);
};

export default fetchWithDefaultOption;
