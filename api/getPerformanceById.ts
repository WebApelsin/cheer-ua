import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database, Performance } from "@/types/supabase";

export default async function getPerformanceById(id: number, cookies: () => any)
    : Promise<Performance | null>
{
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
        .from("startlist")
        .select()
        .eq("id", id);

    if (error)
        throw new Error(error.message);

    return data.length > 0 ? data[0] : null;
}