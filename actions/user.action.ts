"use server"

import { stackServerApp } from "@/stack"
import { NextResponse } from "next/server"
import { neon } from '@neondatabase/serverless';



export async function getUserDetails (userId : string | undefined) {
    if(!process.env.DATABASE_URL) {
        return NextResponse.json({message: "Database URL not found"}, {status: 500})
    }

    if(!userId) {
        return NextResponse.json({message: "User ID not found"}, {status: 400})
    }

    const sql = neon(process.env.DATABASE_URL);
      const [user] = await sql`SELECT * FROM posts WHERE id = ${userId}`;
      if (!user) return new Response('Not found', { status: 404 });
      return user;

}


export async function getUserID () {
    const user = await stackServerApp.getUser()
    if(!user) return NextResponse.json({message: "User not found"}, {status: 404})
    const userId = user.id

    return userId
}