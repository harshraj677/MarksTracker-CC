import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect /teacher routes (except /teacher/login)
  if (
    !user &&
    request.nextUrl.pathname.startsWith("/teacher") &&
    !request.nextUrl.pathname.startsWith("/teacher/login")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/teacher/login";
    return NextResponse.redirect(url);
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (user && request.nextUrl.pathname === "/teacher/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/teacher/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
