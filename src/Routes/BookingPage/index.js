import React, { useReducer} from "react";
import Header from "../../Components/Header";
import BookingForm from "../../Components/BookingForm";
import { useFakeApi } from "../../Context/FakeApiContext";

function reducer(state, action) {
  switch (action.type) {
    case "update_times":
      return action.data;

    default:
      throw Error("Action type not recognized");
  }
}



export default function BookingPage() {
  const [availableTimes, dispatch] = useReducer(reducer,[]);

  const api = useFakeApi();

  async function updateTimes(date, guests){
    const result = await api.fetchAPI(date, guests)
    dispatch({type:"update_times", data:result})
  }
  async function submitForm(formData) {
    const result = await api.submitAPI(formData);
  }

  return (
    <>
      <Header />
      <BookingForm
        availableTimes={availableTimes}
        updateTimes={updateTimes}
        onSubmitForm={submitForm}
      />
    </>
  );
}
