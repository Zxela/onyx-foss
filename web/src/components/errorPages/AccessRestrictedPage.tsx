"use client";

import Link from "next/link";
import ErrorPageLayout from "@/components/errorPages/ErrorPageLayout";
import { Button } from "@opal/components";
import InlineExternalLink from "@/refresh-components/InlineExternalLink";
import { logout } from "@/lib/user";
import { useSettings } from "@/lib/settings/hooks";
import { ApplicationStatus } from "@/lib/settings/types";
import Text from "@/refresh-components/texts/Text";
import { SvgLock } from "@opal/icons";

const linkClassName = "text-action-link-05 hover:text-action-link-06 underline";

export default function AccessRestricted() {
  const settings = useSettings();

  const isSeatLimitExceeded =
    settings.application_status === ApplicationStatus.SEAT_LIMIT_EXCEEDED;

  function getSeatLimitMessage() {
    const { used_seats, seat_count } = settings;
    const counts =
      used_seats != null && seat_count != null
        ? ` (${used_seats} users / ${seat_count} seats)`
        : "";
    return `Your organization has exceeded its seat count${counts}. Access is restricted until the number of users is reduced.`;
  }

  const message = isSeatLimitExceeded
    ? getSeatLimitMessage()
    : "Your access to Onyx has been restricted. Please contact your system administrator.";

  return (
    <ErrorPageLayout>
      <div className="flex items-center gap-2">
        <Text headingH2>Access Restricted</Text>
        <SvgLock className="stroke-status-error-05 w-6 h-6" />
      </div>

      <Text text03>{message}</Text>

      {isSeatLimitExceeded && (
        <Text text03>
          If you are an administrator, you can manage users on the{" "}
          <Link className={linkClassName} href="/admin/users">
            User Management
          </Link>{" "}
          page.
        </Text>
      )}

      <div className="flex flex-row gap-2">
        <Button
          onClick={async () => {
            await logout();
            window.location.reload();
          }}
        >
          Log out
        </Button>
      </div>

      <Text text03>
        Need help? Join our{" "}
        <InlineExternalLink
          className={linkClassName}
          href="https://discord.gg/4NA5SbzrWb"
        >
          Discord community
        </InlineExternalLink>{" "}
        for support.
      </Text>
    </ErrorPageLayout>
  );
}
