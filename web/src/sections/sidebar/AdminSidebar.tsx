"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSettings } from "@/lib/settings/hooks";
import { SidebarLayouts, useSidebarState } from "@opal/layouts";
import { useUser } from "@/providers/UserProvider";
import { UserRole } from "@/lib/types";
import { Settings } from "@/lib/settings/types";
import { Divider, InputTypeIn, SidebarTab } from "@opal/components";
import { SvgSearch, SvgX } from "@opal/icons";
import { ADMIN_ROUTES, sidebarItem } from "@/lib/admin-routes";
import useFilter from "@/hooks/useFilter";
import { IconFunctionComponent } from "@opal/types";
import AccountPopover from "@/sections/sidebar/AccountPopover";
import { renderAppLogo } from "@/sections/sidebar/SidebarWrapper";
import { useShowLogoWhenFolded } from "@/lib/sidebar/hooks";

const SECTIONS = {
  UNLABELED: null,
  AGENTS_AND_ACTIONS: "Agents & Actions",
  DOCUMENTS_AND_KNOWLEDGE: "Documents & Knowledge",
  INTEGRATIONS: "Integrations",
  PERMISSIONS: "Permissions",
  ORGANIZATION: "Organization",
  USAGE: "Usage",
} as const;

interface SidebarItemEntry {
  section: string | null;
  name: string;
  icon: IconFunctionComponent;
  link: string;
  error?: boolean;
}

function buildItems(
  isCurator: boolean,
  settings: Settings | null
): SidebarItemEntry[] {
  const items: SidebarItemEntry[] = [];

  const add = (
    section: string | null,
    route: Parameters<typeof sidebarItem>[0]
  ) => {
    items.push({ ...sidebarItem(route), section });
  };

  // 1. No header — core configuration (admin only)
  if (!isCurator) {
    add(SECTIONS.UNLABELED, ADMIN_ROUTES.LLM_MODELS);
    add(SECTIONS.UNLABELED, ADMIN_ROUTES.WEB_SEARCH);
    add(SECTIONS.UNLABELED, ADMIN_ROUTES.IMAGE_GENERATION);
    add(SECTIONS.UNLABELED, ADMIN_ROUTES.VOICE);
    add(SECTIONS.UNLABELED, ADMIN_ROUTES.CODE_INTERPRETER);
    add(SECTIONS.UNLABELED, ADMIN_ROUTES.CHAT_PREFERENCES);
  }

  // 2. Agents & Actions
  add(SECTIONS.AGENTS_AND_ACTIONS, ADMIN_ROUTES.AGENTS);
  add(SECTIONS.AGENTS_AND_ACTIONS, ADMIN_ROUTES.MCP_ACTIONS);
  add(SECTIONS.AGENTS_AND_ACTIONS, ADMIN_ROUTES.OPENAPI_ACTIONS);

  // 3. Documents & Knowledge
  // Shown even in Lite mode; the pages themselves render a no-indexing notice.
  add(SECTIONS.DOCUMENTS_AND_KNOWLEDGE, ADMIN_ROUTES.INDEXING_STATUS);
  add(SECTIONS.DOCUMENTS_AND_KNOWLEDGE, ADMIN_ROUTES.ADD_CONNECTOR);
  add(SECTIONS.DOCUMENTS_AND_KNOWLEDGE, ADMIN_ROUTES.DOCUMENT_SETS);
  if (!isCurator) {
    items.push({
      ...sidebarItem(ADMIN_ROUTES.INDEX_SETTINGS),
      section: SECTIONS.DOCUMENTS_AND_KNOWLEDGE,
      error: settings?.needs_reindexing,
    });
  }

  // 4. Integrations (admin only)
  if (!isCurator) {
    add(SECTIONS.INTEGRATIONS, ADMIN_ROUTES.API_KEYS);
    add(SECTIONS.INTEGRATIONS, ADMIN_ROUTES.SLACK_BOTS);
    add(SECTIONS.INTEGRATIONS, ADMIN_ROUTES.DISCORD_BOTS);
  }

  // 5. Permissions (admin only)
  if (!isCurator) {
    add(SECTIONS.PERMISSIONS, ADMIN_ROUTES.USERS);
  }

  // 6. Usage (admin only)
  if (!isCurator) {
    add(SECTIONS.USAGE, ADMIN_ROUTES.TOKEN_RATE_LIMITS);
  }

  // 7. Organization (admin only)
  if (!isCurator) {
    add(SECTIONS.ORGANIZATION, ADMIN_ROUTES.SECURITY_HARDENING);
  }

  return items;
}

/** Preserve section ordering while grouping consecutive items by section. */
function groupBySection(items: SidebarItemEntry[]) {
  const groups: { section: string | null; items: SidebarItemEntry[] }[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.section === item.section) {
      last.items.push(item);
    } else {
      groups.push({ section: item.section, items: [item] });
    }
  }
  return groups;
}

export default function AdminSidebar() {
  const { folded, setFolded } = useSidebarState();
  const showLogoWhenFolded = useShowLogoWhenFolded();
  const searchRef = useRef<HTMLInputElement>(null);
  const [focusSearch, setFocusSearch] = useState(false);

  useEffect(() => {
    if (focusSearch && !folded && searchRef.current) {
      searchRef.current.focus();
      setFocusSearch(false);
    }
  }, [focusSearch, folded]);
  const pathname = usePathname();
  const { user } = useUser();
  const settings = useSettings();
  const isCurator =
    user?.role === UserRole.CURATOR || user?.role === UserRole.GLOBAL_CURATOR;

  const allItems = buildItems(isCurator, settings);

  const itemExtractor = useCallback((item: SidebarItemEntry) => item.name, []);

  const { query, setQuery, filtered } = useFilter(allItems, itemExtractor);

  const groups = groupBySection(filtered);

  return (
    <SidebarLayouts.Root>
      <SidebarLayouts.Header
        logo={renderAppLogo}
        showLogoWhenFolded={showLogoWhenFolded}
      >
        {folded ? (
          <SidebarTab
            icon={SvgSearch}
            folded
            onClick={() => {
              setFolded(false);
              setFocusSearch(true);
            }}
          >
            Search
          </SidebarTab>
        ) : (
          <InputTypeIn
            ref={searchRef}
            variant="internal"
            searchIcon
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            clearButton
          />
        )}
      </SidebarLayouts.Header>

      <SidebarLayouts.Body scrollKey="admin-sidebar">
        {groups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            <SidebarLayouts.Section title={group.section ?? undefined}>
              {group.items.map(({ link, icon, name }) => (
                <SidebarTab
                  key={link}
                  icon={icon}
                  href={link}
                  selected={pathname.startsWith(link)}
                >
                  {name}
                </SidebarTab>
              ))}
            </SidebarLayouts.Section>
          </React.Fragment>
        ))}
      </SidebarLayouts.Body>

      <SidebarLayouts.Footer>
        {!folded && <Divider paddingPerpendicular="sm" />}
        <SidebarTab
          icon={SvgX}
          href="/app"
          variant="sidebar-light"
          folded={folded}
        >
          Exit Admin Panel
        </SidebarTab>
        <AccountPopover folded={folded} />
      </SidebarLayouts.Footer>
    </SidebarLayouts.Root>
  );
}
