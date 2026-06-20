import {
  CombinedSettings,
  ApplicationStatus,
  Settings,
  QueryHistoryType,
} from "@/lib/settings/types";
import { HOST_URL } from "@/lib/constants";
import { fetchSS } from "@/lib/utilsSS";
import { getWebVersion } from "@/lib/version";

export enum SettingsError {
  OTHER = "OTHER",
}

export async function fetchStandardSettingsSS() {
  return fetchSS("/settings");
}

export async function fetchSettingsSS(): Promise<CombinedSettings | null> {
  try {
    const result_0 = await fetchStandardSettingsSS();

    let settings: Settings;

    if (!result_0.ok) {
      if (result_0.status === 403 || result_0.status === 401) {
        settings = {
          auto_scroll: true,
          application_status: ApplicationStatus.ACTIVE,
          gpu_enabled: false,
          maximum_chat_retention_days: null,
          notifications: [],
          needs_reindexing: false,
          anonymous_user_enabled: false,
          invite_only_enabled: false,
          deep_research_enabled: true,
          temperature_override_enabled: true,
          query_history_type: QueryHistoryType.NORMAL,
        };
      } else {
        throw new Error(
          `fetchStandardSettingsSS failed: status=${
            result_0.status
          } body=${await result_0.text()}`
        );
      }
    } else {
      settings = await result_0.json();
    }

    if (settings.deep_research_enabled == null) {
      settings.deep_research_enabled = true;
    }

    const combinedSettings: CombinedSettings = {
      settings,
      enterpriseSettings: null,
      customAnalyticsScript: null,
      webVersion: settings.version ?? getWebVersion(),
      webDomain: HOST_URL,
      appName: "Onyx",
    };

    return combinedSettings;
  } catch (error) {
    console.error("fetchSettingsSS exception: ", error);
    return null;
  }
}
