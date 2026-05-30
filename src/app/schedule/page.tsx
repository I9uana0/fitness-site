import ScheduleComponent from "@/components/Schedule/ScheduleComponent";
import { prisma } from "@/lib/prisma";

export default async function SchedulePage() {
  const schedule = await prisma.scheduleItem.findMany({
    orderBy: { time: "asc" },
  });
  return <ScheduleComponent schedule={schedule} />;
}
