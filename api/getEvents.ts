import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database, Event } from "@/types/supabase";

export default async function getEvents(cookies: () => any)
    : Promise<Event[]>
{
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
        .from("events")
        .select()
        .eq("is_active", true);

    if (error)
        throw new Error(error.message);

    return data;
}