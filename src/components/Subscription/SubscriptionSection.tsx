import { getCurrentUser } from "@/lib/auth/server";
import { getSubscriptionTypes } from "@/lib/db/subscriptionUtils";
import { getSubscriptions } from "@/lib/db/subscriptionUtils";
import { SubscriptionCard } from "./SubscriptionCard";
import { SubscriptionList } from "./SubscriptionTypeList/SubscriptionList";
import { SubscriptionTypeCard } from "./SubscriptionTypeList/SubscriptionTypeCard";
import { CancelSubscriptionButton } from "./CancelSubscriptionButton";
import { STATUS_COLORS } from "@/model/constants";

export async function SubscriptionSection() {
  const user = await getCurrentUser();

  if (!user) return null;

  const [types, subscriptions] = await Promise.all([
    getSubscriptionTypes(),
    getSubscriptions(user.sub),
  ]);

  const active = subscriptions.find(
    (subscription) => subscription.status === "ACTIVE",
  );

  const history = subscriptions.filter(
    (subscription) => subscription.id !== active?.id,
  );

  return (
    <>
      <div className="bg-white p-8 rounded-3xl shadow-sm">
        {active ? (
          <>
            <div className="flex justify-between mb-5">
              <h2 className="font-bold sm:text-2xl text-xl">Мой Абонемент</h2>
              <div
                className={`flex items-center gap-2 px-3 py-1 bg-green-50 ${STATUS_COLORS[active.status].text} rounded-full text-xs font-medium`}
              >
                <div
                  className={`w-2 h-2 ${STATUS_COLORS[active.status].bg} rounded-full animate-pulse`}
                />
                <p>Активен</p>
              </div>
            </div>
            <SubscriptionCard subscription={active} />
            <CancelSubscriptionButton subscriptionId={active.id} />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-2xl">Оформить абонемент</h2>
              <p className="text-gray-600 mb-7 text-md">
                У вас пока нет активного абонемента. Выберите подходящий тариф:
              </p>
            </div>
            <SubscriptionList>
              {types.map((type) => (
                <SubscriptionTypeCard
                  key={type.id}
                  type={type}
                />
              ))}
            </SubscriptionList>
          </>
        )}
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-sm">
        <h2 className="font-bold text-2xl mb-5">История абонементов</h2>
        {history.length === 0 && <p>У вас пока не было абонементов</p>}
        <SubscriptionList view="list">
          {history.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </SubscriptionList>
      </div>
    </>
  );
}
