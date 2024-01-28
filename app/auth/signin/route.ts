import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/types/supabase";

export async function POST(request: Request) {
    const requestUrl = new URL(request.url);

    const formData = await request.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        // TODO: handle error
        return NextResponse.redirect(`${requestUrl.origin}/auth`, { status: 301 });
    }

    const returnUrl = requestUrl.searchParams.get("returnUrl") || "/";
    // TODO: check whether the returnUrl is localUrl
    return NextResponse.redirect(new URL(returnUrl, request.url));
}