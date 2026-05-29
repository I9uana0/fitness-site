"use client";

import { cancelSubscription } from "@/lib/db/updateSubscription";

type Props = {
  subscriptionId: string;
};

export function CancelSubscriptionButton({ subscriptionId }: Props) {
  async function handleClick() {
    const confirmed = confirm("Вы уверены, что хотите отменить подписку?");

    if (!confirmed) return;

    await cancelSubscription(subscriptionId);
  }

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer mt-6 text-sm text-gray-500 hover:text-red-500 transition duration-200 ease-in-out font-medium"
    >
      Отменить абонемент
    </button>
  );
}
