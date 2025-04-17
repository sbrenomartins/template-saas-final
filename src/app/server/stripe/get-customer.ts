import { prisma } from "@/app/lib/prisma";
import stripe from "@/app/lib/stripe";
import "server-only";

export async function getOrCreateCustomer(userId: string, userEmail: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const stripeCustomerId = user.stripeCustomerId;

    if (stripeCustomerId) {
      return stripeCustomerId;
    }

    const userName = user.name;

    const stripeCustomer = await stripe.customers.create({
      email: userEmail,
      ...(userName && { name: userName }),
      metadata: {
        userId,
      },
    });

    await prisma.user.update({
      data: {
        stripeCustomerId: stripeCustomer.id,
      },
      where: {
        id: userId,
      },
    });

    return stripeCustomer.id;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get or create customer");
  }
}
