import { isValid, isBefore, add } from "date-fns";

export function validateForm(oldFormState) {
  let formState = Object.create(oldFormState);

  const dateValidationResult = validateDate(formState.date.value);
  if (!dateValidationResult.isValid) {
    formState.isValid = false;
    formState.date.isValid = false;
    formState.date.errors = dateValidationResult.errors;
  }

  const guestValidationResult = validateGuests(
    formState.guests.value,
    formState.guests.maxTableSize,
  );
  if (!guestValidationResult.isValid) {
    formState.isValid = false;
    formState.guests.isValid = false;
    formState.guests.errors = guestValidationResult.errors;
  }

  const timeValidationResult = validateTime(formState.time.value);
  if (!timeValidationResult.isValid) {
    formState.isValid = false;
    formState.time.isValid = false;
    formState.time.errors = timeValidationResult.errors;
  }
  return formState;
}

export function validateDate(dateString) {
  const result = new ValidationResult();
  let date = new Date(dateString);
  let today = new Date();

  if (!isValid(date)) result.setInvalid("You must select a valid date!");

  if (isBefore(date, today))
    result.setInvalid("The reservation date cannot be before tomorrow!");

  return result;
}

export function validateGuests(guests, maxTableSize) {
  const result = new ValidationResult();

  if (isNaN(guests) || typeof guests !== "number")
    result.setInvalid(`You must enter a valid integer number.`);

  if (guests < 1 || guests > maxTableSize)
    result.setInvalid(
      `Number of guests must be in the range between 1 and ${maxTableSize}`,
    );
  return result;
}

export function validateTime(time) {
  const result = new ValidationResult();
  let re = new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);

  if (time === "" || time === "Select time")
    result.setInvalid("You must select time for the reservation.");

  if (!re.test(time)) result.setInvalid("Time is not in the correct format.");

  return result;
}

export function validateOccasion(occasion) {
  return new ValidationResult();
}

class ValidationResult {
  constructor() {
    this.isValid = true;
    this.errors = [];
  }
  setInvalid = (msg) => {
    this.isValid = false;
    this.errors.push(msg);
  };
}
