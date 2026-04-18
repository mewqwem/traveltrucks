"use client";
import { Field, Form, Formik, FormikState } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import css from "./SearchBar.module.css";
import UniqButton from "../UniqButton/UniqButton";

interface SearchBarValues {
  location: string;
  forms: string;
  engines: string;
  transmissions: string;
}

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValues: SearchBarValues = {
    location: searchParams.get("location") || "",
    forms: searchParams.get("forms") || "",
    engines: searchParams.get("engines") || "",
    transmissions: searchParams.get("transmissions") || "",
  };

  const handleSubmit = (values: SearchBarValues) => {
    const params = new URLSearchParams();

    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value as string);
    });

    router.push(`/catalog?${params.toString()}`);
  };

  const handleClear = (
    resetForm: (nextState?: Partial<FormikState<SearchBarValues>>) => void,
  ) => {
    resetForm({
      values: {
        location: "",
        forms: "",
        engines: "",
        transmissions: "",
      },
    });
    router.push("/catalog");
  };

  return (
    <aside className={css.form}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ resetForm }) => (
          <Form>
            <div className={css.formWrapper}>
              <div className={css.inputWrapper}>
                <label className={css.label}>
                  Location
                  <Field
                    type="text"
                    name="location"
                    className={css.input}
                    placeholder="City"
                  />
                </label>
              </div>

              <div className={css.filters}>
                <h1 className={css.filterTitle}>Filters</h1>

                <div className={css.radioWrapper}>
                  <h3 className={css.title}>Camper form</h3>
                  <div className={css.optionsList}>
                    <label className={css.radioLabel}>
                      <Field type="radio" name="forms" value="alcove" />
                      Alcove
                    </label>
                    <label className={css.radioLabel}>
                      <Field type="radio" name="forms" value="panel_van" />
                      Panel Van
                    </label>
                    <label className={css.radioLabel}>
                      <Field type="radio" name="forms" value="integrated" />
                      Integrated
                    </label>
                    <label className={css.radioLabel}>
                      <Field
                        type="radio"
                        name="forms"
                        value="semi_integrated"
                      />
                      Semi Integrated
                    </label>
                  </div>
                </div>

                <div className={css.radioWrapper}>
                  <h3 className={css.title}>Engine</h3>
                  <div className={css.optionsList}>
                    <label className={css.radioLabel}>
                      <Field type="radio" name="engines" value="diesel" />
                      Diesel
                    </label>
                    <label className={css.radioLabel}>
                      <Field type="radio" name="engines" value="petrol" />
                      Petrol
                    </label>
                    <label className={css.radioLabel}>
                      <Field type="radio" name="engines" value="hybrid" />
                      Hybrid
                    </label>
                    <label className={css.radioLabel}>
                      <Field type="radio" name="engines" value="electric" />
                      Electric
                    </label>
                  </div>
                </div>

                <div className={css.radioWrapper}>
                  <h3 className={css.title}>Transmission</h3>
                  <div className={css.optionsList}>
                    <label className={css.radioLabel}>
                      <Field
                        type="radio"
                        name="transmissions"
                        value="automatic"
                      />
                      Automatic
                    </label>
                    <label className={css.radioLabel}>
                      <Field type="radio" name="transmissions" value="manual" />
                      Manual
                    </label>
                  </div>
                </div>
              </div>

              <div className={css.buttonWrapper}>
                <UniqButton type="submit">Search</UniqButton>
                <button
                  className={css.clearButton}
                  type="button"
                  onClick={() => handleClear(resetForm)}
                >
                  Clear filters
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </aside>
  );
}

export default SearchBar;
