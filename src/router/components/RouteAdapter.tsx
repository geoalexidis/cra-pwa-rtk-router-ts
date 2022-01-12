import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Location } from "history";

/**
 * This is the main thing you need to use to adapt the react-router v6
 * API to what use-query-params expects.
 *
 * Pass this as the `ReactRouterRoute` prop to QueryParamProvider.
 */
// use-query-params adapeter for React Router 6
export const RouteAdapter: React.FC = ({ children }) => {
  const reactRouterNavigate = useNavigate();
  const reactRouterLocation = useLocation();

  const adaptedHistory = useMemo(
    () => ({
      // can disable eslint for parts here, location.state can be anything
      replace(location: Location) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        reactRouterNavigate(location, { replace: true, state: location.state });
      },
      push(location: Location) {
        reactRouterNavigate(location, {
          replace: false,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          state: location.state,
        });
      },
    }),
    [reactRouterNavigate],
  );
  // https://github.com/pbeshai/use-query-params/issues/196
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return children({ history: adaptedHistory, reactRouterLocation });
};
