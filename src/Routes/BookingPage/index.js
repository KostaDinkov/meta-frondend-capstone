import React, { useEffect, useReducer, useState } from "react";
import Header from "../../Components/Header";
import BookingForm from "../../Components/BookingForm";

export function reducer(state, action) {
  switch (action.type) {
    case "date_change":
      console.log(`date changed to: ${action.date}`);
      return updateTimes(action.date);

    default:
      throw Error("Action type not recognized");
  }
}
function updateTimes(date) {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
}
function initializeTimes() {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
}

export default function BookingPage() {
  const [availableTimes, dispatch] = useReducer(reducer, [], initializeTimes);
  const [submitting, setSubmitting] = useState(false);

  function submitForm(formData) {
    setSubmitting(true);
  }

  

  return (
    <>
      <Header />
      <BookingForm
        availableTimes={availableTimes}
        onDateChange={dispatch}
        onSubmitForm={submitForm}
      />
    </>
  );
}
