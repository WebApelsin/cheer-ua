import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database, Performance } from "@/types/supabase";

export default async function getStartlist(event_id: number, cookies: () => any): Promise<Performance[]> {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
        .from("startlist")
        .select()
        .eq("event_id", event_id);

    if (error)
        throw new Error(error.message);

    return data;
}