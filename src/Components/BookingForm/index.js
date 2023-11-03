import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import ErrorField from "../Elements/FormErrorField";
import {
  validateDate,
  validateTime,
  validateGuests,
  validateForm,
} from "./validators";

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
  updateTimes,
  submitForm,
  maxTableSize,
}) {
  const [formState, setFormState] = useState(defaultFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.isValid) {
      const formData = {
        date: formState.date.value,
        time: formState.time.value,
        guests: Number(formState.guests.value),
        occasion: formState.occasion.value,
      };
      submitForm(formData);
      clearForm();
      return;
    }
  };

  const clearForm = () => {
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
    if (formState.date.isValid && formState.guests.isValid ) {
      updateTimes(formState.date.value, Number(formState.guests.value));
    }

  }, [formState.date, formState.guests]);

  useEffect(()=>{
    if(formState.date.isValid && formState.time.isValid && formState.guests.isValid){
      setFormState({...formState, isValid: true});
    }
    else{
      setFormState({...formState, isValid: false})
    }
  },[formState.date.isValid, formState.time.isValid, formState.guests.isValid])
 
  const setTouched = (field)=>{
    setFormState({
      ...formState,
      [field]: { ...formState[field], isTouched: true },
    })
  }
  
  const handleFieldChange = (field, value, validatorFn, args)=>{
    const validationResult = validatorFn(value, ...args)

    setFormState({
      ...formState,
      [field]: { ...formState[field],
        value: value,
        isValid: validationResult.isValid,
        errorMessages: validationResult.errors
       },
    })
  }


  return (
    <>
      <h1>Book now</h1>
      <form className={styles.bookingForm} onSubmit={handleSubmit}>
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          value={formState.date.value}
          onBlur={()=>{setTouched('date')} }
          onChange={(e)=>{handleFieldChange('date', e.target.value, validateDate, [])}}
        />
        <ErrorField
          display={formState.date.isTouched && !formState.date.isValid}
          message={formState.date.errorMessages[0]}
        />

        <label htmlFor="guests">Number of guests (max: {maxTableSize})</label>
        <input
          type="number"
          placeholder="1"
          min={0}
          max={maxTableSize}
          id="guests"
          value={Number(formState.guests.value).toString()}
          onBlur={() => setTouched("guests")}
          onChange={(e)=>{handleFieldChange('guests',Number(e.target.value), validateGuests, [maxTableSize])}}
        />
        <ErrorField
          display={formState.guests.isTouched && !formState.guests.isValid}
          message={formState.guests.errorMessages[0]}
        />

        <label htmlFor="res-time">Choose time</label>
        <select
          aria-label="Time picker"
          id="res-time "
          value={formState.time.value}
          onBlur={()=>setTouched('time')}
          onChange={(e)=>handleFieldChange('time', e.target.value, validateTime,[])}
        >
          <option>Select time</option>
          {availableTimes.length > 0 &&
            availableTimes.map((t) => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
        </select>
        <ErrorField
          display={formState.time.isTouched && !formState.time.isValid}
          message={formState.time.errorMessages[0]}
        />

        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={formState.occasion.value}
          onChange={(e) =>
            setFormState({
              ...formState,
              occasion: { ...formState.occasion, value: e.target.value },
            })
          }
        >
          <option>No occasion</option>
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>

        <input
          disabled={!formState.isValid}
          type="submit"
          value="Make Your reservation"
        />
      </form>
    </>
  );
}
