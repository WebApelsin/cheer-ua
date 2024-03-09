import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database, Evaluation } from "@/types/supabase";

export default async function getEvaluations(performance_id: number, cookies: () => any)
    : Promise<Evaluation[]>
{
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
        .from("evaluations")
        .select()
        .eq("performance_id", performance_id);

    if (error)
        throw new Error(error.message);

    return data;
}