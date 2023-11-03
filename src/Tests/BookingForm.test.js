import { fireEvent, render, screen, within } from "@testing-library/react";
import BookingForm from "../Components/BookingForm";
import { reducer } from "../Routes/BookingPage";

let availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const changeDate = (action) => {
  console.debug(`Date changed ${action.date}`);
  availableTimes = availableTimes.splice(3);
};

test("Renders the BookingForm heading", () => {
  render(
    <BookingForm availableTimes={availableTimes} onDateChange={changeDate} />
  );

  const headingElement = screen.getByText(/Book now/i);

  expect(headingElement).toBeInTheDocument();
});

// test("Renders the provided available time options", () => {
//   render(
//     <BookingForm availableTimes={availableTimes} updateTimes={()=>{}} submitForm={()=>{}}/>
//   );

//   const timeOptions = within(
//     screen.getByRole("combobox", { name: /time picker/i })
//   )
//     .getAllByRole("option")
//     .map((o) => o.value);

//   expect(timeOptions.toString()).toEqual(availableTimes.toString());
// });

