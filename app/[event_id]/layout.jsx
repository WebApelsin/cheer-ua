import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getEventById } from "@/api";

import Header from "./Header";

export default async function Layout({ params: { event_id }, children }) {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    const event = await getEventById(event_id, cookies);

    return (
        <>
            <Header event={event} user={session?.user} />
            <main>
                {children}
            </main>
        </>
    );
}