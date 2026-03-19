import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify the caller is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    const supabaseUser = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
    } = await supabaseUser.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check admin role
    const { data: roleData } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden: admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { requestId, deliveryFilePath } = await req.json();

    if (!requestId || !deliveryFilePath) {
      return new Response(
        JSON.stringify({ error: "requestId and deliveryFilePath are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Fetch the service request
    const { data: request, error: reqError } = await supabaseAdmin
      .from("service_requests")
      .select("*")
      .eq("id", requestId)
      .single();

    if (reqError || !request) {
      return new Response(
        JSON.stringify({ error: "Request not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Fetch the client's profile separately
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("full_name, email")
      .eq("user_id", request.client_id)
      .single();

    const clientEmail = profile?.email;
    const clientName = profile?.full_name || "Client";

    if (!clientEmail) {
      return new Response(
        JSON.stringify({ error: "Client email not found" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Generate a signed URL for the deliverable (valid for 7 days)
    const { data: signedUrlData, error: signedUrlError } =
      await supabaseAdmin.storage
        .from("deliverables")
        .createSignedUrl(deliveryFilePath, 7 * 24 * 3600);

    if (signedUrlError || !signedUrlData?.signedUrl) {
      return new Response(
        JSON.stringify({ error: "Failed to generate download link" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const downloadUrl = signedUrlData.signedUrl;
    const fileName = deliveryFilePath.split("/").pop() || "deliverable";

    const serviceLabels: Record<string, string> = {
      content_writing: "Content Writing",
      video_image_editing: "Video & Image Editing",
      poster_making: "Poster Making",
    };

    const serviceLabel = serviceLabels[request.service_type] || request.service_type;

    // Send email via Resend
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TrueTone Creations <onboarding@resend.dev>",
        to: [clientEmail],
        subject: `Your ${serviceLabel} project "${request.title}" has been delivered! 🎉`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#8B5CF6,#6D28D9);padding:32px 40px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">TrueTone Creations</h1>
              <p style="color:#E9D5FF;margin:8px 0 0;font-size:14px;">Your project is ready!</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="color:#18181B;font-size:16px;margin:0 0 8px;">Hi ${clientName},</p>
              <p style="color:#3F3F46;font-size:15px;line-height:1.6;margin:0 0 24px;">
                Great news! Your <strong>${serviceLabel}</strong> project has been completed and is ready for download.
              </p>

              <!-- Project Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F9FAFB;border-radius:12px;border:1px solid #E5E7EB;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Project Details</p>
                    <p style="color:#18181B;font-size:16px;font-weight:600;margin:0 0 4px;">${request.title}</p>
                    <p style="color:#6B7280;font-size:13px;margin:0;">Service: ${serviceLabel}</p>
                    <p style="color:#6B7280;font-size:13px;margin:4px 0 0;">File: ${fileName}</p>
                  </td>
                </tr>
              </table>

              ${request.admin_reply ? `
              <!-- Admin Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F3FF;border-radius:12px;border-left:4px solid #8B5CF6;margin-bottom:24px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="color:#6B7280;font-size:12px;margin:0 0 6px;">Message from admin:</p>
                    <p style="color:#3F3F46;font-size:14px;line-height:1.5;margin:0;">${request.admin_reply}</p>
                  </td>
                </tr>
              </table>
              ` : ""}

              <!-- Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 24px;">
                    <a href="${downloadUrl}" style="display:inline-block;background:linear-gradient(135deg,#8B5CF6,#6D28D9);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:600;">
                      ⬇️ Download Your File
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color:#9CA3AF;font-size:12px;text-align:center;margin:0;">
                This download link expires in 7 days. If you need the file after that, please log in to your dashboard.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#F9FAFB;padding:24px 40px;text-align:center;border-top:1px solid #E5E7EB;">
              <p style="color:#9CA3AF;font-size:12px;margin:0;">
                © ${new Date().getFullYear()} TrueTone Creations. All rights reserved.
              </p>
              <p style="color:#9CA3AF;font-size:12px;margin:8px 0 0;">
                You're receiving this because you have an active project with us.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text();
      console.error("Resend error:", errBody);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: errBody }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailResult = await emailRes.json();

    return new Response(
      JSON.stringify({ success: true, emailId: emailResult.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
