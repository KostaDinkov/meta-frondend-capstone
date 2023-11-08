import React from "react";
import styles from "./styles.module.scss";
import ErrorField from "../Elements/FormErrorField";
import { useFakeApi } from "../../Context/FakeApiContext";
import Spinner from "../Elements/Spinner";

export default function CheckAvailability({
  formState,
  setFormState,
  handleFieldChange,
  api,
}) {
  const checkAvailableTimes = async (e) => {
    e.preventDefault();

    setFormState({ ...formState, isLoading: true });
    const result = await api.fetchAPI(
      formState.date.value,
      Number(formState.guests.value),
    );

    setFormState({
      ...formState,
      isLoading: false,
      availableTimes: result,
      stage: 1,
    });
  };
  return (
    <>
      <h1>Make Your Reservation</h1>
      <p>
        Please, select a date and number of guests from the lists below and we
        will check if there are available tables.
      </p>
      <form className={styles.bookingForm} onSubmit={checkAvailableTimes}>
        <label htmlFor="res-date">Choose date</label>
        <input
          required
          type="date"
          id="res-date"
          value={formState.date.value}
          onBlur={(e) => {
            handleFieldChange("date", e.target.value);
          }}
          onChange={(e) => {
            handleFieldChange("date", e.target.value);
          }}
        />
        <ErrorField
          display={formState.date.isTouched && !formState.date.isValid}
          message={formState.date.errorMessages[0]}
        />

        <label htmlFor="guests">
          Number of guests (max: {formState.maxTableSize})
        </label>
        <input
          required
          type="number"
          placeholder="1"
          min={0}
          max={formState.maxTableSize}
          id="guests"
          value={Number(formState.guests.value).toString()}
          onBlur={(e) => handleFieldChange("guests", Number(e.target.value))}
          onChange={(e) => {
            handleFieldChange("guests", Number(e.target.value));
          }}
        />
        <ErrorField
          display={formState.guests.isTouched && !formState.guests.isValid}
          message={formState.guests.errorMessages[0]}
        />

        {
          <button
            className={styles.buttonMain}
            disabled={!(formState.date.isValid && formState.guests.isValid)}
          >
            Check availability
          </button>
        }
        <Spinner visible={formState.isLoading} />
      </form>
    </>
  );
}
