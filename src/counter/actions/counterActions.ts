// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
import { AppThunk, dispatch, getState } from "../../state/init/store";
import { fetchCount } from "../services/counterApi";
import { asyncDoubleCounter, asyncHalfCounter, incrementByAmount, selectCount } from "../slices/counterSlice";

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

// getState and dispatch from Thunk used
export const doubleAsyncCounter = (): AppThunk => async (dispatch, getState) => {
  const currentValue = selectCount(getState());
  // perform some async action
  const count = await fetchCount(currentValue);
  // double the counter
  dispatch(asyncDoubleCounter(count.data * 2));

  return true;
};

// getState and dispatch from import used
export const halfAsyncCounter = async (): Promise<boolean> => {
  const currentValue = selectCount(getState());
  // perform some async action
  const count = await fetchCount(currentValue);
  // double the counter
  dispatch(asyncHalfCounter(count.data / 2));

  return true;
};
