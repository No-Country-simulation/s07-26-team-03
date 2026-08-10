import React from "react";
import { LuHeadphones } from "react-icons/lu";
import icon from "@/assets/icons/icon.svg";
import type {
  SidebarFooterProps,
  NavItemProps,
  SidebarGroupProps,
} from "@/shared/interfaces/sidebar.interface";

export const SidebarHeader: React.FC = () => (
  <header className="flex h-[88px] w-full items-center justify-center px-2">
    <div className="flex items-center gap-1.5">
      <img
        src={icon}
        alt="Capacity IQ"
        className="h-8 w-8 shrink-0 object-contain"
      />
      <div className="flex items-baseline whitespace-nowrap text-lg">
        <span className="font-logo font-bold text-brand-primary">
          Capacity
        </span>
        <span className="ml-0.5 font-logo font-bold text-[#C5922C]">
          IQ
        </span>
        <span className="ml-1 font-body text-[11px] font-normal text-text">
          by Datacenter
        </span>
      </div>
    </div>
  </header>
);

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ onHelpClick }) => (
  <footer className="px-[38px] pb-10 pt-6">
    <button
      type="button"
      onClick={onHelpClick}
      className="flex w-full items-center justify-between text-left transition-opacity hover:opacity-80"
    >
      <div>
        <h4 className="font-heading text-sm font-bold leading-[115%] text-brand-primary">
          Need a help?
        </h4>
        <p className="mt-1 font-body text-xs text-[#6F6C8F]">
          Chat with live support
        </p>
      </div>

      <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-[#4B5563]">
        <LuHeadphones className="h-5 w-5" />
      </div>
    </button>
  </footer>
);

export const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center justify-center gap-3 rounded-[12px] px-4 py-3 text-sm font-medium transition-colors ${active
        ? "border border-brand-primary/20 bg-[#E7F0EB] font-semibold text-brand-primary"
        : "text-[#6B7280] hover:bg-gray-100 hover:text-heading"
      }`}
  >
    <Icon className={`h-5 w-5 shrink-0 ${active ? "text-brand-primary" : "text-[#6B7280]"}`} />
    <span className="truncate">{label}</span>
  </button>
);

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ title, children }) => (
  <div className="flex flex-col gap-2">
    {title && (
      <span className="px-4 font-heading text-xs font-semibold tracking-wider text-placeholder uppercase">
        {title}
      </span>
    )}
    <div className="flex flex-col gap-1">{children}</div>
  </div>
);