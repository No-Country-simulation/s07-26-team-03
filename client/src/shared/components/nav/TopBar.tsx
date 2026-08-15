import {
  LuSearch,
  LuCalendar,
  LuMessageSquare,
  LuBell,
  LuChevronDown,
} from "react-icons/lu";
import userAvatar from "@/assets/icons/user.png";
import { useTopBar } from "@/shared/hooks/nav/useTopBar";

interface TopBarProps {
  userName?: string;
  location?: string;
  hasNotifications?: boolean;
}

export default function TopBar({
  userName = "Anima Agrawal",
  location = "U.P, India",
  hasNotifications = true,
}: TopBarProps) {
  const {
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    handleCalendarClick,
    handleSupportClick,
    handleNotificationsClick,
    handleUserMenuClick,
  } = useTopBar();

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-surface px-6">
      {/* Buscador */}
      <div className="flex items-center">
        <form
          onSubmit={handleSearchSubmit}
          className="flex h-[44px] w-[417px] items-center gap-3 rounded-[6px] border border-[#DBDBDB] bg-[#DBDBDB]/20 px-4 transition-colors focus-within:border-brand-primary"
        >
          <button
            type="submit"
            className="flex items-center text-[#787486] hover:text-text-primary"
            aria-label="Buscar"
          >
            <LuSearch className="h-5 w-5 shrink-0" />
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for anything..."
            className="w-full bg-transparent font-sans text-[14px] font-normal text-text-primary placeholder-[#787486] outline-none"
          />
        </form>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-[#787486]">
          <button
            type="button"
            onClick={handleCalendarClick}
            className="rounded-full p-2 transition-colors hover:bg-gray-100 hover:text-text-primary"
            aria-label="Calendario"
          >
            <LuCalendar className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleSupportClick}
            className="relative flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 hover:text-text-primary"
            aria-label="Soporte y Ayuda"
          >
            <LuMessageSquare className="h-5 w-5" />
            <span className="absolute pb-0.5 font-sans text-[10px] font-bold text-[#787486]">
              ?
            </span>
          </button>

          <button
            type="button"
            onClick={handleNotificationsClick}
            className="relative rounded-full p-2 transition-colors hover:bg-gray-100 hover:text-text-primary"
            aria-label="Notificaciones"
          >
            <LuBell className="h-5 w-5" />
            {hasNotifications && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-surface" />
            )}
          </button>
        </div>

        <div className="h-8 w-[1px] bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="font-sans text-[16px] font-medium leading-tight text-text-primary">
              {userName}
            </span>
            <span className="font-sans text-[14px] font-normal leading-tight text-[#787486]">
              {location}
            </span>
          </div>

          <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
            <img
              src={userAvatar}
              alt={userName}
              className="h-full w-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={handleUserMenuClick}
            className="p-1 text-[#787486] transition-colors hover:text-text-primary"
            aria-label="Opciones de usuario"
          >
            <LuChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}