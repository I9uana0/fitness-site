import { ServiceInfoCard } from "@/ui/ServiceInfoCard";
import Link from "next/link";
import { CircleCheck, UsersRound, Zap } from "lucide-react";

const ServiceInfoCardsMap = [
  {
    title: "Кардио-зона",
    description:
      "Более 50 тренажеров нового поколения с мультимедиа для эффективных тренировок.",
    Icon: Zap,
    IconColors: { IconColor: "text-blue-600", IconBackground: "bg-blue-100" },
  },
  {
    title: "Групповые залы",
    description:
      "Йога, пилатес, кроссфит и силовые тренировки, доступные каждый день.",
    Icon: CircleCheck,
    IconColors: { IconColor: "text-green-600", IconBackground: "bg-green-100" },
  },
  {
    title: "Профессионалы",
    description:
      "Сертифицированные тренеры международного уровня готовы помочь вам достичь успеха.",
    Icon: UsersRound,
    IconColors: {
      IconColor: "text-purple-600",
      IconBackground: "bg-purple-100",
    },
  },
];

export default function Home() {
  return (
    <section
      id="home"
      className="page-section active"
    >
      <div className="flex flex-col md:flex-row items-center justify-between  gap-12">
        <div className="md:w-1/2 space-y-7">
          <h1 className="sm:text-6xl text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Твой прогресс — наша цель.
          </h1>
          <p className="sm:text-xl text-lg text-gray-700 leading-relaxed">
            Современное оборудование, лучшие тренеры города и уютная атмосфера.
            Начни свою трансформацию сегодня!
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              href={`/personal`}
              className={`flex items-center justify-center bg-[#FFD1DE] px-9 py-4.5 rounded-xl font-bold text-lg hover:bg-[#e3bac6] shadow-xl transition transform hover:-translate-y-1.5 active:scale-[0.97]`}
            >
              Абонементы
            </Link>
            <Link
              href={"/schedule"}
              className="text-center border-2 border-gray-300 text-gray-800 px-9 py-4.5 rounded-xl font-bold text-lg hover:bg-gray-100 transition transform hover:-translate-y-0.5"
            >
              Смотреть расписание
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
          <img
            src="/images/gym.webp"
            alt="Gym"
            className="rounded-3xl shadow-2xl custom-shadow relative z-10 w-full h-auto"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10 mt-20">
        {ServiceInfoCardsMap.map((card) => (
          <ServiceInfoCard
            key={card.title}
            title={card.title}
            description={card.description}
            IconColors={card.IconColors}
            Icon={card.Icon}
          />
        ))}
      </div>
    </section>
  );
}
