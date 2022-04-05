import { put, call, takeLatest } from "redux-saga/effects";
import { LoginInterface, RegisterValues } from "../../Interfaces/Student";
import { loginApi } from "../../lib/api";

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

const authSaga = [takeLatest("LOGIN_REQUEST", userLogin)];

export default authSaga;
