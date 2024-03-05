import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database, EvaluationCriteria } from "@/types/supabase";

export default async function getEvaluationCriterias(performance_id: number, cookies: () => any)
    : Promise<EvaluationCriteria[] | null>
{
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
        .from("evaluations_template")
        .select()
        .eq("performance_id", performance_id);

    if (error)
        throw new Error(error.details);

    return data;
}