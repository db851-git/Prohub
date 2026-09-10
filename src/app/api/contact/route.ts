import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const { type, name, email, subject, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const row = { type: type === "complaint" ? "complaint" : "contact", name, email, subject, message };
    if (supabaseConfigured()) {
      const supabase = createServiceClient();
      const { error } = await supabase.from("contact_messages").insert(row);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.log("[contact]", row);
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
