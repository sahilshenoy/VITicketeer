import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { disableUser } from "@/lib/actions/user.actions";
import { NextRequest, NextResponse } from "next/server";
import bodyParser from "body-parser";

// Middleware to run body-parser
async function runMiddleware(req: NextRequest, res: NextResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req as any, res as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  const webhookSecret = process.env.WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("WEBHOOK_SECRET is missing");
    return new Response("Please add WEBHOOK_SECRET to your environment variables", { status: 500 });
  }

  await runMiddleware(req, res, bodyParser.json());

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return new Response("Error occurred -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("Webhook verified:", evt.type);
    console.log("Received event:", evt);  // Log the received event
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", { status: 400 });
  }

  const id = evt.data.id as string;
  const eventType = evt.type;

  try {
    if (eventType === "user.created") {
      const { email_addresses } = evt.data;

      if (!id || !email_addresses || email_addresses.length === 0) {
        console.error("Missing necessary user data");
        return new Response("Missing necessary user data", { status: 400 });
      }

      const email = email_addresses[0].email_address;
      if (!email) {
        console.error("Email address is undefined");
        return new Response("Email address is undefined", { status: 400 });
      }

      if (!email.endsWith("@vitbhopal.ac.in")) {
        await disableUser(id);
        console.warn("Access denied for email:", email);
        return new Response("Access Denied: Only VIT Bhopal email addresses are allowed.", { status: 403 });
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error handling event:", error);
    return new Response("Error occurred", { status: 500 });
  }
};
