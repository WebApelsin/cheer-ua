import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database, Event } from "@/types/supabase";

export default async function getEventById(id: number, cookies: () => any)
    : Promise<Event | null>
{
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
        .from("events")
        .select()
        .eq("id", id);

    if (error)
        throw new Error(error.message);

    return data.length > 0 ? data[0] : null;
}