import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/types/supabase";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);

    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.signOut();

    return NextResponse.redirect(`${requestUrl.origin}/auth`, { status: 301 });
}