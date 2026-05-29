export const STATUS_COLORS = {
  ACTIVE: { text: "text-green-700", bg: "bg-green-500", dot: "bg-green-500" },
  CANCELLED: {
    text: "text-red-700",
    bg: "bg-red-200",
    dot: "bg-[#ff8586]",
  },
  EXPIRED: {
    text: "text-gray-500",
    bg: "bg-gray-200",
    dot: "bg-[#b5b9c2]",
  },
};

export const RATE_COLOR = {
  STANDARD: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    hover: "hover:bg-orange-100",
    text: {
      primary: "text-orange-800",
      secondary: "text-orange-600",
      thirdly: "text-orange-500",
    },
  },
  PREMIUM: {
    bg: "bg-red-50",
    border: "border-red-200",
    hover: "hover:bg-red-100",
    text: {
      primary: "text-red-800",
      secondary: "text-red-600",
      thirdly: "text-red-500",
    },
  },
};

export const STATUS_MAP = {
  CANCELLED: "Отменён",
  EXPIRED: "Истёк",
  ACTIVE: "Активен",
};
