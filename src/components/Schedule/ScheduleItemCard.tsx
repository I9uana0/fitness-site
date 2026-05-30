import { ScheduleItem } from "@prisma/client";

interface Props {
  scheduleItem: ScheduleItem;
}

export function ScheduleItemCard({ scheduleItem }: Props) {
  return (
    <div
      key={scheduleItem.id}
      className="flex min-[500px]:flex-row flex-col gap-3 justify-between w-full sm:p-6 p-4 bg-white rounded-xl"
    >
      <div className="flex gap-8 w-full">
        <div className="min-w-30 bg-gray-100 p-4 text-center self-center rounded-xl">
          <p className="font-bold text-3xl">{scheduleItem.time}</p>
          <p className="text-sm text-gray-400 text-center">
            {scheduleItem.durationMinutes} мин
          </p>
        </div>
        <div className="w-full sm:self-center flex justify-between min-[500px]:flex-row flex-col">
          <div className="text-center">
            <p className="sm:text-xl font-bold">{scheduleItem.name}</p>
            <div className="sm:text-base text-sm text-gray-500">
              Тренер: {scheduleItem.coach}
            </div>
          </div>
          <p className="px-6 min-[500px]:py-2 py-1 min-[500px]:self-center text-center rounded-full bg-orange-100 text-orange-700">
            {scheduleItem.type}
          </p>
        </div>
      </div>
    </div>
  );
}
