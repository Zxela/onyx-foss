import { IconFunctionComponent } from "@opal/types";
import {
  SvgActions,
  SvgAudio,
  SvgBookOpen,
  SvgBubbleText,
  SvgCpu,
  SvgDownload,
  SvgEmpty,
  SvgFileText,
  SvgFiles,
  SvgGlobe,
  SvgImage,
  SvgMcp,
  SvgOnyxOctagon,
  SvgProgressBars,
  SvgSearchMenu,
  SvgShield,
  SvgTerminal,
  SvgThumbsUp,
  SvgUploadCloud,
  SvgUser,
  SvgUserKey,
  SvgZoomIn,
  SvgDiscord,
  SvgSlack,
} from "@opal/icons";

export interface AdminRouteEntry {
  path: string;
  icon: IconFunctionComponent;
  title: string;
  sidebarLabel: string;
}

/**
 * Single source of truth for every admin route: path, icon, page-header
 * title, and sidebar label.
 */
export const ADMIN_ROUTES = {
  INDEXING_STATUS: {
    path: "/admin/indexing/status",
    icon: SvgBookOpen,
    title: "Existing Connectors",
    sidebarLabel: "Existing Connectors",
  },
  ADD_CONNECTOR: {
    path: "/admin/add-connector",
    icon: SvgUploadCloud,
    title: "Add Connector",
    sidebarLabel: "Add Connector",
  },
  DOCUMENT_SETS: {
    path: "/admin/documents/sets",
    icon: SvgFiles,
    title: "Document Sets",
    sidebarLabel: "Document Sets",
  },
  DOCUMENT_EXPLORER: {
    path: "/admin/documents/explorer",
    icon: SvgZoomIn,
    title: "Document Explorer",
    sidebarLabel: "Explorer",
  },
  DOCUMENT_FEEDBACK: {
    path: "/admin/documents/feedback",
    icon: SvgThumbsUp,
    title: "Document Feedback",
    sidebarLabel: "Feedback",
  },
  AGENTS: {
    path: "/admin/agents",
    icon: SvgOnyxOctagon,
    title: "Agents",
    sidebarLabel: "Agents",
  },
  SLACK_BOTS: {
    path: "/admin/bots",
    icon: SvgSlack,
    title: "Slack Integration",
    sidebarLabel: "Slack Integration",
  },
  DISCORD_BOTS: {
    path: "/admin/discord-bot",
    icon: SvgDiscord,
    title: "Discord Integration",
    sidebarLabel: "Discord Integration",
  },
  MCP_ACTIONS: {
    path: "/admin/actions/mcp",
    icon: SvgMcp,
    title: "MCP Actions",
    sidebarLabel: "MCP Actions",
  },
  OPENAPI_ACTIONS: {
    path: "/admin/actions/open-api",
    icon: SvgActions,
    title: "OpenAPI Actions",
    sidebarLabel: "OpenAPI Actions",
  },
  CHAT_PREFERENCES: {
    path: "/admin/configuration/chat-preferences",
    icon: SvgBubbleText,
    title: "Chat Preferences",
    sidebarLabel: "Chat Preferences",
  },
  LLM_MODELS: {
    path: "/admin/configuration/language-models",
    icon: SvgCpu,
    title: "Language Models",
    sidebarLabel: "Language Models",
  },
  WEB_SEARCH: {
    path: "/admin/configuration/web-search",
    icon: SvgGlobe,
    title: "Web Search",
    sidebarLabel: "Web Search",
  },
  IMAGE_GENERATION: {
    path: "/admin/configuration/image-generation",
    icon: SvgImage,
    title: "Image Generation",
    sidebarLabel: "Image Generation",
  },
  VOICE: {
    path: "/admin/configuration/voice",
    icon: SvgAudio,
    title: "Voice",
    sidebarLabel: "Voice",
  },
  CODE_INTERPRETER: {
    path: "/admin/configuration/code-interpreter",
    icon: SvgTerminal,
    title: "Code Interpreter",
    sidebarLabel: "Code Interpreter",
  },
  INDEX_SETTINGS: {
    path: "/admin/configuration/index-settings",
    icon: SvgSearchMenu,
    title: "Index Settings",
    sidebarLabel: "Index Settings",
  },
  DOCUMENT_PROCESSING: {
    path: "/admin/configuration/document-processing",
    icon: SvgFileText,
    title: "Document Processing",
    sidebarLabel: "Document Processing",
  },
  USERS: {
    path: "/admin/users",
    icon: SvgUser,
    title: "Users & Requests",
    sidebarLabel: "Users",
  },
  API_KEYS: {
    path: "/admin/service-accounts",
    icon: SvgUserKey,
    title: "Service Accounts",
    sidebarLabel: "Service Accounts",
  },
  TOKEN_RATE_LIMITS: {
    path: "/admin/token-rate-limits",
    icon: SvgProgressBars,
    title: "Spending Limits",
    sidebarLabel: "Spending Limits",
  },
  DEBUG: {
    path: "/admin/debug",
    icon: SvgDownload,
    title: "Debug Logs",
    sidebarLabel: "Debug Logs",
  },
  SECURITY_HARDENING: {
    path: "/admin/security",
    icon: SvgShield,
    title: "Security & Hardening",
    sidebarLabel: "Security & Hardening",
  },
  // Prefix-only entry used for layout matching — not rendered as a sidebar
  // item or page header.
  DOCUMENTS: {
    path: "/admin/documents",
    icon: SvgEmpty,
    title: "",
    sidebarLabel: "",
  },
} as const satisfies Record<string, AdminRouteEntry>;

/**
 * Helper that converts a route entry into the `{ name, icon, link }`
 * shape expected by the sidebar.
 */
export function sidebarItem(route: AdminRouteEntry) {
  return { name: route.sidebarLabel, icon: route.icon, link: route.path };
}

/**
 * Connector/indexing admin route prefixes that need a vector DB. In Lite mode
 * these render an informational notice instead of their normal content.
 */
export const VECTOR_DB_REQUIRED_ROUTE_PREFIXES: readonly string[] = [
  ADMIN_ROUTES.INDEXING_STATUS.path,
  ADMIN_ROUTES.ADD_CONNECTOR.path,
  // Covers /sets, /explorer, and /feedback — all require a vector DB.
  ADMIN_ROUTES.DOCUMENTS.path,
  ADMIN_ROUTES.INDEX_SETTINGS.path,
  "/admin/connector",
  "/admin/federated",
];

export function isVectorDbRequiredRoute(pathname: string): boolean {
  return VECTOR_DB_REQUIRED_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
}
