import errorMessages from "./errorMessages.json";

const validateInputs = ({
  login,
  email,
  password,
  postalCode,
  selectedCity,
  avatar
}) => {
  let errors = {};

  if (!/^[a-zA-Z0-9-_]{8,}$/.test(login)) {
    errors.login = errorMessages.register.loginInvalid;
  }

  if (!/^[^\s@]+@[^\s@]+\.(com|net|org|gov|edu|fr|io)$/.test(email)) {
    errors.email = errorMessages.register.emailInvalid;
  }

  if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{10,32}/.test(
      password
    )
  ) {
    errors.password = errorMessages.register.passwordInvalid;
  }

  if (postalCode?.length !== 5) {
    errors.postalCode = errorMessages.register.postalCode;
  }

  if (!selectedCity) {
    errors.selectedCity = errorMessages.register.cityNotSelected;
  }

  return errors;
};

export default validateInputs;
