import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Location } from "history";

// workaround use-query-params adapter for React Router v6
// https://github.com/pbeshai/use-query-params/issues/196#issuecomment-990584258
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
  return children({ history: adaptedHistory, location: reactRouterLocation });
};
