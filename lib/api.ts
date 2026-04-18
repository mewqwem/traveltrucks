import { ReviewFormValues } from "@/components/ReviewForm/ReviewForm";
import { CampersResponse, Filters, Review, Truck } from "@/types/campers";
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
export const getCamperById = async (id: string) => {
  const { data } = await camperInstance.get<Truck>(`/campers/${id}`);
  return data;
};
export const getCamperReviews = async (id: string) => {
  const { data } = await camperInstance.get<Review[]>(`/campers/${id}/reviews`);
  return data;
};
export const postCamperReview = async (
  id: string,
  reviewContent: ReviewFormValues,
) => {
  const { data } = await camperInstance.post<Review[]>(
    `/campers/${id}/booking-requests`,
    reviewContent,
  );
  return data;
};
