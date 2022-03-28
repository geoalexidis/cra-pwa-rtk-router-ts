import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../../counter/slices/counterSlice";
import { pokemonApi } from "../../pokemon/services/pokemonApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import { hnApi } from "../../search/services/hnApi";
import { blogApi } from "../../blog/services/blogApi";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    counter: counterReducer,
    // Add the generated reducer as a specific top-level slice
    // [pokemonApi.reducerPath]: pokemonApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [hnApi.reducerPath]: hnApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  }),
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(routerMiddleware, pokemonApi.middleware, hnApi.middleware, blogApi.middleware),
});

export const history = createReduxHistory(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const dispatch: AppDispatch = store.dispatch;
export function getState(): RootState {
  return store.getState();
}

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
