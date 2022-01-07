import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { history, store } from "./state/init/store";
import App from "./App";
import { HistoryRouter as Router } from "redux-first-history/rr6";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
