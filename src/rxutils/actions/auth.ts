import { LoginInterface, RegisterValues } from "../../Interfaces/Student";

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

export function requestRegister(inputs: RegisterValues) {
  return {
    type: "REGISTER_REQUEST",
    payload: {
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
    },
  };
}

export function requestUser(id: string) {
  return {
    type: "GET_STUDENT_REQUEST",
    payload: {
      id,
    },
  };
}
