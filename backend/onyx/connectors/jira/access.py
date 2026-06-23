"""
Permissioning / AccessControl logic for JIRA Projects + Issues.
"""

from jira import JIRA

from onyx.access.models import ExternalAccess


def get_project_permissions(
    jira_client: JIRA,  # noqa: ARG001
    jira_project: str,  # noqa: ARG001
    add_prefix: bool = False,  # noqa: ARG001
) -> ExternalAccess | None:
    """
    Fetch the project + issue level permissions / access-control.
    This functionality requires Enterprise Edition.

    Args:
        jira_client: The JIRA client instance.
        jira_project: The JIRA project string.
        add_prefix: When True, prefix group IDs with source type (for indexing path).
                   When False (default), leave unprefixed (for permission sync path
                   where upsert_document_external_perms handles prefixing).

    Returns:
        ExternalAccess object for the page. None if EE is not enabled or no restrictions found.
    """

    # Project + issue level permission sync requires Enterprise Edition.
    return None
