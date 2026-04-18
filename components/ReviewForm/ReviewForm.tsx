"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import UniqButton from "../UniqButton/UniqButton";
import css from "./ReviewForm.module.css";
import * as Yup from "yup";
import { TailSpin } from "react-loader-spinner";

interface ReviewFormProps {
  onSubmit: (
    values: ReviewFormValues,
    helpers: FormikHelpers<ReviewFormValues>,
  ) => void;
  isLoading: boolean;
}

const initialValues: ReviewFormValues = {
  name: "",
  email: "",
};

export interface ReviewFormValues {
  name: string;
  email: string;
}
const schemaValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 2 characters")
    .max(50, "Name must be maximum 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters")
    .max(50, "Email must be maximum 50 characters")
    .required("Email is required"),
});

function ReviewForm({ onSubmit, isLoading }: ReviewFormProps) {
  return (
    <div className={css.formWrapper}>
      <div className={css.formHead}>
        <h2 className={css.formTitle}>Book your campervan now</h2>
        <p className={css.formDescription}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <Formik
        validationSchema={schemaValidation}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form className={css.form}>
          <div className={css.inputWrappers}>
            <Field name="name" className={css.input} placeholder="Name*" />
            <ErrorMessage
              name="name"
              component={"span"}
              className={css.error}
            />
            <Field
              type="email"
              name="email"
              className={css.input}
              placeholder="Email*"
            />
            <ErrorMessage
              name="email"
              component={"span"}
              className={css.error}
            />
          </div>
          <UniqButton type="submit">
            {isLoading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperClass={css.loader}
              />
            ) : (
              "Send"
            )}
          </UniqButton>
        </Form>
      </Formik>
    </div>
  );
}

export default ReviewForm;
