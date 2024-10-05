import { API, createEndpoint } from "..";
import fetchWithDefaultOption from "@/lib/fetch";

interface ILoginMutationProps {
  grant_type: string;
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
  state: string;
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

const loginMutation = async (props: ILoginMutationProps) => {
  const params = new URLSearchParams({
    ...props,
  }).toString();

  try {
    const response = await fetchWithDefaultOption(
      createEndpoint(API.login) + "?" + params,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();

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

export default loginMutation;
