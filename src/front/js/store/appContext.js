import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        
        const initialState = getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: (updatedStore) =>
                setState((prevState) => ({
                    store: { ...prevState.store, ...updatedStore },
                    actions: { ...prevState.actions },
                })),
        });

        const [state, setState] = useState(initialState);

        useEffect(() => {
            if (state.actions && state.actions.getMessage) {
                state.actions.getMessage();
            }
        }, []);

        if (!state || !state.store) {
            return <div>Loading...</div>;
        }

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;