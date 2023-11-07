import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import {
  validateDate,
  validateTime,
  validateGuests,
  validateOccasion,
} from "./validators";

import CheckAvailability from "./CheckAvailability";
import SubmitForm from "./SubmitForm";
import Success from "./Success";


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
  },
  occasion: {
    value: "no occasion",
    isValid: false,
    errorMessages: [],
    isTouched: false,
  },
  isLoading: false,
  isValid: false,
  availableTimes: [],
  stage: 0,
  maxTableSize: 0,
};

export default function BookingForm({api, maxTableSize}) {
  const [formState, setFormState] = useState(defaultFormState);

  const [submissionError, setSubmissionError] = useState({
    status: false,
    message: "",
  });

  useEffect(() => {
    (async () => {
      setFormState({...formState, maxTableSize})
    })();
  }, [maxTableSize]);


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState.isValid) {
      const formData = {
        date: formState.date.value,
        time: formState.time.value,
        guests: Number(formState.guests.value),
        occasion: formState.occasion.value,
      };
      setFormState({ ...formState, isLoading: true });
      const submissionResult = await api.submitAPI(formData);
      setFormState({ ...formState, isLoading: false });

      if (submissionResult.message === "success") {
        setSubmissionError(false);
        resetForm();
        setFormState({ ...formState, stage: 2 });
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
      case "occasion":
        validationResult = validateOccasion(value);
        break;
      default:
        console.debug(`validateField: Field "${field}" has no validators`);
    }
    return validationResult;
  };

  //TODO-- handle situation where there are no avaliable times
  return (
    <>
      {formState.stage === 0 && (
        <CheckAvailability
          formState={formState}
          setFormState={setFormState}
          handleFieldChange={handleFieldChange}
          api={api}
        />
      )}
      {formState.stage === 1 && (
        <SubmitForm
          formState={formState}
          setFormState={setFormState}
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
        />
      )}
      {formState.stage === 2 && (
        <Success formState={formState}/>
      )}
      {submissionError.status && 
        <div className={styles.submissionError} role='alert' aria-label="Submission Error alert">
          <h2>Error submitting form. Please try again! </h2>
          <p>{submissionError.message}</p>
        </div>
      }
    </>
  );
}
