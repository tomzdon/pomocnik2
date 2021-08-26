import en from "./i18n";

export function validateEmail(email) {
  if (!email) {
    return en.ERRORS.EMPTY_EMAIL;
  }
  //Check email regex
 
}

export function validatePassword(password) {
  if (!password) {
    return en.ERRORS.EMPTY_PASSWORD;
  }
  if (password.length < 6 ) {
    return en.ERRORS.COUNT_PASSWORD;
  }
}

export function validateEmailPassword(email, password) {
  const msg = validateEmail(email);

  if (msg) {
    return msg;
  }

  return validatePassword(password);
}
