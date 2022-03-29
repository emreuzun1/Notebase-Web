export interface RegisterInterface {
  username: string;
  password: string;
  email: string;
}

export interface LoginInterface {
  username: string;
  password: string;
}

export interface Student {
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
  };
  token: string;
}

export interface StudentState {
  loading: boolean;
  student: Student | undefined;
  errorMessage: string;
}
