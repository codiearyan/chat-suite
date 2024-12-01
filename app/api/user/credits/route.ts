import { createClient } from "@/lib/utils/supabase/server";
import { NextResponse } from "next/server";
import { getSession,   getUserCredits } from "@/lib/db/cached-queries";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {

    const user = await getSession();

    
    if (!user) {
      return NextResponse.json({ credits: 0 }, { status: 401 });
    }

    const credits = await getUserCredits(user.id);


    if (!credits) {
      return NextResponse.json({ credits: 0 }, { status: 500 });
    }

    return NextResponse.json({ 
      credits: credits || 0,
      userId: user.id 
    });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    return NextResponse.json({ 
      credits: 0,
      error: "Internal server error" 
    }, { 
      status: 500 
    });
  }
}
