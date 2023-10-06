"use client";

import React, { createContext, useCallback, useReducer, useMemo } from 'react';

type State = {
    activeStep: number;
    formValues: {
        "address": string;
        "dogsAllowed": number;
        "catsAllowed": number;
        "trashValet": number;
        "evCharging": number;
        "pool": number;
        "gym": number;
        "dogPark": number;
        "maintenance": number;
        "washerDryer": number;
        "stainlessSteel": number;
        "bedrooms": number;
        "bathrooms": number;
        "sqft": number;
        "price": number;
    }
}

type Action = | { type: 'increment' } | { type: 'decrement' } | { type: 'updateFormValues', name: string, value: any }

type ContextProps = {
    activeStep: number;
    formValues: {
        "address": string;
        "dogsAllowed": number;
        "catsAllowed": number;
        "trashValet": number;
        "evCharging": number;
        "pool": number;
        "gym": number;
        "dogPark": number;
        "maintenance": number;
        "washerDryer": number;
        "stainlessSteel": number;
        "bedrooms": number;
        "bathrooms": number;
        "sqft": number;
        "price": number;
    }
    handleNext: () => void;
    handleBack: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppContext = createContext<ContextProps>({
    activeStep: 0,
    formValues: {
        "address":'',
        "dogsAllowed": 0.5,
        "catsAllowed": 0.5,
        "trashValet": 0.5,
        "evCharging": 0.5,
        "pool": 0.5,
        "gym": 0.5,
        "dogPark": 0.5,
        "maintenance": 0.5,
        "washerDryer": 0.5,
        "stainlessSteel": 0.5,
        "bedrooms": 0.5,
        "bathrooms": 0.5,
        "sqft": 0.5,
        "price": 0.5
    },
    handleNext: () => {},
    handleBack: () => {},
    handleChange: () => {}
});

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'increment':
            return { ...state, activeStep: state.activeStep + 1 };
        case 'decrement':
            return { ...state, activeStep: state.activeStep - 1 };
        case 'updateFormValues':
            return { ...state, formValues: { ...state.formValues, [action.name]: action.value } }
    }
}

export function StepFormProvider({ children } : { children: React.ReactNode }) {
    const [{ activeStep, formValues }, dispatch] = useReducer(reducer, {
        activeStep: 0,
        formValues: {
            "address":'',
            "dogsAllowed": 0.5,
            "catsAllowed": 0.5,
            "trashValet": 0.5,
            "evCharging": 0.5,
            "pool": 0.5,
            "gym": 0.5,
            "dogPark": 0.5,
            "maintenance": 0.5,
            "washerDryer": 0.5,
            "stainlessSteel": 0.5,
            "bedrooms": 0,
            "bathrooms": 0,
            "sqft": 0,
            "price": 0
        }
    });

    const handleNext = useCallback(() => {
        dispatch({ type: 'increment' })
    }, []);

    const handleBack = useCallback(() => {
        dispatch({ type: 'decrement' })
    }, []);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'updateFormValues', name: event.target.name, value: event.target.value })
    }, []);

    const contextValue = useMemo(
        () => ({
            activeStep,
            formValues,
            handleNext,
            handleBack,
            handleChange
        }),
        [activeStep, formValues, handleNext, handleBack, handleChange]
    );

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}