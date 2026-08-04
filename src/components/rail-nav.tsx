"use client";

import { useTranslation } from "react-i18next";
import { FaDownload } from "react-icons/fa";
import { FiWifi } from "react-icons/fi";
import { GoGear, GoPlus } from "react-icons/go";
import {
  LuCloud,
  LuKeyboard,
  LuPlug,
  LuPuzzle,
  LuUserRound,
  LuUsers,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Logo } from "./icons/logo";
import { Button } from "./ui/button";

export type AppPage =
  | "profiles"
  | "proxies"
  | "extensions"
  | "groups"
  | "vpns"
  | "settings"
  | "integrations"
  | "account"
  | "import"
  | "shortcuts";

interface RailNavProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onCreateProfile?: () => void;
}

interface NavItem {
  page: AppPage;
  Icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
}

const BROWSER_ITEMS: NavItem[] = [
  { page: "profiles", Icon: LuUserRound, labelKey: "rail.profiles" },
  { page: "groups", Icon: LuUsers, labelKey: "rail.groups" },
  { page: "proxies", Icon: FiWifi, labelKey: "rail.network" },
  { page: "extensions", Icon: LuPuzzle, labelKey: "rail.extensions" },
];

const TOOL_ITEMS: NavItem[] = [
  { page: "integrations", Icon: LuPlug, labelKey: "rail.integrations" },
  { page: "import", Icon: FaDownload, labelKey: "rail.more.importProfile" },
  {
    page: "shortcuts",
    Icon: LuKeyboard,
    labelKey: "rail.more.keyboardShortcuts",
  },
];

function NavSection({
  label,
  items,
  currentPage,
  onNavigate,
}: {
  label: string;
  items: NavItem[];
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-1.5">
      <div className="px-3 pb-1 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </div>
      {items.map(({ page, Icon, labelKey }) => {
        const active = currentPage === page;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onNavigate(page)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-[13px] font-medium transition-[background-color,color,box-shadow]",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_3px_0_0_var(--primary)]"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{t(labelKey)}</span>
          </button>
        );
      })}
    </div>
  );
}

export function RailNav({
  currentPage,
  onNavigate,
  onCreateProfile,
}: RailNavProps) {
  const { t } = useTranslation();

  return (
    <nav className="flex w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-3 py-3 text-sidebar-foreground">
      <button
        type="button"
        className="mb-3 flex h-11 items-center gap-2.5 rounded-md px-2 text-left transition-colors hover:bg-sidebar-accent/50"
        onClick={() => onNavigate("profiles")}
      >
        <span className="grid size-8 place-items-center rounded-lg bg-primary shadow-[0_4px_12px_rgba(47,107,255,0.22)]">
          <Logo className="size-5 text-primary-foreground" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-semibold text-sidebar-foreground">
            {t("header.productName")}
          </span>
          <span className="block text-[10px] text-muted-foreground">
            {t("rail.localWorkspace")}
          </span>
        </span>
      </button>

      <Button
        size="sm"
        className="mb-6 h-10 w-full justify-start gap-2.5 px-3 text-[13px] shadow-[0_4px_12px_rgba(47,107,255,0.16)]"
        onClick={onCreateProfile}
      >
        <GoPlus className="size-4" />
        {t("header.newProfile")}
      </Button>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto">
        <NavSection
          label={t("rail.sections.browser")}
          items={BROWSER_ITEMS}
          currentPage={currentPage}
          onNavigate={onNavigate}
        />
        <NavSection
          label={t("rail.sections.tools")}
          items={TOOL_ITEMS}
          currentPage={currentPage}
          onNavigate={onNavigate}
        />
      </div>

      <div className="space-y-1.5 border-t border-sidebar-border pt-3">
        <button
          type="button"
          onClick={() => onNavigate("account")}
          className={cn(
            "flex h-10 w-full items-center gap-3 rounded-md px-3 text-[13px] font-medium transition-colors",
            currentPage === "account"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
          )}
        >
          <LuCloud className="size-4" />
          {t("rail.account")}
        </button>
        <button
          type="button"
          onClick={() => onNavigate("settings")}
          className={cn(
            "flex h-10 w-full items-center gap-3 rounded-md px-3 text-[13px] font-medium transition-colors",
            currentPage === "settings"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
          )}
        >
          <GoGear className="size-4" />
          {t("rail.settings")}
        </button>
      </div>
    </nav>
  );
}
