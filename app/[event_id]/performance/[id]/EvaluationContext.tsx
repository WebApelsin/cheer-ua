"use client";

import { createContext, useState, useCallback } from "react";

export const EvaluationContext = createContext({
    total: 0,
    setTotal: (total: number) => {}
});

export function EvaluationContextProvider({ children, total = 0 }: { children: React.ReactNode, total: number }) {
    const [value, setValue] = useState(total);

    const onChange = useCallback((value: number) => {
        setValue(value);
    }, [setValue]);

    return (
        <EvaluationContext.Provider value={{ total: value, setTotal: onChange }}>
            {children}
        </EvaluationContext.Provider>
    );
}