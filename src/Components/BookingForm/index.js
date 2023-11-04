import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import ErrorField from "../Elements/FormErrorField";
import { useNavigate } from "react-router-dom";
import {
  validateDate,
  validateTime,
  validateGuests,
  validateForm,
} from "./validators";
import Selector from "./Selector";

const defaultFormState = {
  date: {
    value: "",
    isValid: false,
    errorMessages: [],
    isTouched: false,
  },
  time: {
    value: "",
    isValid: false,
    errorMessages: [],
    isTouched: false,
  },
  guests: {
    value: "",
    isValid: false,
    errorMessages: [],
    isTouched: false,
    maxTableSize: 0,
  },
  occasion: {
    value: "no occasion",
    isValid: true,
    errorMessages: [],
    isTouched: false,
  },
  // timesDisable: true,
  isValid: false,
};
export default function BookingForm({
  availableTimes,
  resetTimes,
  updateTimes,
  submitForm,
  maxTableSize,
  loading,
}) {
  const [formState, setFormState] = useState(defaultFormState);
  const navigate = useNavigate();
  const [submissionError, setSubmissionError] = useState({
    status: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState.isValid) {
      const formData = {
        date: formState.date.value,
        time: formState.time.value,
        guests: Number(formState.guests.value),
        occasion: formState.occasion.value,
      };

      const submissionResult = await submitForm(formData);

      if (submissionResult.message === "success") {
        setSubmissionError(false);
        resetForm();
        navigate("/confirmation",{replace: true});
      } else {
        setSubmissionError({ status: true, message: submissionResult.message });
      }
    }
  };

  const resetForm = () => {
    setFormState({
      ...defaultFormState,
      guests: { ...defaultFormState.guests, maxTableSize },
    });
  };

  useEffect(() => {
    setFormState({
      ...formState,
      guests: { ...formState.guests, maxTableSize: maxTableSize },
    });
  }, [maxTableSize]);

  useEffect(() => {
    if (!formState.date.isValid || !formState.guests.isValid) {
      resetTimes();
    }
  }, [formState.date, formState.guests]);

  useEffect(() => {
    if (
      formState.date.isValid &&
      formState.time.isValid &&
      formState.guests.isValid
    ) {
      setFormState({ ...formState, isValid: true });
    } else {
      setFormState({ ...formState, isValid: false });
    }
  }, [
    formState.date.isValid,
    formState.time.isValid,
    formState.guests.isValid,
  ]);

  const handleFieldChange = (field, value) => {
    const validationResult = validateField(field, value);
    if (!validationResult) {
      return;
    }
    setFormState({
      ...formState,
      [field]: {
        ...formState[field],
        value: value,
        isValid: validationResult.isValid,
        errorMessages: validationResult.errors,
        isTouched: true,
      },
    });
  };

  const validateField = (field, value) => {
    let validationResult;
    switch (field) {
      case "date":
        validationResult = validateDate(value);
        break;
      case "time":
        validationResult = validateTime(value);
        break;
      case "guests":
        validationResult = validateGuests(value, maxTableSize);
        break;
      default:
        console.debug(`validateField: Field "${field}" has no validators`);
    }
    return validationResult;
  };

  const checkAvailableTimes = (e) => {
    e.preventDefault();
    updateTimes(formState.date.value, Number(formState.guests.value));
  };

  return (
    <>
      <h1>Book now</h1>
      <form className={styles.bookingForm} onSubmit={handleSubmit}>
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

        <label htmlFor="guests">Number of guests (max: {maxTableSize})</label>
        <input
          required
          type="number"
          placeholder="1"
          min={0}
          max={maxTableSize}
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
            disabled={!(formState.date.isValid && formState.guests.isValid)}
            onClick={checkAvailableTimes}
          >
            Check availability
          </button>
        }

        {availableTimes.length > 0 &&
          formState.date.isValid &&
          formState.guests.isValid && (
            <Selector
              name="time"
              label="Choose Time"
              value={formState.time.value}
              options={availableTimes}
              defaultOption={"Select time"}
              error={{
                status: !formState.time.isValid,
                message: formState.time.errorMessages[0],
              }}
              handleFieldChange={handleFieldChange}
            />
          )}

        <Selector
          name="occasion"
          label="Occasion"
          value={formState.occasion}
          handleFieldChange={handleFieldChange}
          options={["No occasion", "Birthday", "Anniversary"]}
        />

        <input
          disabled={!formState.isValid || loading}
          type="submit"
          value="Make Your reservation"
        />
        {loading && (
          <div className={styles.spinnerOverlay}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </form>
      {submissionError.status && (
        <>
          <h2>Error submitting form. Please try again! </h2>
          <p>{submissionError.message}</p>
        </>
      )}
    </>
  );
}
