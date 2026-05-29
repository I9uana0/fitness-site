import { PersonalForm } from "@/components/forms/PersonalForm";
import { SubscriptionSection } from "@/components/Subscription/SubscriptionSection";

export default function PersonalPage() {
  return (
    <div className="flex flex-col gap-8 w-200">
      <PersonalForm />
      <SubscriptionSection />
    </div>
  );
}
