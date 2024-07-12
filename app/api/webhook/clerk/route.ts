import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { disableUser } from "@/lib/actions/user.actions";
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "@/lib/utils";
import bodyParser from "body-parser";

const webhookSecret = process.env.WEBHOOK_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!webhookSecret) {
    console.error("WEBHOOK_SECRET is missing");
    return res.status(500).send("Please add WEBHOOK_SECRET to your environment variables");
  }

  await runMiddleware(req, res, bodyParser.json());

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return res.status(400).send("Error occurred -- no svix headers");
  }

  const payload = req.body;
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
    return res.status(400).send("Error occurred");
  }

  const id = evt.data.id as string;
  const eventType = evt.type;

  try {
    if (eventType === "user.created") {
      const { email_addresses } = evt.data;

      if (!id || !email_addresses || email_addresses.length === 0) {
        console.error("Missing necessary user data");
        return res.status(400).send("Missing necessary user data");
      }

      const email = email_addresses[0].email_address;
      if (!email) {
        console.error("Email address is undefined");
        return res.status(400).send("Email address is undefined");
      }

      if (!email.endsWith("@vitbhopal.ac.in")) {
        await disableUser(id);
        console.warn("Access denied for email:", email);
        return res.status(403).send("Access Denied: Only VIT Bhopal email addresses are allowed.");
      }
    }

    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error handling event:", error);
    return res.status(500).send("Error occurred");
  }
};

export default handler;
