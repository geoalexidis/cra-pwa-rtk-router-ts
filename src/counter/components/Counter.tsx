import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { dispatch } from "../../state/init/store";
import { decrement, increment, incrementByAmount, incrementAsync, selectCount } from "../slices/counterSlice";
import styles from "./Counter.module.css";
import { doubleAsyncCounter, halfAsyncCounter, incrementIfOdd } from "../actions/counterActions";

export function Counter() {
  const count = useAppSelector(selectCount);
  const asyncDoubleCounter = useAppSelector(state => state.counter.asyncDoubleCounter);
  const asyncHalfCounter = useAppSelector(state => state.counter.asyncHalfCounter);
  const [incrementAmount, setIncrementAmount] = useState("2");

  useEffect(
    function asyncEffectExample() {
      async function fetchData() {
        // without await for continuing the execution
        halfAsyncCounter().then();
        // await for operation to finish
        const response = await dispatch(doubleAsyncCounter());
        console.info("response from doubleAsyncCounter", response);
      }

      fetchData().then();
    },
    [count],
  );

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button className={styles.button} onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </button>
        <button className={styles.asyncButton} onClick={() => dispatch(incrementAsync(incrementValue))}>
          Add Async
        </button>
        <button className={styles.button} onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          Add If Odd
        </button>
      </div>
      <div>{`State of asyncDoubleCounter ${asyncDoubleCounter}`}</div>
      <div>{`State of asyncHalfCounter ${asyncHalfCounter}`}</div>
    </div>
  );
}
