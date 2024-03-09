import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database, Assignment } from "@/types/supabase";

export default async function getAssignments(event_id: number, cookies: () => any)
    : Promise<Assignment[]>
{
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
        .from("judges")
        .select()
        .eq("event_id", event_id);

    if (error)
        throw new Error(error.message);

    return data;
}