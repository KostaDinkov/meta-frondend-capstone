export function resetField() {
  return {
    isValid: false,
    value: "",
    errorMessages: [],
    isTouched: false,
  };
}
