"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database, EvaluationCriteria } from "@/types/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
type Status = "IDLE" | "LOADING" | "OK" | "ERROR";

export default function useEvaluationCriterias(performance_id: number): [
    EvaluationCriteria[],
    Status,
    PostgrestError | null
] {
    const supabase = createClientComponentClient<Database>();

    const [criterias, setCriterias] = useState<EvaluationCriteria[]>([]);
    const [status, setStatus] = useState<Status>("IDLE");
    const [error, setError] = useState<PostgrestError | null>(null);

    async function getData(performance_id: number) {
        const { data, error } = await supabase
            .from("evaluations_template")
            .select()
            .eq("performance_id", performance_id);

        if (data !== null) {
            setCriterias(data);
            setStatus("OK");
            setError(null);
        } else {
            setStatus("ERROR");
            setError(error);
        }
    }

    useEffect(() => {
        getData(performance_id);
    }, [performance_id]);

    return [criterias, status, error];
}