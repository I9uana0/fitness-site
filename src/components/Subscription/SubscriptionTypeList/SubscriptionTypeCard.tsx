"use client";

import { createSubscription } from "@/lib/db/subscriptionUtils";
import { formatPrice } from "@/lib/db/utils";
import { RATE_COLOR } from "@/model/constants";
import { SubscriptionType } from "@prisma/client";
import toast from "react-hot-toast";

interface SubscriptionTypeCardProps {
  type: SubscriptionType;
}

export function SubscriptionTypeCard({ type }: SubscriptionTypeCardProps) {
  const { name, priceAmount, description, rate, id } = type;

  async function handleSelect() {
    try {
      await createSubscription(type);
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <button
      onClick={handleSelect}
      className={`flex flex-col items-start p-6 ${RATE_COLOR[rate]?.bg} ${RATE_COLOR[rate]?.border} ${RATE_COLOR[rate]?.hover} cursor-pointer rounded-xl border custom-shadow hover:transform-none`}
    >
      <h2
        className={`mb-1 text-2xl font-bold ${RATE_COLOR[rate].text.primary}`}
      >
        {name}
      </h2>
      <p
        className={`mb-3 text-sm text-left ${RATE_COLOR[rate].text.secondary} max-w-112.5`}
      >
        {description}
      </p>
      <span
        className={`font-extrabold text-2xl ${RATE_COLOR[rate].text.primary}`}
      >
        {formatPrice(priceAmount)}
        <span className={RATE_COLOR[rate].text.thirdly}> / мес</span>
      </span>
    </button>
  );
}
