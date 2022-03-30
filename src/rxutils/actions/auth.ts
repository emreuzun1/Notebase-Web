import { LoginInterface, RegisterInterface } from "../../Interfaces/Student";

export function requestLogin(inputs: LoginInterface, navigate: () => void) {
  return {
    type: "LOGIN_REQUEST",
    payload: {
      username: inputs.username,
      password: inputs.password,
    },
    navigate,
  };
}

export function requestRegister(inputs: RegisterInterface) {
  return {
    type: "REGISTER_REQUEST",
    payload: {
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
    },
  };
}
