import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabase";

export async function middleware(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const response = NextResponse.next();
    const supabase = createMiddlewareClient<Database>({ req: request, res: response });

    const { data: { session } } = await supabase.auth.getSession();

    if (session === null) {
        const loginUrl = new URL("/auth", request.url);
        loginUrl.searchParams.set("returnUrl", requestUrl.pathname + requestUrl.search);

        return NextResponse.redirect(loginUrl);
    }

    return response;
}

export const config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        "/((?!auth|_next/static|_next/image|favicon.ico).*)"
    ]
};