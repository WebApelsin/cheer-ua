import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    return (
        <main>
            <h1>Homepage</h1>
            <p>Hello, {session?.user.email} ({session?.user.id})</p>

            <Link href="/startlist">Стартлист</Link>
            <Link href="/auth/signout">Вийти</Link>
        </main>
    );
}
