import stripe from "@/app/lib/stripe";
import { handleStripeCancelSubscription } from "@/app/server/stripe/handle-cancel-subscription";
import { handleStripePayment } from "@/app/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/app/server/stripe/handle-subscription";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature || !secret) {
      return NextResponse.json(
        { error: "No signature or secret provided" },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed": // Pagamento realizado se status = paid
        const metadata = event.data.object.metadata;

        if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
          await handleStripePayment(event);
        }

        if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
          await handleStripeSubscription(event);
        }

        break;
      case "checkout.session.expired": // Expirou o tempo de pagamento
        console.log(
          "Enviar um email para o usuário informando que o pagamento expirou."
        );
        break;
      case "checkout.session.async_payment_succeeded": // Boleto pago
        console.log(
          "Enviar um email para o usuário informando que o pagamento foi confirmado."
        );
        break;
      case "checkout.session.async_payment_failed": // Boleto não pago
        console.log(
          "Enviar um email para o usuário informando que o pagamento não foi realizado."
        );
        break;
      case "customer.subscription.created": // Criou a assinatura
        console.log(
          "Enviar email de boas vindas, porque o usuário acabou de realizar uma assinatura."
        );
        break;
      case "customer.subscription.deleted": // Cancelou a assinatura
        await handleStripeCancelSubscription(event);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}
