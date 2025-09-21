import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (pathname.startsWith('/user')) {
        try {
            const user = await stackServerApp.getUser()

            if (!user) {
                const url = request.nextUrl.clone()      
                url.pathname = '/'
                return NextResponse.redirect(url)
            }

            return NextResponse.next()

        } catch (error) {
            console.error('Auth middleware error:', error)
            const url = request.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    }

    if (pathname === '/') {
        try {
            const user = await stackServerApp.getUser()

            if (user) {
                const url = request.nextUrl.clone()
                url.pathname = "/user"
                return NextResponse.redirect(url)
            }

            return NextResponse.next()
        } catch (error) {
            console.error('Home redirect error:', error)
            return NextResponse.next()
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/user/:path*',
        '/'
    ],
}
