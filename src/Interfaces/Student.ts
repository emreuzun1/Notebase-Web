export interface RegisterValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  department: string;
  faculty: string;
  university: string;
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
    date: string;
    date_joined: string;
    department: string;
    faculty: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: string;
    last_name: string;
    first_name: string;
    point: number;
    university: string;
    user_permissions: any;
  };
  token: string;
}

export interface StudentState {
  loading: boolean;
  student: Student | undefined;
  errorMessage: string;
}
