import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/supabase";

type EvaluationTotal = {
    performance_id: number;
    value: number;
};

export default async function getTotalEvaluations(cookies: () => any)
    : Promise<EvaluationTotal[]>
{
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
        .from("evaluations")
        .select("performance_id, value");

    if (error)
        throw new Error(error.message);

    const totals = data.reduce((totals, evaluation) => {
        const performance_id = evaluation.performance_id.toString();
        const value = evaluation.value;

        if (performance_id in totals) {
            totals[performance_id] += value;
        } else {
            totals[performance_id] = value;
        }

        return totals;
    }, {} as { [key: string]: number });

    return Object.entries(totals).map(([performance_id, value]) => ({
        performance_id: parseInt(performance_id),
        value: value
    }));
}