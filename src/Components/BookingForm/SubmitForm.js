import React from "react";
import Selector from "./Selector";
import styles from "./styles.module.scss";
import Spinner from "../Elements/Spinner";
import { resetField } from "./utils";

export default function SubmitForm({
  formState,
  setFormState,
  handleFieldChange,
  handleSubmit,
}) {
  return (
    <>
      <h1>Choose Time</h1>

      <form className={styles.bookingForm} onSubmit={handleSubmit}>
        <Selector
          name="time"
          label={`We found available tables for ${formState.guests.value} ${
            formState.guests.value > 1 ? "persons" : "person"
          } for ${
            formState.date.value
          } with the following available time options.`}
          value={formState.time.value}
          options={formState.availableTimes}
          defaultOption={"Select time"}
          error={{
            status: !formState.time.isValid,
            message: formState.time.errorMessages[0],
          }}
          handleFieldChange={handleFieldChange}
        />
        <Selector
          name="occasion"
          label="Occasion"
          value={formState.occasion.value}
          handleFieldChange={handleFieldChange}
          options={["No occasion", "Birthday", "Anniversary"]}
        />
        <div className={styles.submitBtnGroup}>
            <button
            className={styles.button}
              disabled={formState.isLoading}
              onClick={(e) => {
                e.preventDefault()
                setFormState({ ...formState, stage: 0, time:resetField(), occasion:resetField() });
              }}
            >
              Back
            </button>
            <button
            className={styles.buttonMain}
              disabled={!formState.isValid || formState.isLoading}

            >Make Your reservation</button>
        </div>
        <Spinner visible={formState.isLoading} />
      </form>
    </>
  );
}
