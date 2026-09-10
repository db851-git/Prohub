import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const { business_name, contact_name, email, phone, website, message } = await req.json();
    if (!business_name || !contact_name || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const row = { business_name, contact_name, email, phone, website, message };
    if (supabaseConfigured()) {
      const supabase = createServiceClient();
      const { error } = await supabase.from("distributor_applications").insert(row);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.log("[distributor]", row);
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
