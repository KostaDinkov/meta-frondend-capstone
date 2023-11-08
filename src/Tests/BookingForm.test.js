import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import BookingForm from "../Components/BookingForm";
import FakeReservationsApi from "../data/fakeApi";
import { add, format } from "date-fns";

//-- NOTE -- the tests will use the default fake api data
const api = new FakeReservationsApi({
  isNetworkDelay: false,
  isRandomSuccess: false,
});

describe("Reservation form stage 0", () => {
  let maxTableSize = null;
  const setup = () => {
    render(<BookingForm maxTableSize={maxTableSize} api={api} />);
  };
  beforeAll(async () => {
    maxTableSize = await api.getMaxTableSize();
  });

  test("Renders the BookingForm heading", () => {
    setup();
    const headingElement = screen.getByText(/make your reservation/i);

    expect(headingElement).toBeInTheDocument();
  });

  test("Displays date picker", () => {
    setup();
    const button = screen.getByText(/choose date/i);

    expect(button).toBeInTheDocument();
  });

  test("Displays disabled button", () => {
    setup();
    const button = screen.getByText(/check availability/i);

    expect(button).toHaveAttribute("disabled");
    expect(button).toBeInTheDocument();
  });

  const validDateGuests = [
    [format(add(new Date(), { days: 1 }), "yyyy-MM-dd"), 1],
    [format(add(new Date(), { days: 2 }), "yyyy-MM-dd"), 16],
  ];
  test.each(validDateGuests)(
    "Button should be enabled on valid input values - date: %s, guests: %d",
    (date, guests) => {
      setup();

      const datePicker = screen.getByLabelText(/choose date/i);
      const guestsInput = screen.getByLabelText(/number of guests/i);

      fireEvent.change(datePicker, { target: { value: date } });
      fireEvent.change(guestsInput, { target: { value: guests } });

      const button = screen.getByText(/check availability/i);

      expect(button).not.toHaveAttribute("disabled");
    }
  );

  const invalidDateGuests = [
    ["", ""],
    [format(add(new Date(), { days: 0 }), "yyyy-MM-dd"), ""],
    ["", 1],
  ];

  test.each(invalidDateGuests)(
    "Button should be disabled when one of the inputs is invalid: date: %s guests: %d",
    async (date, guests) => {
      await setup();
      const datePicker = screen.getByLabelText(/choose date/i);
      const guestsInput = screen.getByLabelText(/number of guests/i);

      fireEvent.change(datePicker, { target: { value: date } });
      fireEvent.change(guestsInput, { target: { value: guests } });

      const button = screen.getByText(/check availability/i);

      expect(button).toHaveAttribute("disabled");
    }
  );
});

describe("Reservation form stage 1", () => {
  let maxTableSize = null;

  beforeAll(async () => {
    maxTableSize = await api.getMaxTableSize();
  });

  const tomorrow = format(add(new Date(), { days: 1 }), "yyyy-MM-dd");

  const setup = async () => {
    render(<BookingForm maxTableSize={maxTableSize} api={api} />);

    const datePicker = screen.getByLabelText(/choose date/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const button = screen.getByText(/check availability/i);

    fireEvent.change(datePicker, { target: { value: tomorrow } });
    fireEvent.change(guestsInput, { target: { value: 1 } });

    expect(button).not.toHaveAttribute("disabled");
    fireEvent.click(button);

    await waitForElementToBeRemoved(button);
  };

  test("Form elements should be visible", async () => {
    await setup();

    const heading = screen.getByText(/choose time/i);
    const occasionInput = screen.getByLabelText(/occasion/i);
    const timeInput = screen.getByLabelText(/time/i);
    const backButton = screen.getByText(/back/i);
    const reservationButton = screen.getByText(/book now/i);

    const elements = [
      heading,
      occasionInput,
      timeInput,
      backButton,
      reservationButton,
    ];

    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(reservationButton).toHaveAttribute("disabled");
  });
  test("Form should display error on invalid time input and blur", async () => {
    await setup();

    const timeInput = screen.getByLabelText(/time/i);
    fireEvent.blur(timeInput);
    const errorMessages = screen.getAllByRole("alert");
    const reservationButton = screen.getByText(/book now/i);

    expect(reservationButton).toHaveAttribute("disabled");
    expect(errorMessages[0]).toHaveTextContent(/You must/i);
  });

  test("Form should display message after successful submit", async () => {
    // Todo fix select not triggering onChange?
    await setup();
    const timeInput = screen.getByLabelText(/time/i);

    const reservationButton = screen.getByText(/book now/i);

    within(timeInput)
      .findAllByRole("option")
      .then((options) => {
        fireEvent.change(timeInput, {target: {value: options[1].value}});
      });

    expect(reservationButton).not.toHaveAttribute("disabled");
    fireEvent.click(reservationButton);
    await waitForElementToBeRemoved(reservationButton);
  });
});
