import { createClient } from "@/lib/utils/supabase/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return Response.json({ credits: 0 }, { status: 401 });
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', user.id)
      .single();

    if (error) {
      throw error;
    }

    return Response.json({ credits: profile?.credits || 0 });
  } catch (error) {
    console.error("Error fetching credits:", error);
    return Response.json({ credits: 0 }, { status: 500 });
  }
}
