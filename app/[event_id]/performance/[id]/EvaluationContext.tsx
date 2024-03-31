"use client";

import { createContext, useState, useCallback } from "react";

export const EvaluationContext = createContext({
    score: 0,
    setScore: (total: number) => {}
});

export function EvaluationContextProvider({ children, score = 0 }: { children: React.ReactNode, score: number }) {
    const [value, setValue] = useState(score);

    const onChange = useCallback((value: number) => {
        setValue(value);
    }, [setValue]);

    return (
        <EvaluationContext.Provider value={{ score: value, setScore: onChange }}>
            {children}
        </EvaluationContext.Provider>
    );
}