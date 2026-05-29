"use server";

import { revalidatePath, unstable_cache } from "next/cache";
import { SubscriptionStatus, userId } from "@/model/types";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/server";
import { SubscriptionType } from "@prisma/client";

export const getSubscriptions = async (userId: userId) => {
  const subscriptions = await prisma.subscription.findMany({
    where: { userId },
    include: { subscriptionType: true },
    orderBy: { startDate: "desc" },
  });

  const now = new Date();

  const expiredIds: string[] = [];

  const updatedSubscriptions = subscriptions.map((subscription) => {
    if (subscription.status === "ACTIVE" && subscription.endDate < now) {
      expiredIds.push(subscription.id);

      return {
        ...subscription,
        status: "EXPIRED" as SubscriptionStatus,
      };
    }
    return subscription;
  });

  if (expiredIds.length > 0) {
    try {
      await expireSubscriptions(expiredIds);
    } catch (e) {
      console.error("Failed to expire subscriptions", e);
    }
  }

  return updatedSubscriptions;
};

export const getSubscriptionTypes = unstable_cache(
  async () =>
    prisma.subscriptionType.findMany({ orderBy: { priceAmount: "asc" } }),
  ["subscription-types"],
  { revalidate: 60 * 60 * 24 * 7 },
);

const expireSubscriptions = async (ids: string[]) => {
  return prisma.subscription.updateMany({
    where: { id: { in: ids } },
    data: { status: "EXPIRED" },
  });
};

export const createSubscription = async (type: SubscriptionType) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Не авторизован");

  if (!type) {
    throw new Error("Тип абонемента не найден");
  }

  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId: user.sub,
      status: "ACTIVE",
    },
  });

  if (activeSubscription) {
    throw new Error("У пользователя уже есть активный абонемент");
  }

  const startDate = new Date();

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  await prisma.subscription.create({
    data: {
      userId: user.sub,
      subscriptionTypeId: type.id,
      startDate,
      endDate,
      pricePaid: type.priceAmount,
      status: "ACTIVE",
    },
  });

  revalidatePath("/profile");
};
