"use client";
import { Field, Form, Formik, FormikState } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import css from "./SearchBar.module.css";
import UniqButton from "../UniqButton/UniqButton";
import { IoMapOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";

const isFormEmpty = (values: SearchBarValues) => {
  return Object.values(values).every((value) => value === "");
};

interface SearchBarValues {
  location: string;
  form: string;
  engine: string;
  transmission: string;
}

function SearchBarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initialValues: SearchBarValues = {
    location: searchParams.get("location") || "",
    form: searchParams.get("form") || "",
    engine: searchParams.get("engine") || "",
    transmission: searchParams.get("transmission") || "",
  };

  const handleSubmit = (values: SearchBarValues) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        params.set(key, value as string);
      } else {
        params.delete(key);
      }
    });

    router.push(`/catalog?${params.toString()}`, { scroll: false });
  };

  const handleClear = (
    resetForm: (nextState?: Partial<FormikState<SearchBarValues>>) => void,
  ) => {
    startTransition(() => {
      resetForm({
        values: {
          location: "",
          form: "",
          engine: "",
          transmission: "",
        },
      });

      router.push("/catalog");
      router.refresh();
    });
  };

  return (
    <aside className={css.form}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ resetForm, isSubmitting, dirty, values }) => (
          <Form>
            <div className={css.formWrapper}>
              <div className={css.inputWrapper}>
                <label className={css.label}>
                  Location
                  <div className={css.inputIconWrapper}>
                    <IoMapOutline className={css.mapIcon} />
                    <Field
                      type="text"
                      name="location"
                      className={css.input}
                      placeholder="City"
                    />
                  </div>
                </label>
              </div>

              <div className={css.filters}>
                <h1 className={css.filterTitle}>Filters</h1>

                <div className={css.radioWrapper}>
                  <h3 className={css.title}>Camper form</h3>
                  <div className={css.optionsList}>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="form"
                        value="alcove"
                      />
                      Alcove
                    </label>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="form"
                        value="panel_van"
                      />
                      Panel Van
                    </label>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="form"
                        value="semi_integrated"
                      />
                      Semi Integrated
                    </label>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="form"
                        value="integrated"
                      />
                      Integrated
                    </label>
                  </div>
                </div>

                <div className={css.radioWrapper}>
                  <h3 className={css.title}>Engine</h3>
                  <div className={css.optionsList}>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="engine"
                        value="diesel"
                      />
                      Diesel
                    </label>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="engine"
                        value="petrol"
                      />
                      Petrol
                    </label>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="engine"
                        value="hybrid"
                      />
                      Hybrid
                    </label>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="engine"
                        value="electric"
                      />
                      Electric
                    </label>
                  </div>
                </div>

                <div className={css.radioWrapper}>
                  <h3 className={css.title}>Transmission</h3>
                  <div className={css.optionsList}>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="transmission"
                        value="automatic"
                      />
                      Automatic
                    </label>
                    <label className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="transmission"
                        value="manual"
                      />
                      Manual
                    </label>
                  </div>
                </div>
              </div>

              <div className={css.buttonWrapper}>
                <UniqButton
                  type="submit"
                  disabled={!dirty || isSubmitting || isPending}
                >
                  {isSubmitting ? (
                    <TailSpin
                      visible={true}
                      height="20"
                      width="20"
                      color="#fff"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperClass="loader"
                    />
                  ) : (
                    "Search"
                  )}
                </UniqButton>

                <button
                  className={css.clearButton}
                  type="button"
                  onClick={() => handleClear(resetForm)}
                  disabled={isSubmitting || isFormEmpty(values)}
                >
                  {isPending ? (
                    <TailSpin
                      visible={true}
                      height="20"
                      width="20"
                      color="#000"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperClass="loader"
                    />
                  ) : (
                    <>
                      <MdClose className={css.closeIcon} />
                      Clear filters
                    </>
                  )}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </aside>
  );
}

function SearchBar() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <SearchBarContent />
    </Suspense>
  );
}

export default SearchBar;
