import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/types/supabase";

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    return (
        <main>
            <h1>Homepage</h1>
            <p>Hello, {session?.user.email}</p>

            <Link href="/startlist">Стартлист</Link>
            <Link href="/auth/signout">Вийти</Link>
        </main>
    );
}
