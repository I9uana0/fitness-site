import ScheduleComponent from "@/components/Schedule/ScheduleComponent";
import { prisma } from "@/lib/prisma";

export default async function SchedulePage() {
  const schedule = await prisma.scheduleItem.findMany({
    orderBy: { time: "asc" },
  });
  return (
    <>
      <h1 className="font-extrabold sm:text-4xl text-2xl mb-1">
        Расписание занятий
      </h1>
      <ScheduleComponent schedule={schedule} />
    </>
    //   <section
    //     id="schedule"
    //     className="page-section active"
    //   >
    //     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
    //       <div>
    //         <h1 className="text-4xl font-extrabold text-gray-900">
    //           Расписание занятий
    //         </h1>
    //         <p className="text-gray-600 mt-2 text-lg">
    //           Актуальное расписание на неделю, обновите страницу для получения
    //           более свежих данных
    //         </p>
    //       </div>
    //       <div className="flex bg-white p-1.5 rounded-xl custom-shadow border border-gray-100 space-x-1">
    //         <button className="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
    //           Пн
    //         </button>
    //         <button className="px-5 py-2.5 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
    //           Вт
    //         </button>
    //         <button className="px-5 py-2.5 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
    //           Ср
    //         </button>
    //         <button className="px-5 py-2.5 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
    //           Чт
    //         </button>
    //         <button className="px-5 py-2.5 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
    //           Пт
    //         </button>
    //         <button className="px-5 py-2.5 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
    //           Сб
    //         </button>
    //         <button className="px-5 py-2.5 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
    //           Вс
    //         </button>
    //       </div>
    //     </div>

    //     <div
    //       className="grid gap-6"
    //       id="schedule-list"
    //     >
    //       <div className="custom-card flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 hover:transform-none">
    //         <div className="flex items-center space-x-6">
    //           <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl w-28 h-24 shrink-0 border border-gray-100">
    //             <span className="text-3xl font-extrabold text-gray-900">
    //               08:00
    //             </span>
    //             <span className="text-xs text-gray-500 mt-1">60 мин.</span>
    //           </div>
    //           <div>
    //             <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
    //               Crossfit Basic
    //             </h4>
    //             <p className="text-gray-600 text-md">Тренер: Михаил Ребров</p>
    //           </div>
    //         </div>
    //         <div className="flex items-center justify-end md:justify-start">
    //           <span className="px-4 py-2 bg-linear-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
    //             Hard
    //           </span>
    //         </div>
    //       </div>

    //       <div className="custom-card flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 hover:transform-none">
    //         <div className="flex items-center space-x-6">
    //           <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl w-28 h-24 shrink-0 border border-gray-100">
    //             <span className="text-3xl font-extrabold text-gray-900">
    //               10:00
    //             </span>
    //             <span className="text-xs text-gray-500 mt-1">90 мин.</span>
    //           </div>
    //           <div>
    //             <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
    //               Yoga Flow
    //             </h4>
    //             <p className="text-gray-600 text-md">Тренер: Анна Волкова</p>
    //           </div>
    //         </div>
    //         <div className="flex items-center justify-end md:justify-start">
    //           <span className="px-4 py-2 bg-linear-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
    //             Light
    //           </span>
    //         </div>
    //       </div>

    //       <div className="custom-card flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 hover:transform-none">
    //         <div className="flex items-center space-x-6">
    //           <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl w-28 h-24 shrink-0 border border-gray-100">
    //             <span className="text-3xl font-extrabold text-gray-900">
    //               12:00
    //             </span>
    //             <span className="text-xs text-gray-500 mt-1">50 мин.</span>
    //           </div>
    //           <div>
    //             <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
    //               Body Pump
    //             </h4>
    //             <p className="text-gray-600 text-md">Тренер: Елена К.</p>
    //           </div>
    //         </div>
    //         <div className="flex items-center justify-end md:justify-start">
    //           <span className="px-4 py-2 bg-linear-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
    //             Medium
    //           </span>
    //         </div>
    //       </div>

    //       <div className="custom-card flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 hover:transform-none">
    //         <div className="flex items-center space-x-6">
    //           <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl w-28 h-24 shrink-0 border border-gray-100">
    //             <span className="text-3xl font-extrabold text-gray-900">
    //               18:00
    //             </span>
    //             <span className="text-xs text-gray-500 mt-1">60 мин.</span>
    //           </div>
    //           <div>
    //             <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
    //               Zumba
    //             </h4>
    //             <p className="text-gray-600 text-md">Тренер: Дмитрий С.</p>
    //           </div>
    //         </div>
    //         <div className="flex items-center justify-end md:justify-start">
    //           <span className="px-4 py-2 bg-linear-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
    //             Fun
    //           </span>
    //         </div>
    //       </div>

    //       <div className="custom-card flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 hover:transform-none">
    //         <div className="flex items-center space-x-6">
    //           <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl w-28 h-24 shrink-0 border border-gray-100">
    //             <span className="text-3xl font-extrabold text-gray-900">
    //               16:00
    //             </span>
    //             <span className="text-xs text-gray-500 mt-1">45 мин.</span>
    //           </div>
    //           <div>
    //             <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
    //               Stretching
    //             </h4>
    //             <p className="text-gray-600 text-md">Тренер: Ольга П.</p>
    //           </div>
    //         </div>
    //         <div className="flex items-center justify-end md:justify-start">
    //           <span className="px-4 py-2 bg-linear-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
    //             Relax
    //           </span>
    //         </div>
    //       </div>

    //       <div className="custom-card flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 hover:transform-none">
    //         <div className="flex items-center space-x-6">
    //           <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl w-28 h-24 shrink-0 border border-gray-100">
    //             <span className="text-3xl font-extrabold text-gray-900">
    //               19:00
    //             </span>
    //             <span className="text-xs text-gray-500 mt-1">50 мин.</span>
    //           </div>
    //           <div>
    //             <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
    //               Cycling Indoor
    //             </h4>
    //             <p className="text-gray-600 text-md">Тренер: Сергей Л.</p>
    //           </div>
    //         </div>
    //         <div className="flex items-center justify-end md:justify-start">
    //           <span className="px-4 py-2 bg-linear-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
    //             Endurance
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
  );
}
