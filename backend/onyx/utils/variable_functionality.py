from typing import Any

from onyx.configs.app_configs import API_SERVER_HOST
from onyx.configs.app_configs import API_SERVER_PROTOCOL
from onyx.configs.app_configs import API_SERVER_URL_OVERRIDE_FOR_HTTP_REQUESTS
from onyx.configs.app_configs import APP_API_PREFIX
from onyx.configs.app_configs import APP_PORT
from onyx.configs.app_configs import DEV_MODE


class OnyxVersion:
    """Process-local EE flag.

    Onyx upstream uses this to toggle Enterprise-Edition code paths. This FOSS
    fork strips EE, so the flag defaults off; it is retained only because a few
    connector ``__main__`` harnesses and maintenance scripts still flip it
    explicitly (e.g. for multi-tenant schema resolution during a one-off run).
    """

    def __init__(self) -> None:
        self._is_ee = False

    def set_ee(self) -> None:
        self._is_ee = True

    def unset_ee(self) -> None:
        self._is_ee = False

    def is_ee_version(self) -> bool:
        return self._is_ee


global_version = OnyxVersion()


def noop_fallback(*args: Any, **kwargs: Any) -> None:
    """
    A no-op (no operation) fallback function that accepts any arguments but does nothing.
    This is often used as a default or placeholder callback function.

    Args:
        *args (Any): Positional arguments, which are ignored.
        **kwargs (Any): Keyword arguments, which are ignored.

    Returns:
        None
    """


def build_api_server_url_for_http_requests(
    respect_env_override_if_set: bool = False,
) -> str:
    """
    Builds the API server URL for HTTP requests.
    """
    if DEV_MODE:
        url = f"http://127.0.0.1:{APP_PORT}"
    elif respect_env_override_if_set and API_SERVER_URL_OVERRIDE_FOR_HTTP_REQUESTS:
        url = API_SERVER_URL_OVERRIDE_FOR_HTTP_REQUESTS.rstrip("/")
    else:
        url = f"{API_SERVER_PROTOCOL}://{API_SERVER_HOST}:{APP_PORT}"

    if APP_API_PREFIX:
        url += f"/{APP_API_PREFIX.strip('/')}"

    return url
