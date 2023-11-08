import React from "react";
import Selector from "./Selector";
import styles from "./styles.module.scss";
import Spinner from "../Elements/Spinner";
import { resetField } from "./utils";
import {format} from 'date-fns'

export default function SubmitForm({
  formState,
  setFormState,
  handleFieldChange,
  handleSubmit,
}) {
  return (
    <>
      <h1>Choose Time</h1>
      <p>{`We found available tables for ${formState.guests.value} ${
            formState.guests.value > 1 ? "guests" : "guest"
          } for ${
            format(new Date(formState.date.value), "PPPP")
          }. Select time from the list below.`}</p>

      <form className={styles.bookingForm} onSubmit={handleSubmit}>
       
        <Selector
          name="time"
          label="Time"
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

            >Book now</button>
        </div>
        <Spinner visible={formState.isLoading} />
      </form>
    </>
  );
}
