type Props = {
  view?: "list" | "grid";
  children: React.ReactNode;
};

export function SubscriptionList({ view = "grid", children }: Props) {
  return (
    <div
      className={
        view === "grid"
          ? "flex flex-col md:grid md:grid-cols-2 gap-4"
          : "flex flex-col gap-4"
      }
    >
      {children}
    </div>
  );
}
