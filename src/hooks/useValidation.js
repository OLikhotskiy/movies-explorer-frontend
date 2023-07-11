import React from "react";
import isEmail from "validator/es/lib/isEmail";

export function useValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isFormValid, setFormValid] = React.useState(false);

  function onChange(evt) {
    const { name, value } = evt.target;
    const error = evt.target.validationMessage;
    const formValid = evt.target.closest("form").checkValidity();
    if (name === "email" && !isEmail(value)) {
      evt.target.setCustomValidity(
        "Укажите электронную почту в формате name@domain.zone"
      );
    } else {
      evt.target.setCustomValidity("");
    }
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: error }));
    setFormValid(formValid);
  }

  const resetValidation = React.useCallback(
    (isFormValid = false, values = {}, errors = {}) => {
      setFormValid(isFormValid);
      setValues(values);
      setErrors(errors);
    },
    [setFormValid, setValues, setErrors]
  );

  return {
    values,
    errors,
    isFormValid,
    onChange,
    resetValidation,
  };
}

