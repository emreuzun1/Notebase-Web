/* eslint-disable import/no-anonymous-default-export */
import produce from "immer";
import { Student, StudentState } from "../../Interfaces/Student";

interface ActionInterface {
  payload: Student;
  type: string;
}

const initialState: StudentState = {
  loading: false,
  student: undefined,
  errorMessage: "",
};

export default (state = initialState, action: ActionInterface) =>
  produce(state, (draft: StudentState) => {
    switch (action.type) {
      case "LOGIN_REQUEST": {
        draft.loading = true;
        break;
      }
      case "LOGIN_SUCCESS": {
        draft.student = action.payload;
        draft.loading = false;
        break;
      }
      case "GET_STUDENT_SUCCESS": {
        draft.student!.user = action.payload.user;
        break;
      }
      default:
        return state;
    }
  });
