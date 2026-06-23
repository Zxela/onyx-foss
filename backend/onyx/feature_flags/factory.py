from onyx.feature_flags.interface import FeatureFlagProvider
from onyx.feature_flags.interface import NoOpFeatureFlagProvider


def get_default_feature_flag_provider() -> FeatureFlagProvider:
    """
    Get the default feature flag provider implementation.

    Returns the PostHog-based provider in Enterprise Edition when available,
    otherwise returns a no-op provider that always returns False.

    This function is designed for dependency injection - callers should
    use this factory rather than directly instantiating providers.

    Returns:
        FeatureFlagProvider: The configured feature flag provider instance
    """
    return NoOpFeatureFlagProvider()
