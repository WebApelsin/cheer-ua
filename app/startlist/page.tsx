import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/types/supabase";

export default async function Startlist() {
    const supabase = createServerComponentClient<Database>({ cookies });

    // TODO: filter by event_id
    const { data, error } = await supabase
        .from("performances")
        .select("*");

    return (
        <main>
            <h1>Стартлист</h1>
            <pre>
                {JSON.stringify(data, null, 4)}
            </pre>
        </main>
    );
}