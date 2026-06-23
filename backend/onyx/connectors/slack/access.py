from slack_sdk import WebClient

from onyx.access.models import ExternalAccess
from onyx.connectors.models import BasicExpertInfo
from onyx.connectors.slack.models import ChannelType


def get_channel_access(
    client: WebClient,  # noqa: ARG001
    channel: ChannelType,  # noqa: ARG001
    user_cache: dict[str, BasicExpertInfo | None],  # noqa: ARG001
    team_id_to_user_emails: dict[str, set[str]] | None = None,  # noqa: ARG001
) -> ExternalAccess | None:
    """Get channel access permissions for a Slack channel. EE only.

    ``team_id_to_user_emails`` (Grid only): when provided, public channels
    are scoped to the union of the workspaces they're shared into instead of
    being marked org-public.
    """
    return None
