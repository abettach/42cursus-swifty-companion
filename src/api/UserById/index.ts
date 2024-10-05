import React from "react";
import { API, createEndpoint } from "..";
import * as SecureStore from "expo-secure-store";
import fetchWithDefaultOption from "@/lib/fetch";
interface IUsersMutationProps {
  id?: string;
}

export type IUserInformationItems = any;

const userByIdQuery = async (props: IUsersMutationProps) => {
  const { id } = props;

  try {
    const response = await fetchWithDefaultOption(
      createEndpoint(API.userById(id))
    );

    if (response.ok) {
      const data: IUserInformationItems = await response.json();

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

export default userByIdQuery;
