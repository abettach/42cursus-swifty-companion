import { API, createEndpoint } from "..";
import fetchWithDefaultOption from "@/lib/fetch";
interface IUsersMutationProps {
  id?: string;
}

const userCoalitionById = async (props: IUsersMutationProps) => {
  const { id } = props;

  try {
    const response = await fetchWithDefaultOption(
      createEndpoint(API.coalition(id))
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

export default userCoalitionById;
