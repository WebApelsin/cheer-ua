"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/supabase";
import type { PostgrestError } from "@supabase/supabase-js";

type Performance = Database["public"]["Views"]["startlist"]["Row"];
type Status = "IDLE" | "LOADING" | "OK" | "ERROR";

export default function useStartlist(): [Performance[], Status, PostgrestError | null] {
    const supabase = createClientComponentClient<Database>();

    const [startlist, setStartlist] = useState<Performance[]>([]);
    const [status, setStatus] = useState<Status>("IDLE");
    const [error, setError] = useState<PostgrestError | null>(null);

    async function getData() {
        const { data, error } = await supabase
            .from("startlist")
            .select();

        if (data !== null) {
            setStartlist(data);
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

    return [startlist, status, error];
}