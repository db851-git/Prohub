import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }
    if (supabaseConfigured()) {
      const supabase = createServiceClient();
      await supabase.from("newsletter_subscribers").upsert({ email }, { onConflict: "email" });
    } else {
      console.log("[newsletter] subscribe:", email);
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
