from typing import Any

from office365.graph_client import GraphClient
from office365.onedrive.driveitems.driveItem import DriveItem
from office365.sharepoint.client_context import ClientContext

from onyx.connectors.models import ExternalAccess


def get_sharepoint_external_access(
    ctx: ClientContext,
    graph_client: GraphClient,
    drive_item: DriveItem | None = None,
    drive_name: str | None = None,
    site_page: dict[str, Any] | None = None,
    add_prefix: bool = False,
    treat_sharing_link_as_public: bool = False,
) -> ExternalAccess:
    if drive_item and drive_item.id is None:
        raise ValueError("DriveItem ID is required")

    # External access syncing is an EE-only feature; default to empty access.
    def noop_fallback(
        *args: Any,  # noqa: ARG001
        **kwargs: Any,  # noqa: ARG001
    ) -> ExternalAccess:
        return ExternalAccess.empty()

    get_external_access_func = noop_fallback

    external_access = get_external_access_func(
        ctx,
        graph_client,
        drive_name,
        drive_item,
        site_page,
        add_prefix,
        treat_sharing_link_as_public,
    )

    return external_access
