import React from "react";
import { useStore } from "./store-provider";

export default function withStore(Component) {
  return function WrappedComponent(props) {
    const { state, dispatch } = useStore();
    return <Component state={state} dispatch={dispatch} />;
  };
}
