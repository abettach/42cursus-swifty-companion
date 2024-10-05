import React from "react";
import { API, createEndpoint } from "..";
import * as SecureStore from "expo-secure-store";
import fetchWithDefaultOption from "@/lib/fetch";
interface IUsersMutationProps {
  search?: string;
}

const usersQuery = async (props: IUsersMutationProps) => {
  const { search } = props;

  try {
    const response = await fetchWithDefaultOption(
      createEndpoint(API.users(search))
    );

    if (response.ok) {
      const data = await response.json();

      return {
        status: 1,
        data: data,
      };
    }
    return {
      status: 0,
      errorMessage: "ERROR",
      data: null,
    };
  } catch {}
};

export default usersQuery;
