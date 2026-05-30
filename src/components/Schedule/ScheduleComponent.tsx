"use client";

import { ScheduleItemCard } from "@/components/Schedule/ScheduleItemCard";
import { Tabs } from "@heroui/react";
import { ScheduleItem } from "@prisma/client";
import { useMemo, useState } from "react";

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: "MONDAY", label: "Пн" },
  { key: "TUESDAY", label: "Вт" },
  { key: "WEDNESDAY", label: "Ср" },
  { key: "THURSDAY", label: "Чт" },
  { key: "FRIDAY", label: "Пт" },
  { key: "SATURDAY", label: "Сб" },
  { key: "SUNDAY", label: "Вс" },
];

export default function ScheduleComponent({
  schedule,
}: {
  schedule: ScheduleItem[];
}) {
  const [activeDay, setActiveDay] = useState<DayOfWeek>("MONDAY");

  const filtered = useMemo(() => {
    return schedule.filter((item) => item.dayOfWeek === activeDay);
  }, [schedule, activeDay]);

  return (
    <section className="grid gap-6">
      <div className="flex flex-col md:flex-row sm:gap-8 gap-4">
        <p className="sm:text-base text-sm self-center">
          Актуальное расписание на неделю, обновите страницу для получения более
          свежих данных
        </p>
        <Tabs
          selectedKey={activeDay}
          onSelectionChange={(key) => setActiveDay(key as DayOfWeek)}
        >
          <Tabs.List
            aria-label="daysOfWeek"
            className="w-full bg-white"
          >
            {DAYS.map((day, index, array) => (
              <Tabs.Tab
                key={day.key}
                id={day.key}
              >
                {day.label}
                {index > 0 && index < array.length && <Tabs.Separator />}
                <Tabs.Indicator className="bg-[#ffd1de]" />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </div>
      {/* <Button className="px-5 py-2. text-white rounded-lg text-sm font-semibold transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              {day.label}
            </Button> */}
      {filtered.map((item) => (
        <ScheduleItemCard
          key={item.id}
          scheduleItem={item}
        />
      ))}
    </section>
  );
}
