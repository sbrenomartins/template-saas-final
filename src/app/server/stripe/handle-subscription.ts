import "server-only";
import Stripe from "stripe";
import { handleSendSuccessEmail } from "../email/handle-send-email";
import { prisma } from "@/app/lib/prisma";

export async function handleStripeSubscription(
  event: Stripe.CheckoutSessionCompletedEvent,
) {
  if (event.data.object.payment_status === "paid") {
    console.log(
      "Pagamento realizado com sucesso, enviar email para e liberar acesso para o usuário.",
    );

    const metadata = event.data.object.metadata;
    const userId = metadata?.userId;

    if (!userId) {
      console.error("User ID not found in metadata");
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      console.error("User not found");
      return;
    }

    const userEmail = user.email;
    const userName = user.name;

    await prisma.user.update({
      data: {
        status: "active",
        stripeSubscriptionId: event.data.object.subscription?.toString(),
      },
      where: {
        id: userId,
      },
    });

    await handleSendSuccessEmail(userEmail, userName!);
  }
}
