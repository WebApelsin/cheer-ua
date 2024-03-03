"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database, Performance } from "@/types/supabase";
import type { PostgrestError } from "@supabase/supabase-js";

type Status = "IDLE" | "LOADING" | "OK" | "ERROR";

export default function usePerformance(id: number): [
    Performance | null,
    Status,
    PostgrestError | null
] {
    const supabase = createClientComponentClient<Database>();

    const [performance, setPerformance] = useState<Performance | null>(null);
    const [status, setStatus] = useState<Status>("IDLE");
    const [error, setError] = useState<PostgrestError | null>(null);

    async function getData(performance_id: number) {
        const { data, error } = await supabase
            .from("startlist")
            .select()
            .eq("id", performance_id);

        if (data !== null) {
            setPerformance(data.length > 0 ? data[0] : null);
            setStatus("OK");
            setError(null);
        } else {
            setError(error);
            setStatus("ERROR");
        }
    }

    useEffect(() => {
        getData(id);
    }, [id]);

    return [performance, status, error];
}