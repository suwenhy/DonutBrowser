"use client";

import { useTranslation } from "react-i18next";
import {
  LuDownload,
  LuFolderCog,
  LuNetwork,
  LuPlay,
  LuSquare,
  LuTrash2,
} from "react-icons/lu";
import { Button } from "./ui/button";

interface ProfilesToolbarProps {
  totalProfiles: number;
  runningProfiles: number;
  profilesWithProxy: number;
  selectedCount: number;
  onImport: () => void;
  onManageGroups: () => void;
  onManageNetwork: () => void;
  onRunSelected: () => void;
  onStopSelected: () => void;
  onDeleteSelected: () => void;
}

export function ProfilesToolbar({
  totalProfiles,
  runningProfiles,
  profilesWithProxy,
  selectedCount,
  onImport,
  onManageGroups,
  onManageNetwork,
  onRunSelected,
  onStopSelected,
  onDeleteSelected,
}: ProfilesToolbarProps) {
  const { t } = useTranslation();
  const hasSelection = selectedCount > 0;

  return (
    <div className="mb-3 flex min-h-11 flex-wrap items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5 shadow-[0_1px_3px_rgba(24,32,51,0.04)]">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 px-2.5 text-xs"
          onClick={onImport}
        >
          <LuDownload className="size-3.5" />
          {t("rail.more.importProfile")}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 px-2.5 text-xs"
          onClick={onManageGroups}
        >
          <LuFolderCog className="size-3.5" />
          {t("rail.groups")}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 px-2.5 text-xs"
          onClick={onManageNetwork}
        >
          <LuNetwork className="size-3.5" />
          {t("rail.network")}
        </Button>
      </div>

      {hasSelection && (
        <div className="flex items-center gap-1 rounded-md border border-primary/20 bg-primary/6 p-1">
          <span className="px-2 text-xs font-medium text-primary">
            {t("dataTableActionBar.selected", { count: selectedCount })}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-xs"
            onClick={onRunSelected}
          >
            <LuPlay className="size-3" />
            {t("profiles.actionBar.runSelected")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-xs"
            onClick={onStopSelected}
          >
            <LuSquare className="size-3" />
            {t("profiles.actionBar.stopSelected")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-xs text-destructive hover:text-destructive"
            onClick={onDeleteSelected}
          >
            <LuTrash2 className="size-3" />
            {t("common.buttons.delete")}
          </Button>
        </div>
      )}

      <div className="ml-auto flex items-center gap-4 border-l border-border px-3 text-xs text-muted-foreground">
        <span>{t("profiles.stats.total", { count: totalProfiles })}</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-success" />
          {t("profiles.stats.running", { count: runningProfiles })}
        </span>
        <span>{t("profiles.stats.proxied", { count: profilesWithProxy })}</span>
      </div>
    </div>
  );
}
