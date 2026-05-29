import { formatPrice } from "@/lib/db/utils";
import { STATUS_COLORS, STATUS_MAP } from "@/model/constants";

import { type Prisma } from "@prisma/client";

// Тип для подписки с включённым subscriptionType
type SubscriptionWithType = Prisma.SubscriptionGetPayload<{
  include: { subscriptionType: true };
}>;

interface SubscriptionActiveCardProps {
  subscription: SubscriptionWithType;
}

export function SubscriptionCard({
  subscription,
}: SubscriptionActiveCardProps) {
  const {
    subscriptionType: { name, priceAmount, description },
    status,
    startDate,
    endDate,
  } = subscription;

  const isActive = status === "ACTIVE";

  return (
    <div
      className={`p-6 rounded-2xl ${isActive ? "bg-linear-to-r from-orange-100 to-red-100 border" : "bg-gray-50"} shadow-sm flex flex-col gap-3`}
    >
      {/* header */}
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold">{name}</h2>
        {isActive ? (
          <div className="text-lg font-semibold">
            {formatPrice(priceAmount)}
          </div>
        ) : (
          <span
            className={`flex items-center gap-2 px-3 py-1 ${STATUS_COLORS[status].bg} ${STATUS_COLORS[status].text} rounded-full text-xs font-medium`}
          >
            <span
              className={`w-2 h-2 ${STATUS_COLORS[status].dot} rounded-full`}
            />
            {STATUS_MAP[status]}
          </span>
        )}
      </div>

      {/* status */}
      {isActive ? (
        <p className="text-[#910144] font-medium">
          Действует до{" "}
          {endDate.toISOString().split("T")[0].split("-").reverse().join(".")}
        </p>
      ) : (
        <p className="font-medium">
          Действовал с{" "}
          {startDate.toISOString().split("T")[0].split("-").reverse().join(".")}{" "}
          по{" "}
          {endDate.toISOString().split("T")[0].split("-").reverse().join(".")}
        </p>
      )}

      {/* description */}
      {isActive && (
        <p className="text-sm text-gray-600 max-w-112.5">{description}</p>
      )}

      {/* footer */}
      {isActive ? (
        <div className="text-xs text-gray-500 pt-2 border-white/40">
          Начало:{" "}
          {startDate.toISOString().split("T")[0].split("-").reverse().join(".")}
        </div>
      ) : (
        <div className="text-xs text-gray-500 pt-2 border-white/40">
          Стоимость: {formatPrice(priceAmount)}
        </div>
      )}
    </div>
  );
}
