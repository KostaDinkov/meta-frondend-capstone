import {
  validateDate,
  validateGuests,
  validateTime,
} from "../Components/BookingForm/validators";
import { format, add } from "date-fns";

describe("validateDate", () => {
  test("returns empty array when date string is in the format yyyy-MM-dd", () => {
    let dateStr = format(add(new Date(), { days: 1 }), "yyyy-MM-dd");
    let validationResult = validateDate(dateStr);

    expect(validationResult.errors.length).toBe(0);
  });
  test("returns invalid errors when date string is not in the format yyyy-MM-dd", () => {
    let dateStr = "";
    let validationResult = validateDate(dateStr);

    expect(validationResult.errors.length).toBeGreaterThan(0);
    expect(validationResult.isValid).toBeFalsy();
  });
  test("returns invalid result with errors when date string is today or earlier", () => {
    let dateStr = format(new Date(), "yyyy-MM-dd");
    let validationResult = validateDate(dateStr);

    expect(validationResult.errors.length).toBeGreaterThan(0);
    expect(validationResult.isValid).toBeFalsy();
  });
});
describe("validateGuests", () => {
  test("should return invalid result given empty string", () => {
    let validationResult = validateGuests("", 12);

    expect(validationResult.errors.length).toBeGreaterThan(0);
    expect(validationResult.isValid).toBeFalsy();
  });

  const outOfRangeValues = [-1, 0, 200];
  test.each(outOfRangeValues)(
    "should return invalid result given %d",
    (input) => {
      let validationResult = validateGuests(input, 12);

      expect(validationResult.errors.length).toBeGreaterThan(0);
      expect(validationResult.isValid).toBeFalsy();
    },
  );

  const inRangeValues = [1, 5, 12];
  test.each(inRangeValues)("should return valid result given %d", (input) => {
    let validationResult = validateGuests(input, 12);

    expect(validationResult.isValid).toBeTruthy();
    expect(validationResult.errors.length).toBe(0);
  });
});

describe("validateTime", () => {
  const validTimes = [
    "17:00",
    "05:00",
    "5:00",
    "22:30",
    "10:01",
    "00:00",
    "0:00",
  ];
  test.each(validTimes)("should return valid result given %s", (input) => {
    let validationResult = validateTime(input);

    expect(validationResult.isValid).toBeTruthy();
    expect(validationResult.errors.length).toBe(0);
  });
  const invalidTimes = ["05:0", "11", "24:00", "hello", "25:00", "-10:10"];
  test.each(invalidTimes)("should return invalid result given %s", (input) => {
    let validationResult = validateTime(input);

    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors.length).toBeGreaterThan(0);
  });
});
