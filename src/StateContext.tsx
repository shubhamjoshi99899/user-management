import React, { createContext, useContext, useReducer, Dispatch } from "react";

// Define types
type State = {
  responseData: any;
  serviceProviderData: any;
  requestData: any;
  draftData: any;
};

interface Props {
  children: React.ReactNode;
}

type Action =
  | { type: "SET_RESPONSE_DATA"; payload: any }
  | { type: "SET_SERVICE_PROVIDER_DATA"; payload: any }
  | { type: "SET_REQUEST_DATA"; payload: any }
  | { type: "SET_DRAFT_DATA"; payload: any };

// Create a context
const initialState: State = {
  responseData: null,
  serviceProviderData: null,
  requestData: null,
  draftData: null,
};

const StateContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create a reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_RESPONSE_DATA":
      return { ...state, responseData: action.payload };
    case "SET_SERVICE_PROVIDER_DATA":
      return { ...state, serviceProviderData: action.payload };
    case "SET_REQUEST_DATA":
      return { ...state, requestData: action.payload };
    case "SET_DRAFT_DATA":
      return { ...state, draftData: action.payload };
    default:
      return state;
  }
};

// Create a provider
const StateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// Create custom hooks to use the context and dispatch
const useStateContext = () => {
  return useContext(StateContext);
};

export { StateProvider, useStateContext };
