import { CampersResponse, Filters } from "@/types/campers";
import axios from "axios";

const camperInstance = axios.create({
  baseURL: "https://campers-api.goit.study",
});

export const getAll = async (
  page: number,
  filters?: Record<string, string>,
): Promise<CampersResponse> => {
  const { data } = await camperInstance.get<CampersResponse>("/campers", {
    params: { page: page, perPage: 4, ...filters },
  });
  return data;
};
export const getFilters = async (): Promise<Filters> => {
  const { data } = await camperInstance.get<Filters>("/campers/filters");

  return data;
};
