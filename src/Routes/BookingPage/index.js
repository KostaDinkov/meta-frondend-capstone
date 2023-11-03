import React, { useEffect, useReducer, useState} from "react";
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
  const [maxTableSize, setMaxTableSize] = useState(0);

  const api = useFakeApi();
  useEffect(()=>{
    (async ()=> {
      let mts = await api.getMaxTableSize()
      setMaxTableSize(mts);
    })()
  },[])
  async function updateTimes(date, guests){
    const result = await api.fetchAPI(date, guests)
    dispatch({type:"update_times", data:result})
  }
  async function submitForm(formData) {
    const result = await api.submitAPI(formData);
    console.log(result.message)
  }

  return (
    <>
      <Header />
      <BookingForm
        availableTimes={availableTimes}
        updateTimes={updateTimes}
        submitForm={submitForm}
        maxTableSize={maxTableSize}
      />
    </>
  );
}
