import "server-only";
import Stripe from "stripe";
import { handleSendSuccessEmail } from "../email/handle-send-email";
import { prisma } from "@/app/lib/prisma";

export async function handleStripePayment(
  event: Stripe.CheckoutSessionCompletedEvent,
) {
  if (event.data.object.payment_status === "paid") {
    console.log(
      "Pagamento realizado com sucesso, enviar email para e liberar acesso para o usuário.",
    );

    const customerId = event.data.object.customer;

    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId?.toString(),
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
        stripeSubscriptionId: event.data.object.subscription?.toString(),
      },
      where: {
        id: userId,
      },
    });

    await handleSendSuccessEmail(userEmail, userName!);
  }
}
