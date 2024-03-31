import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/supabase";

export type EvaluationTotal = {
    performance_id: number;
    nomination_id: number;
    age_id: number;
    value: number;
};

export default async function getTotalEvaluations(event_id: number, cookies: () => any)
    : Promise<EvaluationTotal[]>
{
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data: performances_data, error: performances_error } = await supabase
        .from("performances")
        .select("id, nomination_id, age_id")
        .eq("event_id", event_id);

    if (performances_error)
        throw new Error(performances_error.message);

    const { data: evaluations_data, error: evaluations_error } = await supabase
        .from("evaluations")
        .select("performance_id, value")
        .in("performance_id", performances_data.map(performance => performance.id));

    if (evaluations_error)
        throw new Error(evaluations_error.message);

    const data = performances_data.map(performance => {
        let evaluations = evaluations_data.filter(evaluation => evaluation.performance_id === performance.id);

        let total = -1;
        if (evaluations.length > 0) {
            total = evaluations
                .filter(evaluation => evaluation.performance_id === performance.id)
                .reduce((total, evaluation) => total + evaluation.value, 0);
        }

        return {
            performance_id: performance.id,
            nomination_id: performance.nomination_id,
            age_id: performance.age_id,
            value: total
        } as EvaluationTotal;
    });

    return data
        .filter(evaluation => evaluation.value >= 0)
        .sort((a, b) => b.value - a.value);
}