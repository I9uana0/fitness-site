import type { LucideIcon } from "lucide-react";

type IconColors = { IconColor: string; IconBackground: string };

interface Props {
  title: string;
  description: string;
  Icon: LucideIcon;
  IconColors: IconColors;
}

export function ServiceInfoCard({
  title,
  description,
  Icon,
  IconColors: { IconColor, IconBackground },
}: Props) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_10px_25px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)] border border-slate-200/60 transition-all duration-200 ease-in-out hover:-translate-y-1.25 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.05)]">
      <div
        className={`w-14 h-14 ${IconBackground} rounded-2xl flex items-center justify-center ${IconColor} mb-5`}
      >
        <Icon />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-md">{description}</p>
    </div>
  );
}
