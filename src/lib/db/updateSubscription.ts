"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function cancelSubscription(subscriptionId: string) {
  await prisma.subscription.update({
    where: {
      id: subscriptionId,
    },
    data: {
      status: "CANCELLED",
    },
  });

  revalidatePath("/personal");
}
