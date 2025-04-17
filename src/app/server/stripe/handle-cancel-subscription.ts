import "server-only";
import Stripe from "stripe";
import { handleSendCancelEmail } from "../email/handle-send-email";
import { prisma } from "@/app/lib/prisma";

export async function handleStripeCancelSubscription(
  event: Stripe.CustomerSubscriptionDeletedEvent,
) {
  console.log("Cancelou a assinatura");

  const customerId = event.data.object.customer;

  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId: customerId.toString(),
    },
  });

  if (!user) {
    console.error("User not found");
    return;
  }

  const userId = user.id;
  const userEmail = user.email;
  const userName = user.name;

  await prisma.user.update({
    data: {
      status: "inactive",
    },
    where: {
      id: userId,
    },
  });

  await handleSendCancelEmail(userEmail, userName!);
}
