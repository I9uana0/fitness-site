import Image from "next/image";

export default function Home() {
  return (
    <section
      id="home"
      className="page-section active"
    >
      <div className="flex flex-col md:flex-row items-center justify-between py-16 gap-12">
        <div className="md:w-1/2 space-y-7">
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Твой прогресс — наша <span className="logo-text">цель.</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Современное оборудование, лучшие тренеры города и уютная атмосфера.
            Начни свою трансформацию сегодня!
          </p>
          <div className="flex space-x-6">
            <button className="bg-orange-500 text-white px-9 py-4.5 rounded-xl font-bold text-lg hover:bg-orange-600 transition transform hover:-translate-y-1.5 shadow-xl shadow-orange-300/60">
              Абонементы
            </button>
            <button className="border-2 border-gray-300 text-gray-800 px-9 py-4.5 rounded-xl font-bold text-lg hover:bg-gray-100 transition transform hover:-translate-y-0.5">
              Смотреть занятия
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
            alt="Gym"
            className="rounded-3xl shadow-2xl custom-shadow relative z-10 w-full h-auto"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10 mt-20">
        <div className="custom-card">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">Кардио-зона</h3>
          <p className="text-gray-600 text-md">
            Более 50 тренажеров нового поколения с мультимедиа для эффективных
            тренировок.
          </p>
        </div>
        <div className="custom-card">
          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">
            Групповые залы
          </h3>
          <p className="text-gray-600 text-md">
            Йога, пилатес, кроссфит и силовые тренировки, доступные каждый день.
          </p>
        </div>
        <div className="custom-card">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">
            Профессионалы
          </h3>
          <p className="text-gray-600 text-md">
            Сертифицированные тренеры международного уровня готовы помочь вам
            достичь успеха.
          </p>
        </div>
      </div>
    </section>
  );
}
