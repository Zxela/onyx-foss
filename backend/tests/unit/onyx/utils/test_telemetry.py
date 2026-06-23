from typing import Any

from onyx.configs.constants import MilestoneRecordType
from onyx.utils import telemetry as telemetry_utils


def test_mt_cloud_telemetry_noop_when_not_multi_tenant(monkeypatch: Any) -> None:
    # mt_cloud_telemetry reads the module-local imported symbol, so patch this path.
    monkeypatch.setattr("onyx.utils.telemetry.MULTI_TENANT", False)

    # Should early-return without raising on the FOSS / EE-off path.
    telemetry_utils.mt_cloud_telemetry(
        tenant_id="tenant-1",
        distinct_id="12345678-1234-1234-1234-123456789abc",
        event=MilestoneRecordType.USER_MESSAGE_SENT,
        properties={"origin": "web"},
    )


def test_mt_cloud_telemetry_noop_when_multi_tenant(
    monkeypatch: Any,
) -> None:
    # mt_cloud_telemetry reads the module-local imported symbol, so patch this path.
    monkeypatch.setattr("onyx.utils.telemetry.MULTI_TENANT", True)

    # In the MIT version there is no PostHog dispatch; the call must still be a
    # safe no-op (it only builds properties locally) and reference the retained
    # noop_fallback symbol.
    assert telemetry_utils.noop_fallback is not None

    telemetry_utils.mt_cloud_telemetry(
        tenant_id="tenant-1",
        distinct_id="12345678-1234-1234-1234-123456789abc",
        event=MilestoneRecordType.USER_MESSAGE_SENT,
        properties={"origin": "web"},
    )


def test_mt_cloud_identify_noop_when_not_multi_tenant(monkeypatch: Any) -> None:
    monkeypatch.setattr("onyx.utils.telemetry.MULTI_TENANT", False)

    # Should early-return without raising on the FOSS / EE-off path.
    telemetry_utils.mt_cloud_identify(
        distinct_id="12345678-1234-1234-1234-123456789abc",
        properties={"email": "user@example.com"},
    )


def test_mt_cloud_identify_noop_when_multi_tenant(
    monkeypatch: Any,
) -> None:
    monkeypatch.setattr("onyx.utils.telemetry.MULTI_TENANT", True)

    # In the MIT version there is no PostHog dispatch; the call must still be a
    # safe no-op and reference the retained noop_fallback symbol.
    assert telemetry_utils.noop_fallback is not None

    telemetry_utils.mt_cloud_identify(
        distinct_id="12345678-1234-1234-1234-123456789abc",
        properties={"email": "user@example.com"},
    )
