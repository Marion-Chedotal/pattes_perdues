import errorMessages from "./errorMessages.json";

export const validateRegisterInputs = ({
  login,
  email,
  password,
  postalCode,
  selectedCity,
  avatar,
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

export const validatePostInputs = (formData) => {
  const requiredFields = {
    gender: "gender",
    alert_date: "alert_date",
    description: "description",
    street: "street",
    postalCode: "postalCode",
    selectedCity: "selectedCity",
    tattoo: "tattoo",
    microchip: "microchip",
    collar: "collar",
  };

  const errors = {};

  Object.entries(requiredFields).forEach(([fieldName, value]) => {
    if (!formData[fieldName]) {
      errors[value] = errorMessages.post.fieldsToFill;
    }
  });

  if (formData.postalCode?.length !== 5) {
    errors.postalCode = errorMessages.post.postalCode;
  }

  if (!formData.selectedCity) {
    errors.selectedCity = errorMessages.post.cityNotSelected;
  }
  
  return errors;
};
