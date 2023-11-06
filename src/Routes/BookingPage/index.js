import React, { useEffect, useReducer, useState } from "react";
import BookingForm from "../../Components/BookingForm";
import { useFakeApi } from "../../Context/FakeApiContext";
import styles from "./styles.module.scss";
;

function reducer(state, action) {
  switch (action.type) {
    case "update_times":
      return action.data;
    case "reset_times":
      return action.data;
    default:
      throw Error("Action type not recognized");
  }
}

export default function BookingPage() {
  const [availableTimes, dispatch] = useReducer(reducer, []);
  const [maxTableSize, setMaxTableSize] = useState(0);
  const [loading, setLoading]= useState(false);


  const api = useFakeApi();
  useEffect(() => {
    (async () => {
      let mts = await api.getMaxTableSize();
      setMaxTableSize(mts);
    })();
  }, []);

  async function updateTimes(date, guests) {
    setLoading(true)
    const result = await api.fetchAPI(date, guests);
    dispatch({ type: "update_times", data: result });
    setLoading(false);
  }

  async function submitForm(formData) {
    setLoading(true)
    const result = await api.submitAPI(formData);
    setLoading(false);
    return result
  }

  const resetTimes= () => {
    dispatch({type:'reset_times', data:[]});
  }

  return (
    <>
      <main className={styles.bookingPageMain}>
        <BookingForm
          availableTimes={availableTimes}
          resetTimes={resetTimes}
          updateTimes={updateTimes}
          submitForm={submitForm}
          maxTableSize={maxTableSize}
          loading = {loading}
        />
      </main>
    </>
  );
}
