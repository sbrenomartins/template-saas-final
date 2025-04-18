"use client";

import { Bounce, ToastContainer, toast } from "react-toastify";
import { Button } from "@/_components/ui/button";
import { useStripe } from "@/app/hooks/useStripe";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentsPage() {
  const searchParams = useSearchParams();

  const {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal,
  } = useStripe();

  const notify = () =>
    toast.warn(
      "Regularize sua assinatura para continuar utilizando o sistema.",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        className: "w-[500px]",
      },
    );

  useEffect(() => {
    const inactiveSubscription = searchParams.get("inactiveSubscription");

    if (Boolean(inactiveSubscription)) {
      notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-4xl font-bold mb-4">Payments</h1>
        <Button
          className="border rounded-sm px-1 cursor-pointer"
          onClick={() => createPaymentStripeCheckout({ testeId: "123" })}
        >
          Gerar pagamento com Stripe
        </Button>
        <Button
          className="border rounded-sm px-1 cursor-pointer"
          onClick={() => createSubscriptionStripeCheckout({ testeId: "123" })}
        >
          Gerar assinatura com Stripe
        </Button>
        <Button
          className="border rounded-sm px-1 cursor-pointer"
          onClick={() => handleCreateStripePortal()}
        >
          Gerar portal de pagamentos
        </Button>
      </div>
    </>
  );
}
