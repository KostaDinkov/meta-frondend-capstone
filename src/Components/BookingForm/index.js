import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

export default function BookingForm({
  availableTimes,
  updateTimes,
  onSubmitForm,
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [occasion, setOccasion] = useState("no occasion");

  const submitForm = (e) => {
    e.preventDefault();
    const formData = {
      date: date,
      time: time,
      guests: guests,
      occasion: occasion,
    };
  };

  useEffect(() => {
    if (date !== "" && guests !== "") {
      updateTimes(date, Number(guests));
    }
  }, [date, guests]);

  return (
    <>
      <h1>Book now</h1>
      <form className={styles.bookingForm} onSubmit={submitForm}>
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        <label htmlFor="res-time">Choose time</label>
        <select
          aria-label="Time picker"
          id="res-time "
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
        >
          {availableTimes.length>0 && availableTimes.map((t) => (
            <option value={t} key={t}>
              {t}{" "}
            </option>
          ))}
        </select>

        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option>No occasion</option>
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        <input type="submit" value="Make Your reservation" />
      </form>
    </>
  );
}
