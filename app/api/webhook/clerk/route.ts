import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is missing");
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

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

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("Webhook verified:", evt.type);
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", { status: 400 });
  }

  const id = evt.data.id as string;
  const eventType = evt.type;

  try {
    if (eventType === "user.created") {
      const { email_addresses, image_url, first_name, last_name, username } = evt.data;

      if (!id || !email_addresses || email_addresses.length === 0) {
        console.error("Missing necessary user data");
        return new Response("Missing necessary user data", { status: 400 });
      }

      const email = email_addresses[0].email_address;
      if (!email) {
        console.error("Email address is undefined");
        return new Response("Email address is undefined", { status: 400 });
      }

      // if (!email.endsWith("@vitbhopal.ac.in")) {
      //   await disableUser(id);
      //   console.warn("Access denied for email:", email);
      //   return new Response("Access Denied", { status: 403 });
      // }

      const user = {
        clerkId: id,
        email: email,
        username: username || '',
        firstName: first_name || '',
        lastName: last_name || '',
        photo: image_url || '',
      };

      console.log("Creating user:", user);

      const newUser = await createUser(user);
      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }

      console.log("User created successfully:", newUser);

      return NextResponse.json({ message: "OK", user: newUser });
    }

    if (eventType === "user.updated") {
      const { image_url, first_name, last_name, username } = evt.data;

      const user = {
        firstName: first_name || '',
        lastName: last_name || '',
        username: username || '',
        photo: image_url || '',
      };

      console.log("Updating user:", id, user);

      const updatedUser = await updateUser(id, user);

      console.log("User updated successfully:", updatedUser);

      return NextResponse.json({ message: "OK", user: updatedUser });
    }

    if (eventType === "user.deleted") {
      console.log("Deleting user:", id);

      const deletedUser = await deleteUser(id);

      console.log("User deleted successfully:", deletedUser);

      return NextResponse.json({ message: "OK", user: deletedUser });
    }

    console.log("Unhandled event type:", eventType);

    return new Response("", { status: 200 });
  } catch (error) {
    console.error("Error handling event:", error);
    return new Response("Error occurred", { status: 500 });
  }
}
