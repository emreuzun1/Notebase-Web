export const usernameValidator = (input: string) => {
  const regularExpression = '^[A-Za-z][A-Za-z0-9_]{7,29}$';
  if (input.match(regularExpression)) {
    return true;
  } else {
    return false;
  }
};

export const passwordValidator = (input: string) => {
  const regex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';
  if (input.match(regex)) {
    return true;
  } else {
    return false;
  }
};

export const emailValidator = (input: string) => {
  //const regex = "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$";
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input);
}

export const checkForBlank = (input: string) => {
  return /^(?!\s*$).+/.test(input);
}
