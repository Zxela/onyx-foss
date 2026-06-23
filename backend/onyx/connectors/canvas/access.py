"""
Permissioning / AccessControl logic for Canvas courses.

CE stub — returns None (no permissions).
"""

from onyx.access.models import ExternalAccess
from onyx.connectors.canvas.client import CanvasApiClient


def get_course_permissions(
    canvas_client: CanvasApiClient,  # noqa: ARG001
    course_id: int,  # noqa: ARG001
) -> ExternalAccess | None:
    return None
