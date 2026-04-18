"use client";

import { useParams } from "next/navigation";
import ReviewForm, { ReviewFormValues } from "../ReviewForm/ReviewForm";
import { postCamperReview } from "@/lib/api";
import toast from "react-hot-toast";
import { useState } from "react";
import { FormikHelpers } from "formik";

function ClientForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { camperId } = useParams();

  const handleSubmit = async (
    values: ReviewFormValues,
    { resetForm }: FormikHelpers<ReviewFormValues>,
  ) => {
    setIsLoading(true);

    try {
      await postCamperReview(camperId as string, {
        name: values.name,
        email: values.email,
      });
      toast.success("Successfully!");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Somethings went wrong.");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return <ReviewForm onSubmit={handleSubmit} isLoading={isLoading} />;
}
export default ClientForm;
