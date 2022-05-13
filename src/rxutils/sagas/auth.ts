import { put, call, takeLatest } from "redux-saga/effects";
import { LoginInterface, RegisterValues } from "../../Interfaces/Student";
import { getStudentApi, loginApi } from "../../lib/api";

interface ActionInterface {
  type: string;
  payload: RegisterValues | LoginInterface;
  navigate: () => void;
}

function* userLogin(action: ActionInterface) {
  try {
    const { username, password } = action.payload;
    const {
      data: { user, token },
      status,
    } = yield call(loginApi, { username, password });
    if (status === 200) {
      yield put({ type: "LOGIN_SUCCESS", payload: { user, token } });
    }
  } catch (err) {
    console.log(err);
  }
}

function* getUser(action: any) {
  try {
    const { id } = action.payload;
    const { data, status } = yield call(getStudentApi, id);
    if (status === 200) {
      yield put({ type: "GET_STUDENT_SUCCESS", payload: { user: data } });
    }
  } catch (err) {
    console.log(err);
  }
}

const authSaga = [
  takeLatest("LOGIN_REQUEST", userLogin),
  takeLatest("GET_STUDENT_REQUEST", getUser),
];

export default authSaga;
