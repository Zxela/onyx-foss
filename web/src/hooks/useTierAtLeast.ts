"use client";

import { Tier } from "@/lib/settings/types";

/**
 * Single-tier barebones build: every feature is available, so this always
 * returns `true`. The `(required: Tier)` signature is kept so the ~two dozen
 * callers compile unchanged.
 */
export function useTierAtLeast(_required: Tier): boolean {
  return true;
}
