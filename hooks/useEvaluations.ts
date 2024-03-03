"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database, Evaluation } from "@/types/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
type Status = "IDLE" | "LOADING" | "OK" | "ERROR";

export default function useEvaluations(performance_id: number): [
    Evaluation[],
    Status,
    PostgrestError | null
] {
    const supabase = createClientComponentClient<Database>();

    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [status, setStatus] = useState<Status>("IDLE");
    const [error, setError] = useState<PostgrestError | null>(null);

    async function getData() {
        const { data, error } = await supabase
            .from("evaluations")
            .select()
            .eq("performance_id", performance_id);

        if (data !== null) {
            setEvaluations(data);
            setStatus("OK");
            setError(null);
        } else {
            setError(error);
            setStatus("ERROR");
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return [evaluations, status, error];
}